(() => {
  const root = document.querySelector('[data-pioneer-flow]');
  if (!root) return;
  const panels = [...root.querySelectorAll('.pioneer-flow__panel')];
  if (panels.length < 2) return;
  const header = document.querySelector('header');
  let frame = null;
  let current = -1;
  const clamp = (value) => Math.max(0, Math.min(1, value));

  const update = () => {
    frame = null;
    const headerHeight = header?.getBoundingClientRect().height || 0;
    const available = Math.max(1, window.innerHeight - headerHeight);
    const focus = headerHeight + available * .5;
    const fadeDistance = available * .18;
    const bounds = panels.map((panel) => panel.getBoundingClientRect());
    let selected = 0;
    bounds.forEach((box, index) => { if (box.top <= focus) selected = index; });
    if (selected !== current) {
      current = selected;
      panels.forEach((panel, index) => {
        panel.classList.toggle('is-flow-active', index === current);
        panel.inert = index !== current;
        panel.setAttribute('aria-hidden', String(index !== current));
      });
    }
    const entry = clamp((focus - bounds[current].top) / fadeDistance);
    const exit = current + 1 < bounds.length ? clamp((bounds[current + 1].top - focus) / fadeDistance) : 1;
    panels[current].style.setProperty('--flow-opacity', String(.2 + .8 * Math.min(entry, exit)));
    panels[current].style.setProperty('--flow-shift', `${18 * (1 - entry) - 18 * (1 - exit)}px`);
  };
  const requestUpdate = () => {
    if (frame === null) frame = requestAnimationFrame(update);
  };
  const measure = () => {
    root.style.setProperty('--flow-header-height', `${header?.getBoundingClientRect().height || 0}px`);
    requestUpdate();
  };

  root.classList.add('is-enhanced');
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', measure);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(requestUpdate);
    panels.forEach((panel) => observer.observe(panel));
    if (header) new ResizeObserver(measure).observe(header);
  }
  document.fonts?.ready.then(measure);
  measure();
})();
