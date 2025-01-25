import PropTypes from 'prop-types';
import styles from '../styles/Playlist.module.css';
import TrackList from '../../../Shared/components/TrackList';
import Button from '../../../Shared/components/Buttons';

function Playlist(props) {
  return (
    <div className={styles.playlist}>
      <div className={styles.playlistHeader}>
        <h2 className={styles.playlistTitle}>New Playlist</h2>
        <Button className={styles.playlistSave} title='Save to Spotify' />
      </div>
      <TrackList
        items={props.tracks}
        icon='fa-minus'
        action={props.removeTrack}
      />
    </div>
  );
}

Playlist.propTypes = {
  tracks: PropTypes.array,
  removeTrack: PropTypes.func,
};

export default Playlist;