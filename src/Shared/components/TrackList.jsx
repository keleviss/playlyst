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
        {props.items.length > 0 ?
          (
            props.items.map((item) => (
              <Track
                key={props.icon === 'fa-plus' ? 'result_' + item.id : 'playlistTrack_' + item.id}
                icon={props.icon}
                image={item.image}
                title={item.title}
                artist={item.artists}
                album={item.album}
                duration={item.duration}
                action={() => props.action(item.id)}
              />
            ))
          ) : (
            <></>
          )
        }
      </ul>
    </>
  );
}

TrackList.propTypes = {
  icon: PropTypes.string.isRequired,
  items: PropTypes.array,
  action: PropTypes.func,
};

export default TrackList;