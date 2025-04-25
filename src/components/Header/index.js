import './styles.css'
import {useCart} from '../../context/CartContext'

const Header = ({restaurantName, onCartClick, onHomeClick, onLogout}) => {
  const {cartCount} = useCart()

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="restaurant-name" onClick={onHomeClick}>
          {restaurantName}
        </h1>
        <div className="header-right">
          <h2 className="orders-heading" data-testid="orders-heading">
            My Orders
          </h2>
          <button className="logout-button" onClick={onLogout} type="button">
            Logout
          </button>
          <div
            className="cart-button"
            onClick={onCartClick}
            data-testid="cart"
            role="button"
            tabIndex={0}
          >
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-count" data-testid="cart-count">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
