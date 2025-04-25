import React from 'react'
import {Link} from 'react-router-dom'
import './styles.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-404-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found.
    </p>
    <Link to="/" className="not-found-button">
      Go Back Home
    </Link>
  </div>
)

export default NotFound
