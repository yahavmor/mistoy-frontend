import {NavLink} from 'react-router-dom'
import { useSelector } from "react-redux"
import { UserMsg } from "./UserMsg.jsx"
import Button from '@mui/material/Button';





export function AppHeader() {
    const toys = useSelector((state) => state.toys)

    return (
        
    <header
        className="app-header full main-layout"
        >
        <section className="header-container">
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/dashboard" >Dashboard</NavLink>
                <Button variant="contained" color="primary" >
                    Exapmle
                </Button>
            </nav>
            <UserMsg />
        </section>
    </header>
    )
}
