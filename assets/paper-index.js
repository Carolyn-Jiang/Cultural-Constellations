(() => {
  const copy = {
    search: ["按题名或领域搜索", "Search by title or field"],
    scope: ["显示范围", "Show"],
    releases: ["公开论文", "Public papers"],
    all: ["全部论文与主题", "All papers and topics"],
    paper: ["公开论文", "Public paper"],
    topic: ["研究主题", "Research topic"],
    clear: ["清除搜索", "Clear search"],
    empty: ["没有找到匹配的条目。", "No matching entries."],
    include: ["同时搜索研究主题", "Include research topics"],
    results: ["项结果", "results"],
  };
  const browse = { query: "", scope: "public" };

  function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value) node.textContent = value;
    return node;
  }

  function normalise(value) {
    return value
      .normalize("NFKD")
      .toLowerCase()
      .replace(/\p{M}/gu, "")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  }

  window.renderPaperIndex = (root, lang, fields) => {
    const tr = (key) => copy[key][lang];
    const groups = fields.map((field) => {
      const items = field.papers
        .filter((id) => Object.hasOwn(CAT, id))
        .map((id) => {
          const paper = CAT[id],
            released = paper.links.length > 0;
          const terms = normalise(
            [
              field.id,
              ...field.name,
              id,
              ...paper.short,
              ...paper.title,
              ...paper.relation,
              ...(released ? copy.paper : copy.topic),
            ].join(" "),
          );
          return {
            id,
            title: paper.title[lang],
            summary: paper.relation[lang],
            released,
            terms,
          };
        });
      items.sort((a, b) => Number(b.released) - Number(a.released));
      return { field, items, released: items.some((item) => item.released) };
    });
    groups.sort((a, b) => Number(b.released) - Number(a.released));

    const index = element("section", "paper-index");
    index.setAttribute(
      "aria-label",
      lang ? "Paper and topic index" : "论文与主题索引",
    );
    const toolbar = element("div", "pi-toolbar");
    const searchLabel = element("label", "pi-search");
    const search = element("input", "pi-query");
    search.type = "search";
    search.placeholder = tr("search");
    search.value = browse.query;
    searchLabel.append(element("span", "pi-sr", tr("search")), search);
    const filterLabel = element("label", "pi-filter");
    const scope = element("select", "pi-scope");
    for (const [key, value] of [
      ["releases", "public"],
      ["all", "all"],
    ]) {
      const option = element("option", "", tr(key));
      option.value = value;
      scope.append(option);
    }
    scope.value = browse.scope;
    filterLabel.append(element("span", "pi-sr", tr("scope")), scope);
    toolbar.append(searchLabel, filterLabel);
    const feedback = element("div", "pi-sr");
    feedback.setAttribute("role", "status");
    const listing = element("div", "pi-results");
    index.append(toolbar, feedback, listing);
    root.replaceChildren(index);

    function drawResults() {
      const tokens = normalise(browse.query).split(" ").filter(Boolean);
      const fragment = document.createDocumentFragment();
      let total = 0,
        hiddenMatches = 0;
      for (const { field, items } of groups) {
        const matches = items.filter((item) =>
          tokens.every((token) => item.terms.includes(token)),
        );
        const visible = matches.filter(
          (item) => browse.scope === "all" || item.released,
        );
        hiddenMatches += matches.length - visible.length;
        if (!visible.length) continue;
        const group = element("section", "pi-group");
        group.dataset.field = field.id;
        const name = field.name[lang];
        group.append(element("h3", "pi-field", name));
        const list = element("ul", "pi-list");
        for (const item of visible) {
          const row = element("li");
          const link = element("a", "pi-link");
          link.href = "#paper/" + encodeURIComponent(item.id);
          link.dataset.paper = item.id;
          const arrow = element("span", "pi-arrow", "→");
          arrow.setAttribute("aria-hidden", "true");
          link.append(
            element("span", "pi-title", item.title),
            element("span", "pi-kind", tr(item.released ? "paper" : "topic")),
            arrow,
          );
          // A one-line summary for public papers; topics stay as their title.
          if (item.released)
            link.append(element("span", "pi-summary", item.summary));
          row.append(link);
          list.append(row);
        }
        total += visible.length;
        group.append(list);
        fragment.append(group);
      }
      if (!total) {
        const message = element("div", "pi-empty");
        message.append(element("p", "", tr("empty")));
        if (hiddenMatches) {
          const include = element("button", "pi-action", tr("include"));
          include.type = "button";
          include.onclick = () => {
            scope.value = browse.scope = "all";
            scope.focus();
            drawResults();
          };
          message.append(include);
        }
        if (browse.query) {
          const clear = element("button", "pi-action", tr("clear"));
          clear.type = "button";
          clear.onclick = () => {
            search.value = browse.query = "";
            search.focus();
            drawResults();
          };
          message.append(clear);
        }
        fragment.append(message);
      }
      listing.replaceChildren(fragment);
      feedback.textContent =
        total === 1 && lang ? "1 result" : total + " " + tr("results");
    }

    search.addEventListener("input", () => {
      browse.query = search.value;
      drawResults();
    });
    // Enter opens the first match; the arrow keys walk the list.
    index.addEventListener("keydown", (event) => {
      const rows = [...listing.querySelectorAll("a.pi-link")];
      if (!rows.length) return;
      if (event.target === search && event.key === "Enter") {
        event.preventDefault();
        window.explorePaper?.(rows[0].dataset.paper);
        return;
      }
      if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
      const at = rows.indexOf(document.activeElement);
      if (event.target === search) {
        if (event.key !== "ArrowDown") return;
        event.preventDefault();
        rows[0].focus();
        return;
      }
      if (at < 0) return;
      event.preventDefault();
      if (event.key === "ArrowUp" && at === 0) search.focus();
      else
        rows[
          Math.max(
            0,
            Math.min(
              rows.length - 1,
              at + (event.key === "ArrowDown" ? 1 : -1),
            ),
          )
        ].focus();
    });
    scope.addEventListener("change", () => {
      browse.scope = scope.value;
      drawResults();
    });
    listing.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        typeof window.explorePaper !== "function"
      )
        return;
      const link = event.target.closest("a.pi-link");
      if (link && listing.contains(link)) {
        event.preventDefault();
        window.explorePaper(link.dataset.paper);
      }
    });
    drawResults();
  };
})();
