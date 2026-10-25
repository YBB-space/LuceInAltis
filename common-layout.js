(() => {
  if (window.ALTIS_COMMON_LAYOUT_READY) return;
  window.ALTIS_COMMON_LAYOUT_READY = true;

  // Individual Tech pages are available through the navigation.
  const TECH_PAGES_ENABLED = true;

  const initNav = () => {
    const nav = document.querySelector(".nav");
    const menuBtn = document.querySelector(".menu-toggle");
    const dropdowns = [...(nav?.querySelectorAll(".nav-tech-dropdown") || [])];
    const triggers = dropdowns.map((dropdown) => dropdown.querySelector(".nav-tech-link")).filter(Boolean);
    if (!nav || !menuBtn) return;

    const mql = window.matchMedia("(max-width: 900px)");

    const currentPath = decodeURIComponent(window.location.pathname);
    nav.querySelectorAll("nav a[href]").forEach((link) => {
      const target = new URL(link.href, window.location.href);
      if (decodeURIComponent(target.pathname) === currentPath && !target.hash) {
        if (link.classList.contains("nav-tech-link")) {
          link.classList.add("is-current");
        } else {
          link.setAttribute("aria-current", "page");
          link.closest(".nav-tech-dropdown")?.querySelector(".nav-tech-link")?.classList.add("is-current");
        }
      }
    });

    if (!TECH_PAGES_ENABLED) {
      nav.querySelectorAll(".nav-tech-dropdown:not(.nav-vehicle-dropdown) .nav-tech-dropdown-menu a[href]").forEach((link) => {
        link.dataset.techHref = link.getAttribute("href");
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
        link.setAttribute("tabindex", "-1");
        link.classList.add("is-disabled");
      });
    }
    dropdowns.forEach((dropdown, index) => {
      const trigger = dropdown.querySelector(".nav-tech-link");
      const submenu = dropdown.querySelector(".nav-tech-dropdown-menu");
      if (!trigger || !submenu) return;
      submenu.id = dropdown.classList.contains("nav-vehicle-dropdown") ? "vehicle-nav-menu" : `tech-nav-menu-${index}`;
      trigger.setAttribute("aria-controls", submenu.id);
      trigger.setAttribute("aria-haspopup", "true");
    });

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
      dropdowns.forEach((dropdown) => dropdown.classList.remove("is-open"));
      menuBtn.setAttribute("aria-expanded", "false");
      if (mql.matches) triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
    };

    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      if (!isOpen) dropdowns.forEach((dropdown) => dropdown.classList.remove("is-open"));
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      if (!isOpen && mql.matches) triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
    });

    nav.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        if (link.classList.contains("nav-tech-link")) return;
        closeMenu();
      });
    });

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".nav-tech-link");
      trigger?.addEventListener("click", (event) => {
        if (!mql.matches) {
          if (trigger.getAttribute("href") === "#") event.preventDefault();
          return;
        }
        event.preventDefault();
        const isOpen = !dropdown.classList.contains("is-open");
        dropdowns.forEach((item) => item.classList.remove("is-open"));
        triggers.forEach((item) => item.setAttribute("aria-expanded", "false"));
        dropdown.classList.toggle("is-open", isOpen);
        trigger.setAttribute("aria-expanded", String(isOpen));
      });
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
      if (mql.matches) triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
      else triggers.forEach((trigger) => trigger.removeAttribute("aria-expanded"));
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
