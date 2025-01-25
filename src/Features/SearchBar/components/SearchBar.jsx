import styles from '../styles/SearchBar.module.css';
import PropTypes from 'prop-types';

function SearchBar({ fetchTracks }) {
  return (
    <form onSubmit={fetchTracks} className={styles.searchBarForm} autoComplete='off'>
      <label className={styles.searchLabel}>Create your Spotify playlist</label>
      <div>
        <input className={styles.searchBar} type='text' id='searchBar' name='searchBar' placeholder='What do you want to play?'></input>
        <input className='btn' type='submit' value='Search'></input>
      </div>
    </form>
  );
}


SearchBar.propTypes = {
  fetchTracks: PropTypes.func.isRequired,
};

export default SearchBar;