import { useState, useEffect } from 'react';
import NavBar from './Features/NavBar/containers/NavBar';
import SearchBarContainer from './Features/SearchBar/containers/SearchBarContainer';
import ResultsContainer from './Features/SearchResults/containers/ResultsContainer';
import PlaylistContainer from './Features/Playlist/containers/PlaylistContainer';
import SavingModal from './Shared/components/SavingModal';
import Notification from './Shared/components/Notification';
import { userLogin } from './SpotifyAPI/userLogin';
import { savePlaylist } from './SpotifyAPI/savePlaylist';
import { notifications } from './HelperFunctions/notifications';

function App() {
  const [profileData, setProfileData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    userLogin().then(profile => {
      if (profile) {
        if (typeof (profile) === 'object') {
          setProfileData(profile);
          setLoggedIn(true);
        } else if (typeof (profile) === 'string') {
          showNotification("accountAccessDenied");
        }
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

  const [savingModal, setSavingModal] = useState(false);

  const showSavingModal = () => {
    setSavingModal(true);
  }

  const closeSavingModal = () => {
    setSavingModal(false);
  }

  const savePlaylistHandle = async () => {
    if (loggedIn) {
      if (playlistTracks.length > 0) {
        showSavingModal();
        // TODO: Implement saving modal
        // const playlist = await savePlaylist(profileData.id, playlistDetails, playlistTracks);
      } else {
        showNotification('saveNoTracks');
      }
    } else {
      showNotification('saveNoLogin');
    }
  }

  const [notification, setNotification] = useState({});
  const [isNotificationTriggered, setIsNotificationTriggered] = useState(false);

  const showNotification = (notificationId) => {
    setNotification(notifications[notificationId]);
    setIsNotificationTriggered(true);
    setTimeout(hideNotification, 5000);
  };

  const hideNotification = () => {
    setNotification({});
    setIsNotificationTriggered(false);
  }

  return (
    <div className='App'>
      <NavBar
        profileData={profileData}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <div className='containerFull'>
        {savingModal ? (
          <SavingModal closeSavingModal={closeSavingModal}/>
        ) : (
          <></>
        )}
        {isNotificationTriggered ? (
          <Notification
            notification={notification}
            hideNotification={hideNotification}
          />
        ) : (
          <></>
        )}
        <div className='containerFit'>
          <div className='main'>
            <SearchBarContainer
              setSearchResults={setSearchResults}
              loggedIn={loggedIn}
              showNotification={showNotification}
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
              savePlaylist={savePlaylistHandle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;