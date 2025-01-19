import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputsContainer from '../../components/InputsContainer'
import { login } from '../../services/authService'
import { toast } from 'react-toastify'

function Login() {
    const navigate = useNavigate()

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    function onUserNameChange(e) {
        setUserName(e.target.value)
    }

    function onPasswordChange(e) {
        setPassword(e.target.value)
    }

    function validate() {
        const errorsFound = []

        if (!userName) {
            errorsFound.push('Username is empty.')
        }

        if (!password) {
            errorsFound.push('Password is empty.')
        }

        setErrors(errorsFound)

        if (errorsFound.length) return false

        return true
    }

    async function handleLogin() {
        if (!validate() || loading) return

        setLoading(true)

        const response = await login(userName, password)

        if (response.status === 409) {
            setLoading(false)
            return toast.error('Invalid credentials.')
        } 
        else if (response.status === 400) {
            setLoading(false)
            return toast.error('An unexpected error ocurred when logging in.')
        } 
        
        navigate('/dashboard')
        setLoading(false)
    }

    function handleCreateAccount() {
        navigate('/register')
    }

    return (
        <InputsContainer
            loading={loading}
            Title={() => (<>
                <span>Hello!</span>
                <p>Welcome to <strong className='text-branco'>my</strong>FavoriteAnimes</p>
            </>)}
            errors={errors}
            buttons={[{type: 'button', label: 'Create account', classes: 'dark-button', onClick: handleCreateAccount }, { type: 'button', label: 'Sign in', onClick: handleLogin }]}
            inputs={[{ type: 'text', label: 'Username', onChange: onUserNameChange }, { type: 'password', label: 'Password', onChange: onPasswordChange }]}
            containerBackground='bg-gradient-rosa-45'
        />
    )
}

export default Login 