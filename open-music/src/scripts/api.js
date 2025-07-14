export async function fetchAlbums() {
  try {
    const response = await fetch('https://openmusic-fake-api.onrender.com/api/musics');

    if (!response.ok) {
      throw new Error('Erro ao buscar os álbuns');
    }

    const albums = await response.json();

    return albums;

  } catch (error) {
    console.error(error);
    return []; 
  }
}