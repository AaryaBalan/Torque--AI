import React from 'react'
import logo from "../assets/images/torque.png"
import "../styles/TryDemo.css"
import banner_video from '../assets/videos/hero-bg.mp4'

const TryDemo = () => {
    return (
        <div className="try-demo-fragment">
            <video autoPlay muted loop>
                <source src={banner_video} />
            </video>
            <div className="try-demo">
                <div className="brand-head-container">
                    <div className="brand-head">torque</div>
                    <img src={logo} alt="" />
                </div>
                <div className="brand-description">
                    Fueling AI with the Power of Quality Data
                </div>
                <div className="try-demo-btn-container">
                    <a href="/home" className="try-demo-btn">Try our demo</a>
                </div>
            </div>
            <a href='/moreInfo' className="more-info">More Info</a>
        </div>
    )
}

export default TryDemo