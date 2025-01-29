import PropTypes from 'prop-types';
import Playlist from "../components/Playlist";

function PlaylistContainer(props) {
  return (
    <div className='PlaylistContainer'>
      <Playlist 
        playlistTitle={props.playlistTitle}
        tracks={props.tracks}
        removeTrack={props.removeTrack}
        savePlaylist={props.savePlaylist}
      />
    </div>
  );
}

PlaylistContainer.propTypes = {
  playlistTitle: PropTypes.string,
  tracks: PropTypes.array,
  removeTrack: PropTypes.func,
  savePlaylist: PropTypes.func,
};

export default PlaylistContainer;