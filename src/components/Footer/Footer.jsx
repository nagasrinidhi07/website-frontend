//eslint-disable-next-line no-unused-vars
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className='footer-content-left'>
            <img src={assets.logo} alt=""/>
            <p>Bringing comfort food to your table, just like Mama used to.</p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.instagram_icon} alt="" />
            </div>
        </div>
          <div className='footer-content-center'>
              <h2>COMPANY</h2>
              <ul>
                  <li>Home</li>
                  <li>About Us</li>
                  <li>Delivery</li>
                  <li>Privacy Policy</li>
              </ul>
          </div>
          <div className='footer-content-right'>
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+1-365-412-5890</li>
                <li>connect@Mamas kitchen.com</li>
              </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 ©Mamas Kitchen.com - All Rights Reserved.</p>
      </div>
  )
}

export default Footer