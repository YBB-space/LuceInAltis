(() => {
  const items = document.querySelectorAll('.reveal-slide');
  const translate = () => {
    const sequence = document.querySelector('[data-i18n-sequence]');
    if (sequence) sequence.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Two-stage rocket flight sequence' : '2단 로켓 비행 순서');
  };
  translate();
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
  }, { threshold: .18, rootMargin: '0px 0px -10% 0px' });
  items.forEach((item) => observer.observe(item));
})();
