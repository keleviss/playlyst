import styles from '../styles/SearchBar.module.css';
import SearchBar from '../components/SearchBar';
import { fetchSpotifyTracks } from '../../../SpotifyAPI/searchTracks';
import PropTypes from 'prop-types';

function SearchBarContainer(props) {

  const fetchTracks = (event) => {
    event.preventDefault();
    fetchSpotifyTracks(event.target.value)
      .then(results => {
        if (results) {
          props.setSearchResults(results);
        } else {
          console.log('Error fetching tracks!');
        }
      });
  }

  return (
    <div className={'SearchBarContainer ' + styles.searchBarContainer}>
      <div className={'containerFit ' + styles.containerFit}>
        <SearchBar fetchTracks={fetchTracks} />
      </div>
    </div>
  );
}
SearchBarContainer.propTypes = {
  setSearchResults: PropTypes.func,
};

export default SearchBarContainer;