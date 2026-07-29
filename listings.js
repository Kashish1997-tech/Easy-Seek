/* ==========================================================================
   EasySeek — Listings engine
   Powers Books / Results / Papers pages: university tabs, search,
   filters and pagination, all driven by EASYSEEK_DATA.
   Each page sets `LISTING_CONFIG` before this script runs (see page HTML).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof LISTING_CONFIG === "undefined") return;

  const { dataset, type, pageSize } = LISTING_CONFIG;
  const items = EASYSEEK_DATA[dataset] || [];
  const uniInfo = EASYSEEK_DATA.universities;

  const state = {
    uni: "all",
    query: "",
    semester: "all",
    subjectOrYear: "all",
    page: 1
  };

  const grid = document.getElementById("listingGrid");
  const countEl = document.getElementById("resultCount");
  const paginationEl = document.getElementById("pagination");
  const searchInput = document.getElementById("searchInput");
  const semFilter = document.getElementById("semesterFilter");
  const secondFilter = document.getElementById("secondFilter");
  const tabs = document.querySelectorAll(".uni-tab");

  /* build secondary filter options (subject for books, year for papers) */
  if (secondFilter) {
    const key = type === "papers" ? "year" : "subject";
    const values = [...new Set(items.map(i => i[key]))].sort();
    values.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      secondFilter.appendChild(opt);
    });
  }

  function cardHtml(item) {
    const uni = uniInfo[item.university];
    const badgeClass = item.university === "punjabi" ? "badge-punjabi" : "badge-thapar";

    if (type === "books") {
      return `
      <article class="stub-card reveal">
        <div class="stub-head">
          <div>
            <span class="badge-uni ${badgeClass}">${uni.name}</span>
            <h4>${item.name}</h4>
          </div>
          <span class="stub-badge">Sem ${item.semester}</span>
        </div>
        <hr class="stub-dash">
        <div class="stub-meta">
          <div>Subject<b>${item.subject}</b></div>
          <div>Semester<b>${item.semester}</b></div>
        </div>
        <div class="stub-actions">
          <button class="btn btn-outline btn-sm" type="button" data-view="${item.name}"><i class="fa-regular fa-eye"></i> View</button>
          <button class="btn btn-primary btn-sm" type="button" data-download="${item.name}"><i class="fa-solid fa-download"></i> Download</button>
        </div>
      </article>`;
    }

    if (type === "results") {
      return `
      <article class="stub-card reveal">
        <div class="stub-head">
          <div>
            <span class="badge-uni ${badgeClass}">${uni.name}</span>
            <h4>${item.exam}</h4>
          </div>
          <span class="stub-badge">Sem ${item.semester}</span>
        </div>
        <hr class="stub-dash">
        <div class="stub-meta">
          <div>Result Date<b>${item.date}</b></div>
          <div>Semester<b>${item.semester}</b></div>
        </div>
        <div class="stub-actions">
          <button class="btn btn-primary btn-block btn-sm" type="button" data-view="${item.exam}"><i class="fa-regular fa-file-lines"></i> View Result</button>
        </div>
      </article>`;
    }

    /* papers */
    return `
      <article class="stub-card reveal">
        <div class="stub-head">
          <div>
            <span class="badge-uni ${badgeClass}">${uni.name}</span>
            <h4>${item.subject}</h4>
          </div>
          <span class="stub-badge">${item.year}</span>
        </div>
        <hr class="stub-dash">
        <div class="stub-meta">
          <div>Semester<b>${item.semester}</b></div>
          <div>Year<b>${item.year}</b></div>
        </div>
        <div class="stub-actions">
          <button class="btn btn-outline btn-sm" type="button" data-view="${item.subject}"><i class="fa-regular fa-eye"></i> View</button>
          <button class="btn btn-primary btn-sm" type="button" data-download="${item.subject}"><i class="fa-solid fa-download"></i> Download</button>
        </div>
      </article>`;
  }

  function getFiltered() {
    const q = state.query.trim().toLowerCase();
    return items.filter(item => {
      if (state.uni !== "all" && item.university !== state.uni) return false;
      if (state.semester !== "all" && String(item.semester) !== state.semester) return false;
      if (state.subjectOrYear !== "all") {
        const key = type === "papers" ? "year" : "subject";
        if (String(item[key]) !== state.subjectOrYear) return false;
      }
      if (q) {
        const haystack = (type === "results" ? item.exam : (item.name || item.subject)) + " " + (item.subject || "");
        if (!haystack.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }

  function render() {
    const filtered = getFiltered();
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    state.page = Math.min(state.page, totalPages);
    const start = (state.page - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    if (countEl) {
      countEl.textContent = filtered.length
        ? `Showing ${start + 1}\u2013${Math.min(start + pageSize, filtered.length)} of ${filtered.length} results`
        : "No results found";
    }

    grid.innerHTML = pageItems.length
      ? pageItems.map(cardHtml).join("")
      : `<div class="empty-state"><i class="fa-regular fa-folder-open"></i><p>No matching results. Try adjusting your search or filters.</p></div>`;

    renderPagination(totalPages);

    /* placeholder actions */
    grid.querySelectorAll("[data-view]").forEach(btn => {
      btn.addEventListener("click", () => alert(`Preview for "${btn.dataset.view}" will open here once real files are connected.`));
    });
    grid.querySelectorAll("[data-download]").forEach(btn => {
      btn.addEventListener("click", () => alert(`Download for "${btn.dataset.download}" will start here once real files are connected.`));
    });
  }

  function renderPagination(totalPages) {
    if (!paginationEl) return;
    if (totalPages <= 1) { paginationEl.innerHTML = ""; return; }
    let html = `<button class="page-btn" data-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""} aria-label="Previous page"><i class="fa-solid fa-chevron-left"></i></button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn ${i === state.page ? "active" : ""}" data-page="${i}">${i}</button>`;
    }
    html += `<button class="page-btn" data-page="${state.page + 1}" ${state.page === totalPages ? "disabled" : ""} aria-label="Next page"><i class="fa-solid fa-chevron-right"></i></button>`;
    paginationEl.innerHTML = html;
    paginationEl.querySelectorAll("[data-page]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.page = parseInt(btn.dataset.page, 10);
        render();
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.uni = tab.dataset.uni;
      state.page = 1;
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.query = searchInput.value;
      state.page = 1;
      render();
    });
  }
  if (semFilter) {
    semFilter.addEventListener("change", () => {
      state.semester = semFilter.value;
      state.page = 1;
      render();
    });
  }
  if (secondFilter) {
    secondFilter.addEventListener("change", () => {
      state.subjectOrYear = secondFilter.value;
      state.page = 1;
      render();
    });
  }

  /* pre-select a university if the page was opened with ?uni=punjabi/thapar */
  const params = new URLSearchParams(window.location.search);
  const uniParam = params.get("uni");
  if (uniParam && (uniParam === "punjabi" || uniParam === "thapar")) {
    state.uni = uniParam;
    tabs.forEach(t => t.classList.toggle("active", t.dataset.uni === uniParam));
  }

  render();
});
