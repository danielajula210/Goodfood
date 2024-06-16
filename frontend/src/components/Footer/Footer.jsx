import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
        </div>
        <div className="footer-content-center">
            <h2>S.C. GoodFood S.R.L.</h2>
            <ul>
                <li>Adresă:  Calea Victoriei Nr. 95</li>
                <li><h3>Program:</h3></li>
                <li>Luni-Duminică: 10-24</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Contactați-ne!</h2>
            <ul>
                <li>Telefon: 076969420</li>
                <li>E-mail: contact@goodfood.com</li>
            </ul>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Footer
