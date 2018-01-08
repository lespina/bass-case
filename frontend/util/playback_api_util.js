export const fetchPlaybackSongs = (songIds) => {
  return $.ajax({
    url: `api/songs`,
    method: 'get',
    data: { songIds }
  });
};

export const fetchPlaybackSong = fetchSong;
