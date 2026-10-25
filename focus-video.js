(() => {
  document.querySelectorAll('[data-focus-video]').forEach((video) => {
    const section = video.closest('.pioneer-hero');
    if (!section) return;
    const header = document.querySelector('header');
    let observer;
    let inFocus = false;
    let playingVisit = false;

    video.muted = true;
    video.autoplay = false;
    video.loop = false;
    video.pause();

    const reset = () => {
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
    };
    const sync = () => {
      const active = inFocus && !document.hidden;
      if (active === playingVisit) return;
      playingVisit = active;
      reset();
      if (active) video.play().catch(() => {});
    };
    const observe = () => {
      const top = header?.getBoundingClientRect().height || 0;
      const available = Math.max(1, window.innerHeight - top);
      const inset = available * .35;
      observer?.disconnect();
      observer = new IntersectionObserver(([entry]) => {
        inFocus = entry.isIntersecting;
        sync();
      }, { rootMargin: `-${Math.round(top + inset)}px 0px -${Math.round(inset)}px 0px` });
      observer.observe(section);
    };

    document.addEventListener('visibilitychange', sync);
    window.addEventListener('resize', observe);
    if (header && 'ResizeObserver' in window) new ResizeObserver(observe).observe(header);
    observe();
  });
})();
