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
        <SearchBarContainer />
        <ResultsContainer />
        <PlaylistContainer />
      </div>
    </div>
  );
}

export default App;