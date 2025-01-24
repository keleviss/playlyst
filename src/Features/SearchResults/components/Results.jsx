import styles from '../styles/Results.module.css';
import TrackList from '../../../Shared/components/TrackList';

function Results() {
  return (
    <div className={styles.trackResults}>
      <h2 className={styles.resultsHeader}>Results</h2>
      <TrackList icon='fa-plus'/>
    </div>
  );
}

export default Results;