(() => {
  const root = document.querySelector('[data-vehicle-carousel]');
  if (!root) return;
  const copy = root.querySelector('[data-vehicle-copy]');
  const title = root.querySelector('[data-vehicle-title]');
  const description = root.querySelector('[data-vehicle-description]');
  const link = root.querySelector('[data-vehicle-link]');
  const counter = root.querySelector('[data-vehicle-counter]');
  const previous = root.querySelector('[data-vehicle-prev]');
  const next = root.querySelector('[data-vehicle-next]');
  const vehicles = [
    { name: 'PIONEER-I', href: 'pioneer.html', ko: description.textContent, en: 'ALTIS’s two-stage solid rocket combines mechanical stage separation, onboard second-stage ignition, and independent recovery for each stage.' },
    { name: 'FRONTIER-I', href: 'vehicles.html#frontier-i' },
    { name: 'FRONTIER-II', href: 'vehicles.html#frontier-ii' },
    { name: 'FRONTIER-III', href: 'vehicles.html#frontier-iii' },
    { name: 'FRONTIER-IV', href: 'vehicles.html#frontier-iv' },
    { name: 'ARAEA-I', href: 'vehicles.html#araea-i' }
  ];
  let current = 0;
  let changing = false;
  const render = () => {
    const english = document.documentElement.lang === 'en';
    const vehicle = vehicles[current];
    const model = root.querySelector('[data-vehicle-model]');
    const placeholder = root.querySelector('[data-vehicle-placeholder]');
    model.hidden = current !== 0;
    placeholder.hidden = current === 0;
    placeholder.textContent = vehicle.name;
    title.textContent = vehicle.name;
    description.textContent = vehicle[english ? 'en' : 'ko'] || '';
    description.setAttribute('aria-hidden', String(!description.textContent));
    link.href = vehicle.href;
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(vehicles.length).padStart(2, '0')}`;
    previous.setAttribute('aria-label', english ? 'Previous rocket' : '이전 로켓');
    root.querySelector('[data-vehicle-next-label]').textContent = english ? 'Next rocket' : '다음 로켓';
  };
  const change = async (direction) => {
    if (changing) return;
    const target = (current + direction + vehicles.length) % vehicles.length;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !copy.animate) {
      current = target;
      render();
      return;
    }
    changing = true;
    previous.disabled = next.disabled = true;
    let animation;
    try {
      animation = copy.animate([{ opacity: 1, translate: '0 0' }, { opacity: 0, translate: `${-direction * 18}px 0` }], { duration: 130, fill: 'forwards' });
      await animation.finished;
      current = target;
      render();
      animation.cancel();
      animation = copy.animate([{ opacity: 0, translate: `${direction * 18}px 0` }, { opacity: 1, translate: '0 0' }], { duration: 260, easing: 'ease-out', fill: 'forwards' });
      await animation.finished;
    } catch {
      current = target;
      render();
    } finally {
      animation?.cancel();
      previous.disabled = next.disabled = false;
      changing = false;
    }
  };
  previous.addEventListener('click', () => change(-1));
  next.addEventListener('click', () => change(1));
  root.querySelector('.pioneer-teaser__navigation').addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    change(event.key === 'ArrowLeft' ? -1 : 1);
  });
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  render();
})();
