
import PropTypes from 'prop-types'
import './styles.css'

function Input({ label, type, value, onChange }) {
    return (
        <div>
            <p>{label}</p>
            <input value={value} onChange={onChange} type={type}/>
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string
}

export default Input 