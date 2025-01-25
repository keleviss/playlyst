import PropTypes from 'prop-types';
import styles from '../styles/Results.module.css';
import TrackList from '../../../Shared/components/TrackList';

function Results(props) {
  return (
    <div className={styles.trackResults}>
      <h2 className={styles.resultsHeader}>Results</h2>
      <TrackList
        items={props.results}
        icon='fa-plus'
        action={props.addTrack}
      />
    </div>
  );
}

Results.propTypes = {
  results: PropTypes.array,
  addTrack: PropTypes.func,
};

export default Results;