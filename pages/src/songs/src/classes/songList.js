import Song from '../classes/Song.js';

const songList = (drupalSongData) => {
  const list = drupalSongData.data
  let markup = "";
  for (const [key, value] of Object.entries(list)) {
    const song = new Song(value.attributes);
    
    markup += `<div id="song-${song.number}">`;
    markup += `<h2>${song.title}</h2>`;
    markup += song.body;
    markup += `</div>`;
  }
  return markup;
  // console.log(drupalSongData.data[0].attributes.title)
}

export default songList;

