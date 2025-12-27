import { NavLink, Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { UserMsg } from "./UserMsg.jsx"
import { authService } from "../../services/auth.service.js"
import { showSuccessMsg } from "../../services/event-bus.service.js"
import { setUser } from '../../store/toy.actions.js'
import { useNavigate } from 'react-router-dom'

export function AppHeader() {

    const loggedinUser = useSelector((state) => state.user)
    const navigate = useNavigate()

    function onLogout() {
        authService.logout()
        setUser(null)
        showSuccessMsg('Logged out successfully')
        navigate('/auth')
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">

                <NavLink to="/">
                    <img src="logo.png" alt="Scary Toy Logo" className="logo" />
                </NavLink>

                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/reviews">Reviews</NavLink>


                    {!loggedinUser ? (
                        <NavLink to="/auth">Login / Sign-up</NavLink>
                    ) : (
                        <div className="user">
                            <Link to={`/user/${loggedinUser._id}`}>
                                {loggedinUser.fullname}
                            </Link>
                            <button onClick={onLogout}>Logout</button>
                        </div>
                    )}
                </nav>

                <UserMsg />
            </section>
        </header>
    )
}
