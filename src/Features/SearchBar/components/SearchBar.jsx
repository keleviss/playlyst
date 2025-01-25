import styles from '../styles/SearchBar.module.css';
import PropTypes from 'prop-types';

function SearchBar(props) {
  return (
    <form onSubmit={props.fetchTracks} className={styles.searchBarForm} autoComplete='off'>
      <label className={styles.searchLabel}>Create your Spotify playlist</label>
      <div>
        <input className={styles.searchBar}
          onChange={props.setSearchTerm}
          value={props.searchTerm}
          type='text'
          id='searchBar'
          name='searchBar'
          placeholder='What do you want to play?'
        ></input>
        <input className='btn' type='submit' value='Search'></input>
      </div>
    </form>
  );
}


SearchBar.propTypes = {
  fetchTracks: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;