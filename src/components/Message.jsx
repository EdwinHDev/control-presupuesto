import PropTypes from 'prop-types';

export const Message = ({ children, type }) => {
  return (
    <div className={`alerta ${type}`}>{children}</div>
  )
}

Message.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
}