import { useState } from "react"
import {Link, NavLink} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux"




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
                <NavLink to="/todo" >Toys</NavLink>
            </nav>
        </section>
    </header>
    )
}
