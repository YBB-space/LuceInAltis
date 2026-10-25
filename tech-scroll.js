(() => {
  document.querySelectorAll('[data-tech-scroll]').forEach((root) => {
    const viewport = root.querySelector('.tech-scroll__viewport');
    const panels = [...root.querySelectorAll('.about-technology-topic')];
    if (!viewport || panels.length < 2) return;

    const header = document.querySelector('header');
    const progress = document.createElement('div');
    progress.className = 'tech-scroll__progress';
    progress.setAttribute('role', 'group');
    const buttons = panels.map((panel, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const title = document.createElement('span');
      title.className = 'tech-scroll__title';
      button.append(number, title);
      button.setAttribute('aria-controls', panel.id);
      button.addEventListener('click', () => goTo(index));
      progress.append(button);
      return button;
    });
    viewport.append(progress);
    root.classList.add('is-enhanced');

    let current = -1;
    let stageHeight = 0;
    let progressSpace = 72;
    let stickyTop = 0;
    let offsets = [];
    let heights = [];
    let frame = null;
    let viewportVisible = false;
    const startedVideos = new Set();
    const videos = [...root.querySelectorAll('[data-section-video]')];
    const syncVideos = () => {
      videos.forEach((video) => {
        const visible = viewportVisible && panels[current]?.contains(video);
        if (visible && !startedVideos.has(video)) {
          startedVideos.add(video);
          video.muted = true;
          video.currentTime = 0;
          video.play().catch(() => startedVideos.delete(video));
        } else if (!visible) {
          video.pause();
          if (startedVideos.delete(video)) video.currentTime = 0;
        }
      });
    };

    const show = (index) => {
      if (index === current) return;
      const focusedPanel = panels.find((panel) => panel.contains(document.activeElement));
      root.style.setProperty('--tech-enter-offset', index < current ? '-32px' : '32px');
      current = index;
      panels.forEach((panel, i) => {
        panel.hidden = i !== current;
        panel.inert = i !== current;
        panel.classList.toggle('is-active', i === current);
        panel.setAttribute('aria-hidden', String(i !== current));
        if (i === current) buttons[i].setAttribute('aria-current', 'step');
        else buttons[i].removeAttribute('aria-current');
      });
      syncVideos();
      if (focusedPanel && focusedPanel !== panels[current]) buttons[current].focus({ preventScroll: true });
    };

    const update = () => {
      frame = null;
      const distance = Math.max(0, stickyTop - root.getBoundingClientRect().top);
      let index = 0;
      while (index + 1 < panels.length && distance >= offsets[index + 1]) index += 1;
      show(index);
      const available = stageHeight - progressSpace;
      const overflow = Math.max(0, heights[index] + 56 - available);
      // Tall mobile sections pan with the page before advancing to the next one.
      const pan = Math.min(overflow, Math.max(0, distance - offsets[index] - stageHeight * .25));
      const top = Math.max(28, (available - heights[index]) / 2) - pan;
      panels[index].style.setProperty('--tech-panel-y', `${top}px`);
    };

    const requestUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    const measure = () => {
      stickyTop = Math.max(0, header?.getBoundingClientRect().height || 0);
      stageHeight = Math.max(280, window.innerHeight - stickyTop);
      root.style.setProperty('--tech-sticky-top', `${stickyTop}px`);
      root.style.setProperty('--tech-stage-height', `${stageHeight}px`);
      heights = panels.map((panel, index) => {
        const hidden = panel.hidden;
        panel.style.visibility = 'hidden';
        panel.hidden = false;
        const height = panel.getBoundingClientRect().height;
        panel.hidden = hidden;
        panel.style.visibility = '';
        const title = panel.querySelector('h2, h4').textContent;
        buttons[index].querySelector('.tech-scroll__title').textContent = title;
        buttons[index].setAttribute('aria-label', `${index + 1}. ${title}`);
        return height;
      });
      progressSpace = Math.max(72, progress.getBoundingClientRect().height + 32);
      let total = 0;
      offsets = heights.map((height) => {
        const offset = total;
        total += stageHeight + Math.max(0, height + 56 - (stageHeight - progressSpace));
        return offset;
      });
      root.style.height = `${total + stageHeight}px`;
      progress.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Technology sections' : '기술 섹션 선택');
      requestUpdate();
    };

    function goTo(index, instant = false) {
      const start = window.scrollY + root.getBoundingClientRect().top - stickyTop;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: start + offsets[index] + 1, behavior: instant || reduced ? 'instant' : 'smooth' });
    }

    const syncHash = () => {
      const index = panels.findIndex((panel) => `#${panel.id}` === window.location.hash);
      if (index >= 0) goTo(index, true);
    };

    progress.addEventListener('keydown', (event) => {
      const index = buttons.indexOf(document.activeElement);
      if (index < 0) return;
      let target;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = Math.min(panels.length - 1, index + 1);
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = Math.max(0, index - 1);
      else return;
      event.preventDefault();
      buttons[target].focus({ preventScroll: true });
      goTo(target);
    });
    window.addEventListener('scroll', requestUpdate, { passive: true });
    new IntersectionObserver(([entry]) => {
      viewportVisible = entry.isIntersecting && entry.intersectionRatio >= .25;
      syncVideos();
    }, { threshold: [0, .25] }).observe(viewport);
    window.addEventListener('resize', measure);
    window.addEventListener('hashchange', syncHash);
    if (header && 'ResizeObserver' in window) new ResizeObserver(measure).observe(header);
    new MutationObserver(measure).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    root.querySelectorAll('img').forEach((image) => image.addEventListener('load', measure, { once: true }));
    document.fonts?.ready.then(measure);
    measure();
    syncHash();
  });
})();
