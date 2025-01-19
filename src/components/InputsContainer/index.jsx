import { Pulse } from 'react-svg-spinners'
import PropTypes from 'prop-types'
import Button from '../Button'
import Input from '../Input'
import './styles.css'
import { Colors } from '../../constants/Colors'

function InputsContainer({ loading=false, inputs=[], errors=[], Title=<></>, buttons=[], containerBackground='bg-gradient-rosa-225' }) {
    return (
        <div className='flex-wrapper'>
            <div className={`inputs-container ${containerBackground}`}>
                <div className='inputs-title'>
                    <Title />
                    { errors.length ? <div className='errors-wrapper'>{errors.map((e, i) => ( <p className='error-alert' key={i}>{e}</p> ))}</div> : null }
                </div>

                <div className='inputs'>
                    { inputs.map((b, i) => (
                        <Input key={i} label={b.label} type={b.type} value={b.value} onChange={b.onChange} /> 
                    )) }
                </div>
                
                <div className='inputs-loading'>
                    { loading ? <Pulse color={ Colors.rosaChoque } /> : null } 
                </div>

                <div className='inputs-button'>
                    { buttons.map((b, i) => (
                        <Button key={i} classes={b.classes} label={b.label} type={b.type} onClick={b.onClick} />
                    )) }
                </div>
            </div>
        </div>
    )
}

InputsContainer.propTypes = {
    inputs: PropTypes.array,
    Title: PropTypes.func,
    buttons: PropTypes.array,
    errors: PropTypes.array,
    containerBackground: PropTypes.string,
    loading: PropTypes.bool
}

export default InputsContainer 