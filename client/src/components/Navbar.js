import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = () => {
  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active">
      <div className="navbar-start">
        <div className="navbar-item">
          <div className="buttons">
          <Link to="/" className="button is-light">
              Home
            </Link>
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/register" className="button is-light">
              Register
            </Link>
            <Link to="/login" className="button is-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default withRouter(Navbar)