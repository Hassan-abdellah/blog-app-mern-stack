import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import NavMenu from '../navmenu/NavMenu';
import Search from '../searchbar/Search';
import UserMenu from '../usermenu/UserMenu';
import './navbar.css';
const Navbar = ({ user }) => {
    const [active, setActive] = useState(false);
    const navRef = useRef();
    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                navRef.current.classList.add('no-transition');
            } else {
                navRef.current.classList.remove('no-transition');
            }
        })
    }, []);
    return (
        <>
            <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(!active)}>
                <div className="bars">
                    <div className="bar"></div>
                </div>
            </div>
            <nav className={active ? 'navbar active' : 'navbar'} ref={navRef}>
                <span className="logo">
                    <NavLink to="/" className="nav-link" onClick={() => setActive(false)}>Articles</NavLink>
                </span>
                <Search setActive={setActive} />
                <ul className="list-items">
                    <NavMenu setActive={setActive} active={active} />
                    {
                        user ? (
                            <UserMenu user={user} setActive={setActive} active={active} />
                        ) : (
                            <NavLink to="/login" className="nav-link" onClick={() => setActive(false)}>Login</NavLink>
                        )
                    }
                </ul>
                {/* <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(!active)}></div> */}
            </nav>
        </>
    )
}

export default Navbar;
