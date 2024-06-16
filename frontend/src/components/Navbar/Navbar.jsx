import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token ,setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>acasă</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>meniu</a>
        <a href='#reserve-table' onClick={() => setMenu("reserve-table")} className={`${menu === "reserve-table" ? "active" : ""}`}>mese</a>
        <a href='#feedback' onClick={() => setMenu("feedback")} className={`${menu === "feedback" ? "active" : ""}`}>recenzie</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>contactați-ne</a>
      </ul>
      <div className="navbar-right">
        <Link to='/cart' className='navbar-search-icon'> 
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        {!token ? <button onClick={() => setShowLogin(true)}>autentificare</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Comenzi</p></li>
              <li onClick={()=>navigate('/myreservations')}> <img src={assets.reservations_icon} alt="" /> <p>Rezervari</p></li>
              <hr />
              <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Deconectare</p></li> 
            </ul>
          </div>
        }

      </div>
    </div>
  ) 
}

export default Navbar