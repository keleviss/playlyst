import PropTypes from 'prop-types';
import styles from '../styles/Playlist.module.css';
import TrackList from '../../../Shared/components/TrackList';
import Button from '../../../Shared/components/Buttons';

function Playlist(props) {
  return (
    <>
      <div className={styles.playlistHeader}>
        <h2 className={styles.playlistTitle}>
          {props.playlistTitle}
        </h2>
        <Button
          className={'btn ' + styles.playlistSave}
          title='Save playlist'
          onClickHandler={props.savePlaylist}
        />
      </div>
      <div className={styles.playlist}>
        <TrackList
          items={props.tracks}
          icon='fa-minus'
          action={props.removeTrack}
        />
      </div>
    </>
  );
}

Playlist.propTypes = {
  playlistTitle: PropTypes.string,
  changeTitle: PropTypes.func,
  tracks: PropTypes.array,
  removeTrack: PropTypes.func,
  setPlaylistTitle: PropTypes.func,
  savePlaylist: PropTypes.func,
};

export default Playlist;