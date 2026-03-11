// Mobil hamburger meny (steg)
const stepsBtn = document.getElementById("stepsBtn");
const stepsMenu = document.getElementById("stepsMenu");

if (stepsBtn && stepsMenu) {
  stepsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const willShow = !stepsMenu.classList.contains("show");
    stepsMenu.classList.toggle("show");

    stepsBtn.setAttribute("aria-expanded", willShow ? "true" : "false");

    if (willShow) {
      // Ensure all groups start collapsed when the menu opens (prevents 'open but invisible' issue)
      document.querySelectorAll('.dropdown-group').forEach(group => {
        const toggle = group.querySelector('.group-toggle');
        const content = group.querySelector('.group-content');
        group.classList.remove('expanded');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        if (content) content.style.maxHeight = null;
      });
    }
  });

  document.addEventListener("click", () => {
    if (stepsMenu.classList.contains("show")) {
      stepsMenu.classList.remove("show");
      stepsBtn.setAttribute("aria-expanded", "false");

      // Also collapse groups when menu is closed
      document.querySelectorAll('.dropdown-group').forEach(group => {
        const toggle = group.querySelector('.group-toggle');
        const content = group.querySelector('.group-content');
        group.classList.remove('expanded');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        if (content) content.style.maxHeight = null;
      });
    }
  });
}

// Desktop dropsown (oppfølging)
const followupBtn = document.getElementById("followupBtn");
const followupMenu = document.getElementById("followupMenu");

// Desktop search input and results (shown via separate dropdown button)
const searchInputDesktop = document.getElementById("searchInputDesktop");
const searchResultsDesktop = document.getElementById("searchResultsDesktop");

if (searchInputDesktop && searchResultsDesktop) {
  // Prevent dropdown menu from closing when clicking on search input
  searchInputDesktop.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  searchInputDesktop.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
      searchResultsDesktop.innerHTML = "";
      return;
    }

    const results = [];
    const elementsToSearch = document.querySelectorAll("h1, h2, h3, h4, p, li, summary, .info-card h3, .info-card-blue h3");
    
    elementsToSearch.forEach((element) => {
      const text = element.textContent.toLowerCase();
      
      if (text.includes(query)) {
        const isDuplicate = results.some(r => r.text === element.textContent);
        if (!isDuplicate) {
          let type = "Innhold";
          if (element.tagName.match(/^H[1-4]$/)) {
            type = "Overskrift";
          }
          
          results.push({
            text: element.textContent.substring(0, 60) + (element.textContent.length > 60 ? "..." : ""),
            type: type,
            element: element
          });
        }
      }
    });

    if (results.length === 0) {
      searchResultsDesktop.innerHTML = '<div class="search-no-results">Ingen resultater funnet</div>';
    } else {
      searchResultsDesktop.innerHTML = results.map((result, index) => `
        <div class="search-result-item" data-index="${index}">
          <div class="search-result-type">${result.type}</div>
          <div class="search-result-text">${result.text}</div>
        </div>
      `).join("");

      // attach click handlers to items in the results container
      searchResultsDesktop.querySelectorAll('.search-result-item').forEach((item, index) => {
        item.addEventListener("click", () => {
          results[index].element.scrollIntoView({ behavior: "smooth", block: "center" });
          results[index].element.style.backgroundColor = "rgba(43,179,163,0.2)";
          setTimeout(() => {
            results[index].element.style.backgroundColor = "";
          }, 1500);
        });
      });
    }
  });
}

if (followupBtn && followupMenu) {
  followupBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    followupMenu.classList.toggle("show");

    const expanded = followupMenu.classList.contains("show");
    followupBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  document.addEventListener("click", () => {
    if (followupMenu.classList.contains("show")) {
      followupMenu.classList.remove("show");
      followupBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// Desktop search dropdown toggle
const searchDesktopBtnElm = document.getElementById("searchDesktopBtn");
const searchDesktopMenu = document.getElementById("searchDesktopMenu");
if (searchDesktopBtnElm && searchDesktopMenu) {
  searchDesktopBtnElm.addEventListener("click", (e) => {
    e.stopPropagation();
    searchDesktopMenu.classList.toggle("show");

    const expanded = searchDesktopMenu.classList.contains("show");
    searchDesktopBtnElm.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  document.addEventListener("click", () => {
    if (searchDesktopMenu.classList.contains("show")) {
      searchDesktopMenu.classList.remove("show");
      searchDesktopBtnElm.setAttribute("aria-expanded", "false");
    }
  });
}

// Marker aktiv side i meny
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".menuHref a, #stepsMenu a, .page-nav a").forEach(link => {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// Mobile accordion groups inside hamburger
// (No auto-expand on load) keep groups closed until user opens them


// Toggle on click
document.querySelectorAll('.group-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const group = btn.closest('.dropdown-group');
    const content = group.querySelector('.group-content');
    const expanded = group.classList.toggle('expanded');
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');

    if (expanded) {
      // set explicit maxHeight for animation
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = null;
    }
  });
});

// Søkefunksjonalitet
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

if (searchInput) {
  // Prevent menu from closing when clicking on search input
  searchInput.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
      searchResults.innerHTML = "";
      return;
    }

    const results = [];
    
    // Søk i alle h1, h2, h3, h4, p, li, summary elementer
    const elementsToSearch = document.querySelectorAll("h1, h2, h3, h4, p, li, summary, .info-card h3, .info-card-blue h3");
    
    elementsToSearch.forEach((element) => {
      const text = element.textContent.toLowerCase();
      
      if (text.includes(query)) {
        // Unngå duplikater
        const isDuplicate = results.some(r => r.text === element.textContent);
        if (!isDuplicate) {
          let type = "Innhold";
          if (element.tagName.match(/^H[1-4]$/)) {
            type = "Overskrift";
          } else if (element.classList.contains("search-field")) {
            return;
          }
          
          results.push({
            text: element.textContent.substring(0, 60) + (element.textContent.length > 60 ? "..." : ""),
            type: type,
            element: element
          });
        }
      }
    });

    // Vis resultater
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">Ingen resultater funnet</div>';
    } else {
      searchResults.innerHTML = results.map((result, index) => `
        <div class="search-result-item" data-index="${index}">
          <div class="search-result-type">${result.type}</div>
          <div class="search-result-text">${result.text}</div>
        </div>
      `).join("");

      // Legg til click-handler for søkresultater
      document.querySelectorAll(".search-result-item").forEach((item, index) => {
        item.addEventListener("click", () => {
          results[index].element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Lukk menyen
          if (stepsMenu) {
            stepsMenu.classList.remove("show");
            if (stepsBtn) stepsBtn.setAttribute("aria-expanded", "false");
          }
          // Highlight elementet kort
          results[index].element.style.backgroundColor = "rgba(43,179,163,0.2)";
          setTimeout(() => {
            results[index].element.style.backgroundColor = "";
          }, 1500);
        });
      });
    }
  });
}

// show/hide scroll-to-top button
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) topBtn.classList.add('show');
  else topBtn.classList.remove('show');
});
topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));