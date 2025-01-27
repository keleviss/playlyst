import PropTypes from 'prop-types';
import styles from './Notification.module.css';

function Notification(props) {
  return (
    <div className={styles.notificationContainer}>
      <div className={styles.notification + ' ' + styles[props.notification.type]}>
        {props.notification.body}
        <i onClick={props.hideNotification} className={styles.xMark + ' fa-solid fa-xmark ' + styles[props.notification.type]}></i>
      </div>
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.object,
  hideNotification: PropTypes.func,
};

export default Notification;