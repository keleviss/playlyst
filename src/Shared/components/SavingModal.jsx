import PropTypes from 'prop-types';
import styles from './SavingModal.module.css';

function SavingModal(props) {

  const handleEmptyTitle = (event) => {
    if (event.target.value === '') {
      props.setPlaylistDetails(prev => ({
        ...prev,
        name: "New Playlist"
      }));
    }
  }

  const handleEmptyDescription = (event) => {
    if (event.target.value === '') {
      props.setPlaylistDetails(prev => ({
        ...prev,
        description: "New Playlist description"
      }));
    }
  }

  const handleChangeTitle = (event) => {
    props.setPlaylistDetails(prev => ({
      ...prev,
      name: event.target.value
    }));
  };

  const handleChangeDescription = (event) => {
    props.setPlaylistDetails(prev => ({
      ...prev,
      description: event.target.value
    }));
  };

  const handleVisibilityChange = (event) => {
    props.setPlaylistDetails(prev => ({
      ...prev,
      public: event.target.value
    }));
  };

  return (
    <div className={props.showModal ? styles.savingModalContainer + " " + styles.show : styles.savingModalContainer}>
      <form onSubmit={props.onSavePlaylist} className={styles.savingModal}>
        <div className={styles.modalHeader}>
          <span>Playlist details</span>
          <i className={'fa-solid fa-xmark'} onClick={props.closeSavingModal}></i>
        </div>
        <div className={styles.inputContainer}>
          <label>Title</label>
          <input
            type='text'
            maxLength={50}
            value={props.playlistDetails.name}
            onChange={handleChangeTitle}
            onBlur={handleEmptyTitle}
          ></input>
        </div>
        <div className={styles.inputContainer}>
          <label>Description</label>
          <textarea
            value={props.playlistDetails.description}
            maxLength={300}
            onChange={handleChangeDescription}
            onBlur={handleEmptyDescription}
          >
          </textarea>
        </div>
        <div className={styles.inputContainer}>
          <label>Visibility</label>
          <div className={styles.radioValues}>
            <div>
              <input
                defaultChecked='true'
                type='radio'
                name='visibility'
                value='false'
                onClick={handleVisibilityChange}
              ></input>
              <label htmlFor='private'>Private</label>
            </div>
            <div>
              <input
                type='radio'
                name='visibility'
                value='true'
                onClick={handleVisibilityChange}
              ></input>
              <label htmlFor='public'>Public</label>
            </div>
          </div>
        </div>
        <input className='btn' type='submit' value='Save'></input>
      </form>
    </div>
  );
}

SavingModal.propTypes = {
  showModal: PropTypes.bool,
  playlistDetails: PropTypes.object,
  setPlaylistDetails: PropTypes.func,
  closeSavingModal: PropTypes.func,
  onSavePlaylist: PropTypes.func,
};

export default SavingModal;