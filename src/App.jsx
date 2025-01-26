import { useState, useEffect } from 'react';
import NavBar from './Features/NavBar/containers/NavBar';
import SearchBarContainer from './Features/SearchBar/containers/SearchBarContainer';
import ResultsContainer from './Features/SearchResults/containers/ResultsContainer';
import PlaylistContainer from './Features/Playlist/containers/PlaylistContainer';
import { userLogin } from './SpotifyAPI/userLogin';

function App() {
  const [profileData, setProfileData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    userLogin().then(profile => {
      if (profile) {
        setProfileData(profile);
        setLoggedIn(true);
      }
    });
  }, []);

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

  const [playlistTitle, setPlaylistTitle] = useState('New Playlist');

  const handleChangeTitle = (event) => {
    setPlaylistTitle(event.target.value);
  }

  return (
    <div className='App'>
      <NavBar
        profileData={profileData}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <div className='containerFull'>
        <div className='containerFit'>
          <div className='main'>
            <SearchBarContainer
              setSearchResults={setSearchResults}
              loggedIn={loggedIn}
            />
            <ResultsContainer
              addTrack={addTrackToPlaylist}
              results={searchResults}
            />
            <PlaylistContainer
              playlistTitle={playlistTitle}
              setPlaylistTitle={setPlaylistTitle}
              onChangeTitle={handleChangeTitle}
              removeTrack={removeTrackFromPlaylist}
              tracks={playlistTracks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;