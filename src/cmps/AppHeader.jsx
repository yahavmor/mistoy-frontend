import {NavLink} from 'react-router-dom'
import { useSelector } from "react-redux"
import { UserMsg } from "./UserMsg.jsx"





export function AppHeader() {
    const toys = useSelector((state) => state.toys)

    return (
        
    <header
        className="app-header full main-layout">
        <section className="header-container">
        <NavLink to="/toy">
        <img src="logo.png" alt="Scary Toy Logo" className="logo" />
        </NavLink>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/dashboard" >Dashboard</NavLink>
            </nav>
            <UserMsg />
        </section>
    </header>
    )
}
