const apiUrl = 'http://localhost:3000/api'; // ajuste se estiver usando deploy

async function loadArtists() {
  const res = await fetch(`${apiUrl}/artists`);
  const data = await res.json();

  // lista de artistas na tela
  const list = document.getElementById('artistList');
  list.innerHTML = '';

  // dropdown de artistas para o formulário de música
  const select = document.getElementById('songArtistSelect');
  select.innerHTML = '<option value="">Selecione um artista</option>';

  data.forEach(artist => {
    // preenche lista
    const li = document.createElement('li');
    li.innerText = `${artist.name} - ${artist.genre}`;
    list.appendChild(li);

    // preenche dropdown
    const option = document.createElement('option');
    option.value = artist._id;
    option.innerText = artist.name;
    select.appendChild(option);
  });
}

async function loadSongs() {
  const res = await fetch(`${apiUrl}/songs`);
  const data = await res.json();
  const list = document.getElementById('songList');
  list.innerHTML = '';
  data.forEach(song => {
    const li = document.createElement('li');
    li.innerText = `${song.title} - Artista: ${song.artist?.name || song.artist}`;
    list.appendChild(li);
  });
}

async function addArtist() {
  const name = document.getElementById('artistName').value;
  const genre = document.getElementById('genre').value;
  if (!name) {
    alert('Preencha o nome do artista.');
    return;
  }
  await fetch(`${apiUrl}/artists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, genre }),
  });
  document.getElementById('artistName').value = '';
  document.getElementById('genre').value = '';
  await loadArtists();
}

async function addSong() {
  const title = document.getElementById('songTitle').value;
  const artistId = document.getElementById('songArtistSelect').value;

  if (!title) {
    alert('Preencha o título da música.');
    return;
  }
  if (!artistId) {
    alert('Selecione um artista.');
    return;
  }

  await fetch(`${apiUrl}/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, artist: artistId }),
  });

  document.getElementById('songTitle').value = '';
  document.getElementById('songArtistSelect').value = '';
  await loadSongs();
}

loadArtists();
loadSongs();
