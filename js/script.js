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

    if (!searchIndex) {
      searchResultsDesktop.innerHTML = '<div class="search-no-results">Laster søkeindeks...</div>';
      return;
    }

    const results = [];
    const seen = new Set();
    
    searchIndex.forEach((item) => {
      const text = item.text.toLowerCase();
      
      if (text.includes(query)) {
        const key = `${item.page}:${item.text}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push(item);
        }
      }
    });

    if (results.length === 0) {
      searchResultsDesktop.innerHTML = '<div class="search-no-results">Ingen resultater funnet</div>';
    } else {
      searchResultsDesktop.innerHTML = results.map((result, index) => `
        <div class="search-result-item" data-index="${index}">
          <div class="search-result-type">${result.type} - ${result.pageTitle}</div>
          <div class="search-result-text">${result.displayText}</div>
        </div>
      `).join("");

      // attach click handlers to items in the results container
      searchResultsDesktop.querySelectorAll('.search-result-item').forEach((item, index) => {
        item.addEventListener("click", () => {
          const result = results[index];
          
          if (result.isCurrentPage) {
            // Search in current page and scroll to element
            const elementsToSearch = document.querySelectorAll("h1, h2, h3, h4, p, li, summary, .info-card h3, .info-card-blue h3");
            let foundElement = null;
            
            elementsToSearch.forEach((element) => {
              if (element.textContent.trim() === result.text) {
                foundElement = element;
              }
            });
            
            if (foundElement) {
              foundElement.scrollIntoView({ behavior: "smooth", block: "center" });
              foundElement.style.backgroundColor = "rgba(43,179,163,0.2)";
              setTimeout(() => {
                foundElement.style.backgroundColor = "";
              }, 1500);
            }
          } else {
            // Navigate to other page with search query as parameter
            window.location.href = result.page + '?search=' + encodeURIComponent(query);
          }
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

// Cross-page search functionality
const allPages = [
  { url: 'index.html', title: 'Forside' },
  { url: 'identifisering.html', title: 'Identifisering' },
  { url: 'mottak.html', title: 'Mottak' },
  { url: 'hjemmetid.html', title: 'Hjemmetid' },
  { url: 'hjemmedod.html', title: 'Hjemmedød' },
  { url: 'vaketjeneste.html', title: 'Våketjenesten' }
];

let searchIndex = null;

// Build search index from all pages
async function buildSearchIndex() {
  const index = [];
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  
  for (const page of allPages) {
    try {
      const response = await fetch(page.url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      const elementsToSearch = doc.querySelectorAll("h1, h2, h3, h4, p, li, summary, .info-card h3, .info-card-blue h3");
      
      elementsToSearch.forEach((element) => {
        const text = element.textContent.trim();
        if (text && !element.classList.contains("search-field")) {
          let type = "Innhold";
          if (element.tagName.match(/^H[1-4]$/)) {
            type = "Overskrift";
          }
          
          index.push({
            text: text,
            displayText: text.substring(0, 60) + (text.length > 60 ? "..." : ""),
            type: type,
            page: page.url,
            pageTitle: page.title,
            isCurrentPage: page.url === currentPage
          });
        }
      });
    } catch (error) {
      console.error(`Failed to load ${page.url}:`, error);
    }
  }
  
  return index;
}

// Søkefunksjonalitet (Mobile)
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

if (searchInput) {
  // Build index on page load
  buildSearchIndex().then(index => {
    searchIndex = index;
  });

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

    if (!searchIndex) {
      searchResults.innerHTML = '<div class="search-no-results">Laster søkeindeks...</div>';
      return;
    }

    const results = [];
    const seen = new Set();
    
    searchIndex.forEach((item) => {
      const text = item.text.toLowerCase();
      
      if (text.includes(query)) {
        const key = `${item.page}:${item.text}`;
        if (!seen.has(key)) {
          seen.add(key);
          results.push(item);
        }
      }
    });

    // Vis resultater
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">Ingen resultater funnet</div>';
    } else {
      searchResults.innerHTML = results.map((result, index) => `
        <div class="search-result-item" data-index="${index}">
          <div class="search-result-type">${result.type} - ${result.pageTitle}</div>
          <div class="search-result-text">${result.displayText}</div>
        </div>
      `).join("");

      // Legg til click-handler for søkresultater
      document.querySelectorAll(".search-result-item").forEach((item, index) => {
        item.addEventListener("click", () => {
          const result = results[index];
          
          if (result.isCurrentPage) {
            // Search in current page and scroll to element
            const elementsToSearch = document.querySelectorAll("h1, h2, h3, h4, p, li, summary, .info-card h3, .info-card-blue h3");
            let foundElement = null;
            
            elementsToSearch.forEach((element) => {
              if (element.textContent.trim() === result.text) {
                foundElement = element;
              }
            });
            
            if (foundElement) {
              foundElement.scrollIntoView({ behavior: "smooth", block: "center" });
              foundElement.style.backgroundColor = "rgba(43,179,163,0.2)";
              setTimeout(() => {
                foundElement.style.backgroundColor = "";
              }, 1500);
            }
            
            // Lukk menyen
            if (stepsMenu) {
              stepsMenu.classList.remove("show");
              if (stepsBtn) stepsBtn.setAttribute("aria-expanded", "false");
            }
          } else {
            // Navigate to other page with search query as parameter
            window.location.href = result.page + '?search=' + encodeURIComponent(query);
          }
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

const btn = document.getElementById("stepsBtn");
const menu = document.getElementById("stepsMenu");

btn.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");

  btn.setAttribute("aria-expanded", isOpen);

  if (isOpen) {
    btn.innerHTML = '<i data-lucide="x"></i>';
  } else {
    btn.innerHTML = '<i data-lucide="menu"></i>';
  }

  lucide.createIcons();
});

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  
  // Check if page was loaded with a search parameter
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  
  if (searchQuery) {
    // Wait a bit for page to fully render
    setTimeout(() => {
      const elementsToSearch = document.querySelectorAll("h1, h2, h3, h4, p, li, summary, .info-card h3, .info-card-blue h3");
      let foundElement = null;
      const queryLower = searchQuery.toLowerCase();
      
      // Find first element that contains the search query
      elementsToSearch.forEach((element) => {
        if (!foundElement && element.textContent.toLowerCase().includes(queryLower)) {
          foundElement = element;
        }
      });
      
      if (foundElement) {
        foundElement.scrollIntoView({ behavior: "smooth", block: "center" });
        foundElement.style.backgroundColor = "rgba(43,179,163,0.2)";
        setTimeout(() => {
          foundElement.style.backgroundColor = "";
        }, 1500);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }, 300);
  }
});