import { useState, useEffect } from 'react';
import NavBar from './Features/NavBar/containers/NavBar';
import SearchBarContainer from './Features/SearchBar/containers/SearchBarContainer';
import ResultsContainer from './Features/SearchResults/containers/ResultsContainer';
import PlaylistContainer from './Features/Playlist/containers/PlaylistContainer';
import { userLogin } from './SpotifyAPI/userLogin';
import { results } from './HelperFunctions/results';

function App() {
  const [profileData, setProfileData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrackToPlaylist = (id) => {
    const track = searchResults.find(item => item.id === id);
    if (track && !playlistTracks.some(item => item.id === id)) {
      setPlaylistTracks(prev => [...prev, track]);
    }
  };

  const removeTrackFromPlaylist = (id) => {
    setPlaylistTracks(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    userLogin().then(portait => {
    if(portait) {
        setProfileData(portait);
        setLoggedIn(true);
      }
    });
  }, []);

  return (
    <div className='App'>
      <NavBar profileData={profileData} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className='main'>
        <SearchBarContainer setSearchResults={setSearchResults}/>
        <ResultsContainer addTrack={addTrackToPlaylist} results={searchResults}/>
        <PlaylistContainer removeTrack={removeTrackFromPlaylist} tracks={playlistTracks}/>
      </div>
    </div>
  );
}

export default App;