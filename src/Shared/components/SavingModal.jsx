import PropTypes from 'prop-types';
import styles from './SavingModal.module.css';

function SavingModal(props) {
  return (
    <div className={styles.savingModalContainer}>
      <form className={styles.savingModal}>
        <div className={styles.modalHeader}>
          <span>Playlist details</span>
          <i className='fa-solid fa-xmark' onClick={props.closeSavingModal}></i>
        </div>
        <div className={styles.inputContainer}>
          <label>Title</label>
          <input type='text'></input>
        </div>
        <div className={styles.inputContainer}>
          <label>Description</label>
          <input type='text'></input>
        </div>
        <div className={styles.inputContainer}>
          <label>Visibility</label>
          <div className={styles.radioValues}>
            <div>
              <input type='radio' name='visibility' value='public'></input>
              <label>Public</label>
            </div>
            <div>
              <input type='radio' name='visibility' value='private'></input>
              <label>Private</label>
            </div>
          </div>
        </div>
        <input type='submit' value='Save'></input>
      </form>
    </div>
  );
}

SavingModal.propTypes = {
  closeSavingModal: PropTypes.func,
};

export default SavingModal;