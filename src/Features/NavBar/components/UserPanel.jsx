import Button from '../../../Shared/components/Buttons';
import styles from '../styles/NavBar.module.css';
import PropTypes from 'prop-types';

function UserPanel({ profileData, onLoggout }) {
  return (
    <div className={styles.userPanel}>
      <a href={profileData.spotify_url} className={styles.userPanelOption} target='_blank'>
          {profileData.id} <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
      <Button className={styles.userPanelOption} title={"Log out"} onClickHandler={onLoggout}/>
    </div>
  );
}

UserPanel.propTypes = {
  profileData: PropTypes.shape({
    id: PropTypes.string,
    display_name: PropTypes.string,
    spotify_url: PropTypes.string,
    email: PropTypes.string,
    product: PropTypes.string,
  }),
  onLoggout: PropTypes.func,
};

export default UserPanel;