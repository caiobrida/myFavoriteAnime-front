
import PropTypes from 'prop-types'
import './styles.css'


function Button({ label, type, onClick, classes='' }) {
    return (
        <button className={`${classes} default-button`} onClick={onClick} type={type}>{label}</button>
    )
}

Button.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    classes: PropTypes.string,
    onClick: PropTypes.func
}

export default Button 