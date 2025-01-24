import PropTypes from 'prop-types';

function Button({ className, title, onClickHandler }) {
  return (
    <>
      <button className={className} onClick={onClickHandler}>{title}</button>
    </>
  )
};

Button.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  onClickHandler: PropTypes.func,
};

export default Button;