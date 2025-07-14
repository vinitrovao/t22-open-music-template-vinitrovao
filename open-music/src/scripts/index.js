document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector("#price-slider");
  const priceValue = document.querySelector("#price-number");
  const albums = document.querySelectorAll(".album-card");
  let selectedGenre = "all";

  function updateSliderStyle(value) {
    const percent = (value / slider.max) * 100;
    slider.style.background = `linear-gradient(to right, var(--brand-1) ${percent}%, var(--gray-5) ${percent}%)`;
  }

  function filterAlbums() {
    const value = parseFloat(slider.value);

    albums.forEach(album => {
      const raw = album.dataset.price.replace(",", ".");
      const albumPrice = parseFloat(raw);
      const genreText = album.querySelector(".album-type")?.innerText.trim();

      const matchesPrice = albumPrice <= value;
      const matchesGenre = selectedGenre === "all" || genreText === selectedGenre;

      if (matchesPrice && matchesGenre) {
        album.style.display = "";
      } else {
        album.style.display = "none";
      }
    });
  }

  // Slider evento
  slider.addEventListener("input", () => {
    const value = parseFloat(slider.value);
    priceValue.innerText = `R$ ${value}`;
    updateSliderStyle(value);
    filterAlbums();
  });

  // Gênero botões evento
  document.querySelectorAll('.genre-button').forEach(button => {
    button.addEventListener('click', () => {
      // Ativa/desativa visualmente
      document.querySelectorAll('.genre-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      selectedGenre = button.dataset.genre;
      filterAlbums();
    });
  });

  // Inicializa
  updateSliderStyle(slider.value);
  slider.dispatchEvent(new Event('input'));
});
