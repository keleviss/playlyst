import { useState } from 'react';
import styles from '../styles/SearchBar.module.css';
import SearchBar from '../components/SearchBar';
import { fetchSpotifyTracks } from '../../../SpotifyAPI/searchTracks';
import PropTypes from 'prop-types';
import { msToMinSec } from '../../../HelperFunctions/helperFuncs';

function SearchBarContainer(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTracks = (event) => {
    event.preventDefault();
    console.log(searchTerm);
    // fetchSpotifyTracks(searchTerm).then(results => {
    //   const tracks = results.tracks.items;
    //   if (tracks.length > 0) {
    //     props.setSearchResults(tracks.map(item => {
    //       return {
    //         "id": item.id,
    //         "title": item.name,
    //         "artists": item.artists[0].name,
    //         "album": item.album,
    //         "duration": msToMinSec(item.duration_ms),
    //         "image": item.album.images[0].url,
    //       }
    //     }));
    //   } else {
    //     console.log('Error fetching tracks!');
    //   }
    // });
  }

  return (
    <div className={'SearchBarContainer ' + styles.searchBarContainer}>
      <div className={'containerFit ' + styles.containerFit}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetchTracks={fetchTracks} />
      </div>
    </div>
  );
}
SearchBarContainer.propTypes = {
  setSearchResults: PropTypes.func,
};

export default SearchBarContainer;