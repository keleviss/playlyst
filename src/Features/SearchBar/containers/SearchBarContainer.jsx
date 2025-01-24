import styles from '../styles/SearchBar.module.css';
import SearchBar from '../components/SearchBar';

function SearchBarContainer() {
  return (
    <div className={'SearchBarContainer ' + styles.searchBarContainer}>
      <div className={'containerFit ' + styles.containerFit}>
        <SearchBar />
      </div>
    </div>
  );
}

export default SearchBarContainer;