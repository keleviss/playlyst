import PropTypes from 'prop-types';
import styles from '../styles/NavBar.module.css';
import { redirectToAuthCodeFlow } from '../../../SpotifyAPI/userLogin';
import Button from '../../../Shared/components/Buttons';
import UserProfileContainer from './UserProfileContainer';

function Navbar(props) {
  return (
    <nav className={'NavBar ' + styles.navBar}>
      <div className={'containerFit ' + styles.containerFit}>
        <a href="./">
          <h1 className={styles.navLogo}>Spotlist</h1>
        </a>
        <div className={styles.loginContainer}>
          {props.loggedIn ? (
            <UserProfileContainer profileData={props.profileData} setLoggedIn={props.setLoggedIn} />
          ) : (
            <Button className={'btn ' + styles.login} title='Login' onClickHandler={() => redirectToAuthCodeFlow()} />
          )
          }
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  setLoggedIn: PropTypes.func,
  loggedIn: PropTypes.bool,
  profileData: PropTypes.object,
};

export default Navbar;