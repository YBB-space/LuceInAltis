(() => {
  if (window.ALTIS_COMMON_LAYOUT_READY) return;
  window.ALTIS_COMMON_LAYOUT_READY = true;

  // Change this to true when the individual Tech pages are ready to reopen.
  const TECH_PAGES_ENABLED = false;

  const initNav = () => {
    const nav = document.querySelector(".nav");
    const menuBtn = document.querySelector(".menu-toggle");
    const techDropdown = nav?.querySelector(".nav-tech-dropdown");
    const techLink = nav?.querySelector(".nav-tech-link");
    if (!nav || !menuBtn) return;

    const mql = window.matchMedia("(max-width: 900px)");

    const currentPath = decodeURIComponent(window.location.pathname);
    nav.querySelectorAll("nav a[href]").forEach((link) => {
      const target = new URL(link.href, window.location.href);
      if (decodeURIComponent(target.pathname) === currentPath && !target.hash) {
        link.setAttribute("aria-current", "page");
        if (link.closest(".nav-tech-dropdown-menu")) techLink?.classList.add("is-current");
      }
    });

    if (!TECH_PAGES_ENABLED) {
      nav.querySelectorAll(".nav-tech-dropdown-menu a[href]").forEach((link) => {
        link.dataset.techHref = link.getAttribute("href");
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
        link.setAttribute("tabindex", "-1");
        link.classList.add("is-disabled");
      });
    }
    if (techDropdown && techLink) {
      const submenu = techDropdown.querySelector(".nav-tech-dropdown-menu");
      if (submenu) {
        submenu.id = "tech-nav-menu";
        techLink.setAttribute("aria-controls", submenu.id);
      }
    }

    const syncMenuButton = () => {
      if (mql.matches) {
        menuBtn.style.display = "inline-flex";
        menuBtn.style.position = "absolute";
        menuBtn.style.top = "50%";
        menuBtn.style.right = window.matchMedia("(max-width: 560px)").matches ? "16px" : "24px";
        menuBtn.style.transform = "translateY(-50%)";
        menuBtn.style.visibility = "visible";
        menuBtn.style.opacity = "1";
      } else {
        menuBtn.removeAttribute("style");
      }
    };

    const closeMenu = () => {
      nav.classList.remove("is-open");
      techDropdown?.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      if (mql.matches) techLink?.setAttribute("aria-expanded", "false");
    };

    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      if (!isOpen) techDropdown?.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      if (!isOpen && mql.matches) techLink?.setAttribute("aria-expanded", "false");
    });

    nav.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        if (link.classList.contains("nav-tech-link")) return;
        closeMenu();
      });
    });

    techLink?.addEventListener("click", (event) => {
      if (!mql.matches) return;
      event.preventDefault();
      const isOpen = techDropdown?.classList.toggle("is-open");
      techLink.setAttribute("aria-expanded", String(Boolean(isOpen)));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !nav.classList.contains("is-open")) return;
      closeMenu();
      menuBtn.focus();
    });
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) closeMenu();
    });

    const handleResize = () => {
      syncMenuButton();
      if (!mql.matches) closeMenu();
      if (mql.matches) techLink?.setAttribute("aria-expanded", "false");
      else techLink?.removeAttribute("aria-expanded");
    };

    if (mql.addEventListener) {
      mql.addEventListener("change", handleResize);
    } else {
      mql.addListener(handleResize);
    }

    handleResize();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav, { once: true });
  } else {
    initNav();
  }
})();
