import styles from '../styles/SearchBar.module.css';

function SearchBar() {
  return (
    <form className={styles.searchBarForm} autoComplete='off'>
      <label className={styles.searchLabel}>Create your Spotify playlist</label>
      <div>
        <input className={styles.searchBar} type='text' id='searchBar' name='searchBar' placeholder='What do you want to play?'></input>
        <input className='btn' type='submit' value='Search'></input>
      </div>
    </form>
  );
}

export default SearchBar;