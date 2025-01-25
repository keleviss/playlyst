import PropTypes from 'prop-types';
import Playlist from "../components/Playlist";

function PlaylistContainer(props) {
  return (
    <div className='PlaylistContainer'>
      <Playlist 
        tracks={props.tracks}
        removeTrack={props.removeTrack}
      />
    </div>
  );
}

PlaylistContainer.propTypes = {
  tracks: PropTypes.array,
  removeTrack: PropTypes.func,
};

export default PlaylistContainer;