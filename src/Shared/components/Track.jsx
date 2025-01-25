import styles from './Track.module.css';
import PropTypes from 'prop-types';

function Track(props) {
  return (
    <div className={styles.track}>
      <img className={styles.trackImg} src={props.image} alt={props.album + " album cover"} />
      <div className={styles.trackDetails}>
        <span className={styles.trackTitle}>{props.title}</span>
        <span className={styles.trackArtist}>{props.artist}</span>
        <span className={styles.trackAlbum}>{props.album}</span>
        <span className={styles.trackDuration}>{props.duration}</span>
        <i onClick={props.action} className={'fa-solid ' + props.icon + ' ' + styles.plusIcon}></i>
      </div>
    </div>
  );
}

Track.propTypes = {
  icon: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default Track;