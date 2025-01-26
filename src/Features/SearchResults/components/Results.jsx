import PropTypes from 'prop-types';
import styles from '../styles/Results.module.css';
import TrackList from '../../../Shared/components/TrackList';
import Button from '../../../Shared/components/Buttons';

function Results(props) {
  return (
    <>
      <div className={styles.resultsHeader}>
        <h2 className={styles.resultsTitle}>Results</h2>
        <Button className={styles.hiddenButton} title='hidden' />
      </div>
      <div className={styles.trackResults}>
        <TrackList
          items={props.results}
          icon='fa-plus'
          action={props.addTrack}
        />
      </div>
    </>
  );
}

Results.propTypes = {
  results: PropTypes.array,
  addTrack: PropTypes.func,
};

export default Results;