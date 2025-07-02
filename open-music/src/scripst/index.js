// Alternar tema
document.querySelector('.header__theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Filtro de gêneros
document.querySelectorAll('.genre-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.genre-button').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  });
});

// Atualizar valor do range
const priceRange = document.querySelector('.price-range');
const priceValue = document.querySelector('.price-value');

priceRange.addEventListener('input', () => {
  const min = 0;
  const max = priceRange.max;
  const value = priceRange.value;
  
  priceValue.textContent = `R$ ${value} - R$ ${max}`;
});