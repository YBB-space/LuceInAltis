(() => {
  document.querySelectorAll('[data-stacked-gallery]').forEach((gallery) => {
    const cards = [...gallery.querySelectorAll('[data-stack-card]')];
    const stage = gallery.querySelector('[data-stack-turn]');
    const previous = gallery.querySelector('[data-stack-prev]');
    const next = gallery.querySelector('[data-stack-next]');
    const counter = gallery.querySelector('[data-stack-counter]');
    if (cards.length < 2 || !stage || !previous || !next || !counter) return;

    const backTransform = 'translate(12px, -10px) rotate(2deg) scale(.98)';
    const frontTransform = 'translate(0, 0) rotate(0deg) scale(1)';
    const imageAlts = cards.map((card) => card.querySelector('img').alt);
    let current = 0;
    let turning = false;
    let touchStart = null;
    let suppressClick = false;

    const render = () => {
      const english = document.documentElement.lang === 'en';
      cards.forEach((card, index) => {
        card.classList.toggle('is-front', index === current);
        card.hidden = index !== current && index !== (current + 1) % cards.length;
        card.setAttribute('aria-hidden', String(index !== current));
        const image = card.querySelector('img');
        image.alt = english ? image.dataset.altEn || imageAlts[index] : imageAlts[index];
      });
      counter.textContent = `${current + 1} / ${cards.length}`;
      stage.setAttribute('aria-label', english ? 'View next photo' : '다음 사진 보기');
      previous.setAttribute('aria-label', english ? 'Previous photo' : '이전 사진');
      next.setAttribute('aria-label', english ? 'Next photo' : '다음 사진');
    };

    const turn = async (direction) => {
      if (turning) return;
      const target = (current + direction + cards.length) % cards.length;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || typeof cards[current].animate !== 'function') {
        current = target;
        render();
        return;
      }

      turning = true;
      cards.forEach((card, index) => { card.hidden = index !== current && index !== target; });
      const animations = [];
      try {
        const options = { duration: 480, easing: 'cubic-bezier(.22, .8, .3, 1)', fill: 'forwards' };
        animations.push(cards[current].animate([
          { transform: frontTransform, opacity: 1, zIndex: 2 },
          { transform: `translate(${-direction * 24}%, -4%) rotate(${-direction * 8}deg) scale(.97)`, opacity: .3, zIndex: 2, offset: .48 },
          { transform: backTransform, opacity: .65, zIndex: 1 }
        ], options));
        animations.push(cards[target].animate([
          { transform: backTransform, opacity: .65, zIndex: 1 },
          { transform: frontTransform, opacity: 1, zIndex: 2 }
        ], options));
        await Promise.all(animations.map((animation) => animation.finished));
      } catch {
        // A cancelled animation still settles on a usable photo.
      } finally {
        current = target;
        render();
        animations.forEach((animation) => animation.cancel());
        turning = false;
      }
    };

    previous.addEventListener('click', () => turn(-1));
    next.addEventListener('click', () => turn(1));
    stage.addEventListener('click', () => {
      if (suppressClick) { suppressClick = false; return; }
      turn(1);
    });
    gallery.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      turn(event.key === 'ArrowLeft' ? -1 : 1);
    });
    stage.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'touch') return;
      suppressClick = false;
      touchStart = { x: event.clientX, y: event.clientY };
      stage.setPointerCapture(event.pointerId);
    });
    stage.addEventListener('pointerup', (event) => {
      if (!touchStart) return;
      const dx = event.clientX - touchStart.x;
      const dy = event.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        suppressClick = true;
        turn(dx < 0 ? 1 : -1);
      }
    });
    stage.addEventListener('pointercancel', () => { touchStart = null; });
    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    render();
  });
})();
