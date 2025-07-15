import { fetchAlbums } from './api.js';

document.addEventListener('DOMContentLoaded', () => { 
  document.querySelector('.header__theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  }); 

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
  const albums = document.querySelectorAll(".album-card");

  albums.forEach(album => {
    const raw = album.dataset.price.replace(",", ".");
    const albumPrice = parseFloat(raw);
    const genreText = album.querySelector(".album-type")?.innerText.trim().toLowerCase();

    const matchesPrice = albumPrice <= value;
    const matchesGenre = selectedGenre === "all" || genreText === selectedGenre.toLowerCase();

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

async function carregarAlbuns() {
  const albumsContainer = document.querySelector('.albums-container');

  albumsContainer.innerHTML = ''; // Limpa o container antes de adicionar

  const albums = await fetchAlbums();

  if (albums.length === 0) {
    albumsContainer.innerHTML = '<p>Não foi possível carregar os álbuns.</p>';
    return;
  }

albums.forEach(album => {
  const albumCard = document.createElement('div');
  albumCard.classList.add('album-card');
  albumCard.setAttribute('data-price', album.price); // Adiciona o atributo data-price

  albumCard.innerHTML = `
    <img src="${album.img}" alt="${album.title}" class="album-cover" />
    <div class="album-info">
      <h3 class="album-title">${album.title}</h3>
      <div class="album-details">
        <p class="album-band">${album.band}</p>
        <p class="album-type">${album.genre}</p>
      </div>
      <div class="pricing">
        <p class="album-price">R$ ${Number(album.price).toFixed(2).replace('.', ',')}</p>
        <button class="buy-button">Comprar</button>
      </div>
    </div>
  `;

  albumsContainer.appendChild(albumCard);
});

}

document.addEventListener('DOMContentLoaded', carregarAlbuns);