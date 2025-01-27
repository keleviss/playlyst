import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/SearchBar.module.css';
import SearchBar from '../components/SearchBar';
import { fetchSpotifyTracks } from '../../../SpotifyAPI/searchTracks';
import { msToMinSec } from '../../../HelperFunctions/helperFuncs';
import { redirectToAuthCodeFlow } from '../../../SpotifyAPI/userLogin';

function SearchBarContainer(props) {
  const [input, setInput] = useState('');

  const onInputChange = (event) => {
    const input = event.target.value;
    setInput(input);
  }

  const onInputClear = () => {
    setInput('');
  }

  const fetchTracks = (event) => {
    event.preventDefault();
    if (props.loggedIn) {
      if (input !== '') {
        fetchSpotifyTracks(input).then(results => {
          if (results) {
            const tracks = results.tracks.items;
            props.setSearchResults(tracks.map(item => {
              return {
                "id": item.id,
                "title": item.name,
                "artists": item.artists[0].name,
                "album": item.album.name,
                "duration": msToMinSec(item.duration_ms),
                "image": item.album.images[0].url,
                "uri": item.uri,
              }
            }));
          } else {
            console.log('Error fetching tracks!');
          }
        });
      } else {
        props.showNotification('searchEmptyString');
        console.warn("Search Bar contains empty string! Please type something in the search bar");
      }
    } else {
      // redirectToAuthCodeFlow();
      props.showNotification('searchNoLogin');
    }
  }

  return (
    <div className={'SearchBarContainer ' + styles.searchBarContainer}>
      <SearchBar
        input={input}
        onInputChange={onInputChange}
        onInputClear={onInputClear}
        fetchTracks={fetchTracks}
      />
    </div>
  );
}
SearchBarContainer.propTypes = {
  loggedIn: PropTypes.bool,
  setSearchResults: PropTypes.func,
  showNotification: PropTypes.func,
};

export default SearchBarContainer;