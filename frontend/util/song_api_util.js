export const fetchSongs = () => {
  return $.ajax({
    url: `api/songs`,
    method: 'get',
    dataType: 'json'
  });
};

export const fetchSong = (songId) => {
  return $.ajax({
    url: `api/song/${songId}`,
    method: 'get',
  });
};

export const createSong = (formData) => {
  return $.ajax({
    url: `api/songs`,
    method: 'post',
    contentType: false,
    processData: false,
    data: formData,
  });
};

export const updateSong = (song) => {
  return $.ajax({
    url: `api/songs/${song.id}`,
    method: 'patch',
    data: { song }
  });
};
