import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import InputsContainer from '../../components/InputsContainer'
import { register } from '../../services/userService'

function Register() {
    const navigate = useNavigate()
    
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    function onUserNameChange(e) {
        setUserName(e.target.value)
    }

    function onPasswordChange(e) {
        setPassword(e.target.value)
    }

    function onConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value)
    }

    function handleBack() {
        navigate('/')
    }

    function validate() {
        const errorsFound = []

        if (!userName) {
            errorsFound.push('Username is empty.')
        }

        if (password !== confirmPassword) {
            errorsFound.push('Passwords does not match.')
        }

        if (password.length < 6) {
            errorsFound.push('Password needs at least 6 digits.')
        }

        setErrors(errorsFound)

        if (errorsFound.length) return false

        return true
    }

    async function handleConfirm() {
        if (!validate() || loading) return
        setLoading(true)
        const payload = {
            username: userName,
            password
        }

        const response = await register(payload)

        if (response.status === 400) return toast.error('An error ocurred while creating user.')

        toast.info('User created successfuly!')

        navigate('/')
        setLoading(false)
    }

    return (
        <InputsContainer 
            Title={() => (<>
                <span>Create account</span>
                <p>We are glad to have you here!</p>
            </>)}
            errors={errors}
            buttons={[{type: 'button', label: 'Back', classes: 'dark-button', onClick: handleBack}, {type: 'button', label: 'Register', onClick: handleConfirm}]}
            inputs={[{ type: 'text', label: 'Username', value: userName, onChange: onUserNameChange }, 
                { type: 'password', label: 'Password', value: password, onChange: onPasswordChange }, 
                { type: 'password', label: 'Confirm Password', value: confirmPassword, onChange: onConfirmPasswordChange }]}
        />
    )
}

export default Register 