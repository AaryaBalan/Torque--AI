import React from 'react'
import '../styles/Navbar.css'

const Navbar = (props) => {
    return (
        <div className='nav-fragment'>
            <div className="navbar">
                <div className="left-section">
                    <a href="/" className="brand">Torque AI</a>
                </div>
                <div className="right-section">
                    <a href="/home" className={`nav-links ${props.home && 'active-nav'}`}>Home</a>
                    <a href="/data" className={`nav-links ${props.data && 'active-nav'}`}>DataSet</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar