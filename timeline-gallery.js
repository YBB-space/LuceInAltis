(() => {
  const init = () => {
    document.querySelectorAll('[data-photo-gallery]').forEach((gallery) => {
      const images = [...gallery.querySelectorAll('[data-gallery-image]')];
      const dots = [...gallery.querySelectorAll('[data-gallery-index]')];
      const previous = gallery.querySelector('[data-gallery-prev]');
      const next = gallery.querySelector('[data-gallery-next]');
      const counter = gallery.querySelector('[data-gallery-counter]');
      const frame = gallery.querySelector('[data-gallery-frame]');
      const captions = images.map((image) => ({ ko: image.alt, en: image.dataset.altEn || image.alt }));
      if (!images.length || !previous || !next || !counter || !frame) return;

      let current = 0;
      let touchStart = null;

      const preload = () => {
        images[current].loading = 'eager';
        images[(current + 1) % images.length].loading = 'eager';
      };

      const show = (index, warm = true) => {
        current = (index + images.length) % images.length;
        images.forEach((image, i) => { image.hidden = i !== current; });
        dots.forEach((dot, i) => {
          if (i === current) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
          dot.tabIndex = i === current ? 0 : -1;
        });
        const position = `${current + 1} / ${images.length}`;
        if (counter.textContent !== position) counter.textContent = position;
        if (warm) preload();
      };

      const translate = () => {
        const english = document.documentElement.lang === 'en';
        gallery.setAttribute('aria-roledescription', english ? 'photo carousel' : '사진 갤러리');
        previous.setAttribute('aria-label', english ? 'Previous photo' : '이전 사진');
        next.setAttribute('aria-label', english ? 'Next photo' : '다음 사진');
        gallery.querySelector('[data-gallery-dots]').setAttribute('aria-label', english ? 'Choose photo' : '사진 선택');
        dots.forEach((dot, i) => dot.setAttribute('aria-label', english ? `View photo ${i + 1}` : `${i + 1}번째 사진 보기`));
        images.forEach((image, i) => { image.alt = captions[i][english ? 'en' : 'ko']; });
      };

      previous.addEventListener('click', () => show(current - 1));
      next.addEventListener('click', () => show(current + 1));
      dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

      gallery.addEventListener('keydown', (event) => {
        let destination;
        if (event.key === 'ArrowLeft') destination = current - 1;
        else if (event.key === 'ArrowRight') destination = current + 1;
        else if (event.key === 'Home') destination = 0;
        else if (event.key === 'End') destination = images.length - 1;
        else return;
        event.preventDefault();
        show(destination);
        if (event.target.matches('[data-gallery-index]')) dots[current].focus({ preventScroll: true });
      });

      frame.addEventListener('pointerdown', (event) => {
        if (event.pointerType !== 'touch' || event.target.closest('button')) return;
        touchStart = { x: event.clientX, y: event.clientY };
        frame.setPointerCapture(event.pointerId);
      });
      frame.addEventListener('pointerup', (event) => {
        if (!touchStart) return;
        const dx = event.clientX - touchStart.x;
        const dy = event.clientY - touchStart.y;
        touchStart = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) show(current + (dx < 0 ? 1 : -1));
      });
      frame.addEventListener('pointercancel', () => { touchStart = null; });

      show(0, false);
      translate();
      new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          preload();
          observer.disconnect();
        }, { rootMargin: '200px' });
        observer.observe(gallery);
      }
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
