import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CartProvider} from './context/CartContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => {
  const token = Cookies.get('jwt_token')

  return (
    <CartProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
    </CartProvider>
  )
}

export default App
