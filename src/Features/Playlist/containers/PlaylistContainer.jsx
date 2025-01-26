import PropTypes from 'prop-types';
import Playlist from "../components/Playlist";

function PlaylistContainer(props) {
  return (
    <div className='PlaylistContainer'>
      <Playlist 
        title={props.playlistDetails.name}
        setPlaylistTitle={props.setPlaylistDetails}
        changeTitle={props.onChangeTitle}
        tracks={props.tracks}
        removeTrack={props.removeTrack}
        savePlaylist={props.savePlaylist}
      />
    </div>
  );
}

PlaylistContainer.propTypes = {
  playlistDetails: PropTypes.object,
  onChangeTitle: PropTypes.func,
  tracks: PropTypes.array,
  removeTrack: PropTypes.func,
  setPlaylistDetails: PropTypes.func,
  savePlaylist: PropTypes.func,
};

export default PlaylistContainer;