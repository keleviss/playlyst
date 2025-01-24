import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import UserProfile from "../components/UserProfile";
import UserPanel from "../components/UserPanel";

function UserProfileContainer({ profileData, setLoggedIn }) {
  const [isClicked, setIsClicked] = useState(false);

  const onClickHandler = () => {
    setIsClicked(true);
  };
  
  const onBlurHandler = (event) => {
    if (event.target.id !== 'userProfile') {
      setIsClicked(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', onBlurHandler);

    return () => {
      window.removeEventListener('click', onBlurHandler);
    };
  });

  const onLoggoutHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem('code');
    localStorage.removeItem('access_token');
    localStorage.removeItem('verifier');
  }

  return (
    <>
      <UserProfile profileData={profileData} onClickHandler={onClickHandler} />
      {isClicked ? (
          <UserPanel profileData={profileData} onLoggout={onLoggoutHandler}/>
        ): (
          <></>
        )
      }
    </>
  );
}

UserProfileContainer.propTypes = {
  profileData: PropTypes.object,
  setLoggedIn: PropTypes.func,
};

export default UserProfileContainer;