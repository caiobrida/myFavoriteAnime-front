import { useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "../../services/authService"
import Button from "../Button"
import './styles.css'

function Header() {
    const navigate = useNavigate()

    return (
        <header>
            <span className="text-rosa-choque header-logo"><strong className='text-branco'>my</strong>FavoriteAnimes</span>
            <div className="signout-header-wrapper">
                <span>Hello, <strong className="text-rosa-choque">{getCurrentUser() && getCurrentUser().username}!</strong></span>
                <Button label='Sign out' onClick={() => {
                    logout()
                    navigate('/')
                }} type='button' classes="dark-button"/>
            </div>
        </header>
    )
}

export default Header