(() => {
  const media = document.getElementById('media');
  if (!media) return;

  const cards = [...media.querySelectorAll('.media-card')];
  const previous = media.querySelector('[data-media-prev]');
  const next = media.querySelector('[data-media-next]');
  const status = media.querySelector('[data-media-status]');
  const grid = media.querySelector('.media-grid');
  const viewport = media.querySelector('.media-viewport');
  if (!cards.length || !previous || !next || !status || !grid || !viewport) return;

  const pageSize = 2;
  const pageCount = Math.ceil(cards.length / pageSize);
  let page = 0;
  let transitioning = false;

  const updateControls = () => {
    previous.disabled = transitioning || page === 0;
    next.disabled = transitioning || page === pageCount - 1;
  };

  const showPage = (destination) => {
    page = Math.max(0, Math.min(pageCount - 1, destination));
    cards.forEach((card, index) => {
      const visible = Math.floor(index / pageSize) === page;
      card.hidden = !visible;
      const iframe = card.querySelector('iframe');
      if (!iframe) return;
      if (!iframe.dataset.src) iframe.dataset.src = iframe.getAttribute('src');
      if (visible && !iframe.hasAttribute('src')) iframe.src = iframe.dataset.src;
      // Unload videos when leaving a page so playback cannot continue offscreen.
      if (!visible) iframe.removeAttribute('src');
    });
    updateControls();
    status.textContent = `${page + 1} / ${pageCount}`;
  };

  const navigate = async (destination) => {
    const target = Math.max(0, Math.min(pageCount - 1, destination));
    if (transitioning || target === page) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion && typeof grid.animate === 'function') {
      const direction = target > page ? 1 : -1;
      // Keep the arrows and footer in place when the last page has fewer cards.
      viewport.style.minHeight = `${Math.max(viewport.getBoundingClientRect().height, grid.getBoundingClientRect().height)}px`;
      transitioning = true;
      grid.inert = true;
      updateControls();
      let animation;
      try {
        animation = grid.animate([
          { transform: 'translateX(0)', opacity: 1 },
          { transform: `translateX(${-direction * 8}%)`, opacity: 0 }
        ], { duration: 150, easing: 'ease-in', fill: 'forwards' });
        await animation.finished;
        showPage(target);
        animation.cancel();
        animation = grid.animate([
          { transform: `translateX(${direction * 8}%)`, opacity: 0 },
          { transform: 'translateX(0)', opacity: 1 }
        ], { duration: 270, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
        await animation.finished;
      } catch {
        showPage(target);
      } finally {
        animation?.cancel();
        grid.inert = false;
        transitioning = false;
        updateControls();
      }
    } else {
      showPage(target);
    }
    // Keep keyboard focus on an enabled control at either end of the list.
    if (document.activeElement === next && next.disabled) previous.focus({ preventScroll: true });
    else if (document.activeElement === previous && previous.disabled) next.focus({ preventScroll: true });
  };

  previous.addEventListener('click', () => navigate(page - 1));
  next.addEventListener('click', () => navigate(page + 1));
  window.addEventListener('resize', () => { viewport.style.minHeight = ''; });
  media.querySelector('.media-pagination').hidden = pageCount < 2;
  showPage(0);
})();
