import PropTypes from 'prop-types';
import Playlist from "../components/Playlist";

function PlaylistContainer(props) {
  return (
    <div className='PlaylistContainer'>
      <Playlist 
        title={props.playlistTitle}
        setPlaylistTitle={props.setPlaylistTitle}
        changeTitle={props.onChangeTitle}
        tracks={props.tracks}
        removeTrack={props.removeTrack}
      />
    </div>
  );
}

PlaylistContainer.propTypes = {
  playlistTitle: PropTypes.string,
  onChangeTitle: PropTypes.func,
  tracks: PropTypes.array,
  removeTrack: PropTypes.func,
  setPlaylistTitle: PropTypes.func,
};

export default PlaylistContainer;