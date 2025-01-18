
import PropTypes from 'prop-types'
import './styles.css'

function Input({ placeholder='', label, type, value, onChange }) {
    return (
        <div>
            {label ? <p>{label}</p> : null}
            <input placeholder={placeholder} value={value} onChange={onChange} type={type}/>
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    placeholder: PropTypes.string
}

export default Input 