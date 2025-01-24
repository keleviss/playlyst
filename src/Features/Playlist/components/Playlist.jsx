import styles from '../styles/Playlist.module.css';
import TrackList from '../../../Shared/components/TrackList';
import Button from '../../../Shared/components/Buttons';

function Playlist() {
  return (
    <div className={styles.playlist}>
      <div className={styles.playlistHeader}>
        <h2 className={styles.playlistTitle}>New Playlist</h2>
        <Button className={styles.playlistSave} title='Save to Spotify' />
      </div>
      <TrackList icon='fa-minus' />
    </div>
  );
}

export default Playlist;