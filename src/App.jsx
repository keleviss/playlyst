import { useState, useEffect } from 'react';
import NavBar from './Features/NavBar/containers/NavBar';
import SearchBarContainer from './Features/SearchBar/containers/SearchBarContainer';
import ResultsContainer from './Features/SearchResults/containers/ResultsContainer';
import PlaylistContainer from './Features/Playlist/containers/PlaylistContainer';
import { userLogin } from './SpotifyAPI/userLogin';
import { savePlaylist } from './SpotifyAPI/savePlaylist';

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

  const [playlistDetails, setPlaylistDetails] = useState({
    name: 'New Playlist',
    description: 'New playlist description',
    public: false
  });

  const handleChangeTitle = (event) => {
    setPlaylistDetails(prev => ({
      ...prev,
      name: event.target.value
    }));
  }

  const onSaveHandle = async () => {
    if (playlistTracks.length > 0) {
      const playlist = await savePlaylist(profileData.id, playlistDetails, playlistTracks);
      // console.log(playlist);
    }
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
              playlistDetails={playlistDetails}
              setPlaylistDetails={setPlaylistDetails}
              onChangeTitle={handleChangeTitle}
              removeTrack={removeTrackFromPlaylist}
              tracks={playlistTracks}
              savePlaylist={onSaveHandle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;