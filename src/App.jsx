import { useState, useEffect } from 'react';
import NavBar from './Features/NavBar/containers/NavBar';
import SearchBarContainer from './Features/SearchBar/containers/SearchBarContainer';
import ResultsContainer from './Features/SearchResults/containers/ResultsContainer';
import PlaylistContainer from './Features/Playlist/containers/PlaylistContainer';
import SavingModal from './Shared/components/SavingModal';
import Notification from './Shared/components/Notification';
import PlaylistEmbed from './Features/PlaylistEmbed/PlaylistEmbed';
import { userLogin } from './SpotifyAPI/userLogin';
import { savePlaylist } from './SpotifyAPI/savePlaylist';
import { notifications } from './HelperFunctions/notifications';
import spotifyLogo from './assets/spotify_logo_white.png';
// import playifyLogo from './assets/playify_logo.png';

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
  const [playlistDetails, setPlaylistDetails] = useState({
    name: 'New Playlist',
    description: 'New playlist description',
    public: false,
  });

  function clearPlaylist() {
    setPlaylistDetails({
      name: 'New Playlist',
      description: 'New playlist description',
      public: false,
    });
    setPlaylistTracks([]);
  }

  const addTrackToPlaylist = (id) => {
    const track = searchResults.find(item => item.id === id);
    if (track && !playlistTracks.some(item => item.id === id)) {
      setPlaylistTracks(prev => [...prev, track]);
    }
  };

  const removeTrackFromPlaylist = (id) => {
    setPlaylistTracks(prev => prev.filter(item => item.id !== id));
  };

  const [savingModal, setSavingModal] = useState(false);

  const showSavingModal = () => {
    setSavingModal(true);
    // window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  }

  const closeSavingModal = () => {
    setSavingModal(false);
    document.body.style.overflow = '';
  }

  const [isPlaylistEmbedded, setisPlaylistEmbedded] = useState(false);

  const togglePlaylistEmbed = () => {
    setisPlaylistEmbedded(prev => !prev);
  }

  const savePlaylistHandle = (event) => {
    event.preventDefault();
    if (loggedIn) {
      if (playlistTracks.length > 0) {
        savePlaylist(profileData.id, playlistDetails, playlistTracks)
          .then(response => {
            if (response) {
              showNotification("savePlaylist");
              togglePlaylistEmbed();
              setPlaylistDetails(prev => ({
                ...prev,
                id: response
              }));
              clearPlaylist();
              closeSavingModal();
            }
          })
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
      <SavingModal
        showModal={savingModal}
        closeSavingModal={closeSavingModal}
        playlistDetails={playlistDetails}
        setPlaylistDetails={setPlaylistDetails}
        onSavePlaylist={savePlaylistHandle}
      />
      <NavBar
        profileData={profileData}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <div className='containerFull'>
        {isNotificationTriggered && <Notification
          notification={notification}
          hideNotification={hideNotification}
          isNotificationTriggered={isNotificationTriggered}
        />}
        <div className='containerFit'>
          <div className={isPlaylistEmbedded ? 'main playlist' : 'main'}>
            <SearchBarContainer
              setSearchResults={setSearchResults}
              loggedIn={loggedIn}
              showNotification={showNotification}
              isPlaylistEmbedded={isPlaylistEmbedded}
              togglePlaylistEmbed={togglePlaylistEmbed}
            />
            {isPlaylistEmbedded ? (
              <>
                <PlaylistEmbed playlistId={playlistDetails.id} togglePlaylistEmbed={togglePlaylistEmbed} isPlaylistEmbedded={isPlaylistEmbedded} />
              </>
            ) : (
              <>
                <ResultsContainer
                  addTrack={addTrackToPlaylist}
                  results={searchResults}
                />
                <PlaylistContainer
                  playlistTitle={playlistDetails.name}
                  removeTrack={removeTrackFromPlaylist}
                  tracks={playlistTracks}
                  savePlaylist={showSavingModal}
                />
              </>
            )}
            <div className='creditsContainer'>
              <div className='developerContainer'>
                <span>Developed by <a href='https://github.com/keleviss' target='_blank'><i className="fa-brands fa-github"></i> Keleviss</a></span>
              </div>
              <div className='spotifyContainer'>
                <span>Powered by</span>
                <img className='spotifyLogo' src={spotifyLogo} alt='Description of image' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;