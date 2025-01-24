import PropTypes from 'prop-types';
import styles from '../styles/NavBar.module.css';

function UserProfile({ profileData, onClickHandler }) {
  return (
      <img id='userProfile' className={styles.userImage} onClick={onClickHandler} src={profileData.image} title={profileData.display_name} alt={profileData.display_name} />
  );
}

UserProfile.propTypes = {
  profileData: PropTypes.shape({
    image: PropTypes.string,
    display_name: PropTypes.string,
  }),
  onClickHandler: PropTypes.func,
};

export default UserProfile;