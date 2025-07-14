document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('.header__theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  document.querySelectorAll('.genre-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.genre-button').forEach(btn => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
    });
  });

const slider = document.querySelector("#price-slider");
const priceValue = document.querySelector("#price-number");

function updateSliderStyle(value) {
  const percent = (value / slider.max) * 100;
  slider.style.background = `linear-gradient(to right, var(--brand-1) ${percent}%, var(--gray-5) ${percent}%)`;
}

slider.oninput = function () {
  const value = slider.value;
  priceValue.innerText = `R$ ${value}`;
  updateSliderStyle(value);
};

updateSliderStyle(slider.value);

});
