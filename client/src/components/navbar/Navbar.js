import React from 'react'
import { NavLink } from 'react-router-dom';
import NavMenu from '../navmenu/NavMenu';
import UserMenu from '../usermenu/UserMenu';
import './navbar.css';
const Navbar = ({ user }) => {
    return (
        <nav className="navbar">
            <span className="logo">
                <NavLink to="/" className="nav-link">Articles</NavLink>
            </span>
                <ul className="list-items">
                <NavMenu/>
                {
                    user ? (
                        <UserMenu user={user}/>
                ) : (
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                )
            }
            </ul>

        </nav>
    )
}

export default Navbar;
