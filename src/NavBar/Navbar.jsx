import logo from '../media/logo.png'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { FaFacebook, FaInstagram, FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
        <div className="navbar">
            <div className="title">
                <img src={logo} alt="Logo" />
                <Link to="/" className='title-link'><h2>CandleShop</h2></Link>
            </div>
            
           
            <div className="links">
                <Link to="/" className='page-link'>Home</Link>
                <Link to="/shop" className='page-link'>Shop</Link>
                <Link to="/about" className='page-link'>About</Link>
                <Link to="/contact" className='page-link'>Contact</Link>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='social-link'>
                <FaFacebook />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='social-link'>
                <FaInstagram />
                </a>
                <Link to="/cart" className='social-link'><FaShoppingCart/></Link>
            </div>

           
            <div className="hamburger" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

         
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                <Link to="/" className='page-link' onClick={toggleMenu}>Home</Link>
                <Link to="/shop" className='page-link' onClick={toggleMenu}>Shop</Link>
                <Link to="/about" className='page-link' onClick={toggleMenu}>About</Link>
                <Link to="/contact" className='page-link' onClick={toggleMenu}>Contact</Link>
                <div style={{display: 'flex', gap: '20px', marginTop: '10px'}}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='social-link'>
                    <FaFacebook />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='social-link'>
                    <FaInstagram />
                    </a>
                    <Link to="/cart" className='social-link' onClick={toggleMenu}><FaShoppingCart/></Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar