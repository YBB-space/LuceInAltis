(() => {
  const videos = [...document.querySelectorAll('video[data-deferred-video]')];
  const load = (video) => {
    let changed = false;
    video.querySelectorAll('source[data-src]').forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
      changed = true;
    });
    if (changed) {
      video.preload = 'auto';
      video.load();
    }
  };

  if ('IntersectionObserver' in window) {
    const pending = new Map();
    const warm = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        pending.get(entry.target)?.forEach(load);
        warm.unobserve(entry.target);
      });
    }, { rootMargin: '500px 0px' });
    videos.forEach((video) => {
      const section = video.closest('[data-tech-scroll], .pioneer-hero, .about-core') || video;
      if (!pending.has(section)) pending.set(section, []);
      pending.get(section).push(video);
      warm.observe(section);
    });
  } else {
    videos.forEach(load);
  }

  // Background loops only play on screen. Focus and technical videos keep
  // their existing one-play-per-visit behavior in their own controllers.
  document.querySelectorAll('video[data-background-video]').forEach((video) => {
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden) {
        load(video);
        video.play().catch(() => {});
      } else video.pause();
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      }, { threshold: .05 }).observe(video.closest('.about-core') || video);
    } else {
      visible = true;
      sync();
    }
    document.addEventListener('visibilitychange', sync);
  });
})();
