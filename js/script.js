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

// Helper function to find and highlight search result
function highlightSearchResult(targetText) {
  const elementsToSearch = document.querySelectorAll("h1, h2, h3, h4, p, li, summary, .info-card h3, .info-card-blue h3");
  let foundElement = null;
  
  elementsToSearch.forEach((element) => {
    if (element.textContent.trim() === targetText) {
      foundElement = element;
    }
  });
  
  if (foundElement) {
    let elementToHighlight = foundElement;
    
    // Check if element is inside a <details> accordion
    const detailsAccordion = foundElement.closest('details.accordion-item');
    if (detailsAccordion) {
      // Find the summary inside this details element
      const summary = detailsAccordion.querySelector('summary');
      if (summary) {
        // Open the details element
        detailsAccordion.open = true;
        elementToHighlight = summary;
      }
    }
    
    // Check if element is inside a .dropdown-group accordion
    const dropdownAccordion = foundElement.closest('.dropdown-group');
    if (dropdownAccordion) {
      const toggle = dropdownAccordion.querySelector('.group-toggle');
      const content = dropdownAccordion.querySelector('.group-content');
      
      // If accordion is not expanded, expand it
      if (!dropdownAccordion.classList.contains('expanded')) {
        dropdownAccordion.classList.add('expanded');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
      
      if (toggle) {
        elementToHighlight = toggle;
      }
    }
    
    // Scroll to and highlight the element
    elementToHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
    elementToHighlight.style.backgroundColor = "rgba(41, 152, 139, 0.54)";
    elementToHighlight.style.borderRadius = "8px";
    
    setTimeout(() => {
      elementToHighlight.style.backgroundColor = "";
    }, 1500);
    
    return true;
  }
  
  return false;
}

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
            highlightSearchResult(result.text);
          } else {
            // Navigate to other page with full text as parameter
            window.location.href = result.page + '?search=' + encodeURIComponent(result.text);
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
    
    // Auto-focus search input when dropdown opens
    if (expanded) {
      const searchInput = document.getElementById("searchInputDesktop");
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
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
  { url: 'igangsetting.html', title: 'Igangsetting' },
  { url: 'hjemmetid.html', title: 'Hjemmetid' },
  { url: 'hjemmedod.html', title: 'Hjemmedød' },
  { url: 'vaketjeneste.html', title: 'Våketjenesten' },
  { url: 'dokumentasjon.html', title: 'Dokumentasjon' },
  { url: 'lenker.html', title: 'Lenker' }
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
            highlightSearchResult(result.text);
            
            // Lukk menyen
            if (stepsMenu) {
              stepsMenu.classList.remove("show");
              if (stepsBtn) stepsBtn.setAttribute("aria-expanded", "false");
            }
          } else {
            // Navigate to other page with full text as parameter
            window.location.href = result.page + '?search=' + encodeURIComponent(result.text);
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

// Breadcrumb and navigation system
const pageMap = {
  'index.html': { title: 'Forside', position: 0, previousPage: null },
  'identifisering.html': { title: 'Identifisering', position: 1, previousPage: 'index.html' },
  'igangsetting.html': { title: 'Igangsetting', position: 2, previousPage: 'identifisering.html' },
  'hjemmetid.html': { title: 'Hjemmetid', position: 3, previousPage: 'igangsetting.html' },
  'hjemmedod.html': { title: 'Hjemmedød', position: 4, previousPage: 'hjemmetid.html' },
  'oppfolging.html': { title: 'Oppfølging', position: 5, previousPage: 'hjemmedod.html' },
  'vaketjeneste.html': { title: 'Våketjenesten', position: 6, previousPage: 'index.html' },
  'dokumentasjon.html': { title: 'Dokumentasjon', position: 6, previousPage: 'index.html' },
  'lenker.html': { title: 'Lenker', position: 6, previousPage: 'index.html' },
  'kontakt.html': { title: 'Kontakt', position: 6, previousPage: 'index.html' },
  'kompetanseSenter.html': { title: 'Kompetansesenteret', position: 6, previousPage: 'index.html' },
  'ressursSykepleier.html': { title: 'Ressurssykepleier', position: 6, previousPage: 'index.html' },
  'kreftomsorg.html': { title: 'Kreftomsorg Rogaland', position: 6, previousPage: 'index.html' },
  'kreftkoordinator.html': { title: 'Kreftkoordinator/demenskoordinator/AKS', position: 6, previousPage: 'index.html' },
  'palliativtTeam.html': { title: 'Palliativt team', position: 6, previousPage: 'index.html' },
  'fastlege.html': { title: 'Fastlege', position: 6, previousPage: 'index.html' }
};

function generateBreadcrumbs() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const breadcrumbContainer = document.querySelector('.breadcrumb-nav');
  
  if (!breadcrumbContainer) return;
  
  const pageInfo = pageMap[currentPage];
  if (!pageInfo) return;
  
  let breadcrumbHTML = '<a href="index.html">Forside</a>';
  
  // For oppfolging.html, show intermediate page (hjemmedod)
  if (currentPage === 'oppfolging.html' && pageInfo.previousPage) {
    const prevPageInfo = pageMap[pageInfo.previousPage];
    if (prevPageInfo) {
      breadcrumbHTML += ` <span class="breadcrumb-separator">/</span> <a href="${pageInfo.previousPage}">${prevPageInfo.title}</a>`;
    }
  }
  
  // Add current page if not index
  if (currentPage !== 'index.html' && pageInfo.position > 0) {
    breadcrumbHTML += ` <span class="breadcrumb-separator">/</span> <span class="breadcrumb-current">${pageInfo.title}</span>`;
  }
  
  breadcrumbContainer.innerHTML = breadcrumbHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  generateBreadcrumbs();
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
      highlightSearchResult(searchQuery);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }, 300);
  }
});