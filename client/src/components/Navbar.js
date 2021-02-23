// import axios from 'axios'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getLoggedInUserId } from './lib/auth'


const Navbar = ({ history }) => {
  const [mobNav, updateMobNav] = useState(false)


  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/')
  }
  console.log(localStorage)
  const loggedIn = getLoggedInUserId()

  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-items" to={'/'}>
        <img src="https://cdn.shopify.com/s/files/1/0306/1016/1723/files/logo.png?v=1614074360" width={220} />
      </Link>
      <a onClick={() => updateMobNav(!mobNav)} role="button" className={`navbar-burger ${mobNav ? 'is-active' : ''}`} >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarBasicExample" className={`navbar-menu ${mobNav ? 'is-active' : ''}`}>
      <div className="navbar-start">


        <div className="navbar-item has-dropdown is-hoverable">

          <div className="navbar-dropdown">
            <hr className="navbar-divider" />
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="menu-item">
            {!loggedIn && <Link to="/register" className="button is-light">Register</Link>}
            {!loggedIn && <Link to="/recipes" className="button is-light">All Recipes</Link>}
            {loggedIn && <Link to="/myaccount" className="button is-dark">My Account</Link>}
            {loggedIn && <Link to="/modal" className="button is-light">Post a Recipe</Link>}
            {!loggedIn && <Link to="/login" className="button is-dark">Login</Link>}
            {loggedIn && <button className="button is-light" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </div>
    </div>
  </nav >

}

export default withRouter(Navbar)