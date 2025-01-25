export const fetchSpotifyTracks = async (track) => {
  const url = `https://api.spotify.com/v1/search?q=${track}&type=track`;
  const access_token = localStorage.getItem('access_token');

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${access_token}`, // Replace with your actual token
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};