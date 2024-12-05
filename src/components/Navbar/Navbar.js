import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <h1 className='navbar__heading'> 
                <Link 
                to="/" 
                className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}
            >
                kitchen accessories
            </Link></h1>
            <div className="navbar__links">
            <Link 
                to="/favorites" 
                className={`navbar__link ${isActive('/favorites') ? 'navbar__link--active' : ''}`}
            >
                Избранное
            </Link>
            <Link 
                to="/create-product" 
                className={`navbar__link ${isActive('/create-product') ? 'navbar__link--active' : ''}`}
            >
                Создать продукт
            </Link>
            </div>
        </nav>
    );
};

export default Navbar;
