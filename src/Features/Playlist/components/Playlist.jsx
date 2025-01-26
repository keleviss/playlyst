import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Playlist.module.css';
import TrackList from '../../../Shared/components/TrackList';
import Button from '../../../Shared/components/Buttons';

function Playlist(props) {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  }

  const handleBlur = ({ target }) => {
    setIsEditing(false);
    if (target.value === '') {
      props.setPlaylistTitle('New Playlist')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      if (event.target.value === '') {
        props.setPlaylistTitle('New Playlist')
      }
    }
  }

  const handleFocus = ({ target }) => {
    target.setSelectionRange(target.value.length, target.value.length);
  }

  return (
    <>
      <div className={styles.playlistHeader}>
        {isEditing ? (
          <textarea
            rows='1'
            cols='12'
            id='playlistTitleInput'
            type='text'
            value={props.title}
            onChange={props.changeTitle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={styles.playlistTitleInput}
            autoFocus
          ></textarea>
        ) : (
          <h2 className={styles.playlistTitle} onClick={handleClick}>
            {props.title.length <= 20 ? props.title : `${props.title.slice(0, 16)}...`}
          </h2>
        )
        }
        <Button className={'btn ' + styles.playlistSave} title='Save playlist' />
      </div>
      <div className={styles.playlist}>
        <TrackList
          items={props.tracks}
          icon='fa-minus'
          action={props.removeTrack}
        />
      </div>
    </>
  );
}

Playlist.propTypes = {
  title: PropTypes.string,
  changeTitle: PropTypes.func,
  tracks: PropTypes.array,
  removeTrack: PropTypes.func,
  setPlaylistTitle: PropTypes.func,
};

export default Playlist;