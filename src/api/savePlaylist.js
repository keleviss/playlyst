export const savePlaylist = async (userId, playlist, playlistTracks) => {
  const createNewPlaylistURL = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const access_token = localStorage.getItem('access_token');
  const body = JSON.stringify({
    "name": playlist.name,
    "description": playlist.description,
    "public": playlist.public
  });

  try {
    const response = await fetch(createNewPlaylistURL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`, // Replace with your actual token
        'Content-Type': 'application/json'
      },
      body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const playlist = await response.json();
    console.log(playlist);

    const playlistId = playlist.id;
    const addItemsToPlaylistURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const uris = JSON.stringify({
      "uris": playlistTracks.map(track => track.uri),
      "position": 0
    });

    try {
      const response = await fetch(addItemsToPlaylistURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`, // Replace with your actual token
          'Content-Type': 'application/json'
        },
        body: uris
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return(playlistId);

    } catch (error) {
      console.error('Error adding items to playlist: ', error);
    }
  } catch (error) {
    console.error('Error creating playlist: ', error);
  }
};