document.documentElement.classList.add('js-ready');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu(returnFocus = false) {
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton?.focus();
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation?.classList.toggle('is-open', open);
});
navigation?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 861px)').addEventListener('change', () => closeMenu());
document.querySelectorAll('[data-print]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
});
const search = document.querySelector('#project-search');
if (search) {
  const cards = [...document.querySelectorAll('[data-project]')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  let category = 'All';
  const normalise = text => text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  const cardText = new Map(cards.map(card => [card, normalise(card.dataset.search)]));
  function applyFilters(updateUrl = true) {
    const terms = normalise(search.value.trim()).split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const visible = (category === 'All' || card.dataset.category === category) && terms.every(term => cardText.get(card).includes(term));
      card.hidden = !visible;
      if (visible) count++;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    document.querySelector('#result-count').textContent = count + (count === 1 ? ' project' : ' projects') + (category === 'All' ? '' : ' · ' + category);
    document.querySelector('#empty-state').hidden = count !== 0;
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.delete('area'); url.searchParams.delete('q');
      if (category !== 'All') url.searchParams.set('area', category);
      if (search.value.trim()) url.searchParams.set('q', search.value.trim());
      try { history.replaceState(null, '', url); } catch { /* File previews still support filtering. */ }
    }
  }
  function fromUrl() {
    const params = new URLSearchParams(location.search);
    category = filters.some(button => button.dataset.filter === params.get('area')) ? params.get('area') : 'All';
    search.value = params.get('q') || ''; applyFilters(false);
  }
  filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; applyFilters(); }));
  search.addEventListener('input', () => applyFilters());
  document.querySelector('#reset-filters').addEventListener('click', () => { category = 'All'; search.value = ''; applyFilters(); search.focus(); });
  window.addEventListener('popstate', fromUrl);
  document.querySelector('[data-catalogue-controls]').hidden = false;
  fromUrl();
}
