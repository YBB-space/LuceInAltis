(() => {
  if (window.ALTIS_COMMON_LAYOUT_READY) return;
  window.ALTIS_COMMON_LAYOUT_READY = true;

  const initNav = () => {
    const nav = document.querySelector(".nav");
    const menuBtn = document.querySelector(".menu-toggle");
    const techDropdown = nav?.querySelector(".nav-tech-dropdown");
    const techLink = nav?.querySelector(".nav-tech-link");
    if (!nav || !menuBtn) return;

    const mql = window.matchMedia("(max-width: 900px)");

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
    };

    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      if (!isOpen) techDropdown?.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
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
      techDropdown?.classList.toggle("is-open");
    });

    const handleResize = () => {
      syncMenuButton();
      if (!mql.matches) closeMenu();
    };

    if (mql.addEventListener) {
      mql.addEventListener("change", handleResize);
    } else {
      mql.addListener(handleResize);
    }

    syncMenuButton();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav, { once: true });
  } else {
    initNav();
  }
})();
