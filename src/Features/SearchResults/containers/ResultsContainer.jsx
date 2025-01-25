import PropTypes from 'prop-types';
import Results from '../components/Results';

function ResultsContainer(props) {
  return (
    <div className='TrackResultsContainer'>
      <Results
        results={props.results}
        addTrack={props.addTrack}
      />
    </div>
  );
}


ResultsContainer.propTypes = {
  results: PropTypes.array,
  addTrack: PropTypes.func,
};

export default ResultsContainer;