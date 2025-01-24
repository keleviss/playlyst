import styles from './Track.module.css';
import PropTypes from 'prop-types';

function Track(props) {
  return (
    <div className={styles.track}>
      <img className={styles.trackImg} src="https://i.scdn.co/image/ab67616d00004851d9985092cd88bffd97653b58" alt="kendrick album cover" />
      <div className={styles.trackDetails}>
        <span className={styles.trackTitle}>luther (with sza)</span>
        <span className={styles.trackArtist}>Kendrick Lamar</span>
        <span className={styles.trackAlbum}>GNX</span>
        <span className={styles.trackDuration}>2:57</span>
        <i className={'fa-solid ' + props.icon + ' ' + styles.plusIcon}></i>
      </div>
    </div>
  );
}

Track.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Track;