export async function fetchAlbums() {
  const url = "https://openmusic-fake-api.onrender.com/api/musics";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Erro ao buscar álbuns:", error);
    return [];
  }
}