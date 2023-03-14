import PropTypes from 'prop-types';

export const Button = ({ title = '', variant = '' }) => {
  const AndersenStyle = {
    backgroundColor: 'transparent',
    border: '3px solid yellow',
    color: '#302323',
    padding: '10px',
    fontWeight: '800',
  };

  const AstonStyle = {
    backgroundColor: '#15141A',
    color: '#fff',
    padding: '10px',
    border: 'none',
  };

  return (
    <button type="button" style={variant === 'Andersen' ? AndersenStyle : AstonStyle}>
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.oneOf(['Andersen', 'Aston']),
  variant: PropTypes.oneOf(['Andersen', 'Aston']),
};
