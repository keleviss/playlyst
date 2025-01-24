import PropTypes from 'prop-types';
import styles from './TrackList.module.css';
import Track from './Track';

function TrackList(props) {
  return (
    <>
      <div className={styles.detailsColumns}>
        <span className={styles.titleColumn}>Title</span>
        <span className={styles.albumColumn}>Album</span>
        <span className={styles.durationColumn}>
          <i className='fa-regular fa-clock'></i>
        </span>
      </div>
      <ul className={styles.trackList}>
        <Track icon={props.icon}/>
        <Track icon={props.icon}/>
        <Track icon={props.icon}/>
        <Track icon={props.icon}/>
        <Track icon={props.icon}/>
        <Track icon={props.icon}/>
        <Track icon={props.icon}/>
      </ul>
    </>
  );
}

TrackList.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default TrackList;