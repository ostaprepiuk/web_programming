import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '20px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
        }}>
            <h1 style={{ margin: 0 }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    AgroInvestUA
                </Link>
            </h1>
            <nav>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '20px' }}>
                    <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Головна</Link></li>
                    <li><Link to="/catalog" style={{ color: 'white', textDecoration: 'none' }}>Каталог</Link></li>
                    <li><Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Кошик</Link></li>
                    <li><Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>Про нас</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;