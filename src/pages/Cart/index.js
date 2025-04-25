import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useCart} from '../../context/CartContext'
import Header from '../../components/Header'
import './styles.css'

const Cart = () => {
  const history = useHistory()
  const {
    cartList,
    removeAllCartItems,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useCart()

  const navigateToCart = () => {
    history.push('/cart')
  }

  const navigateToHome = () => {
    history.push('/')
  }

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const calculateTotal = () =>
    cartList.reduce((total, item) => total + item.dish_price * item.quantity, 0)

  return (
    <div className="cart-page">
      <Header
        restaurantName="UNI Resto Cafe"
        onCartClick={navigateToCart}
        onHomeClick={navigateToHome}
        onLogout={handleLogout}
      />

      <div className="cart-container">
        <div className="cart-header">
          <h1>My Cart</h1>
          {cartList.length > 0 && (
            <button
              type="button"
              onClick={removeAllCartItems}
              className="remove-all-button"
              data-testid="remove-all"
            >
              Remove All
            </button>
          )}
        </div>

        {cartList.length === 0 ? (
          <div className="empty-cart">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="Empty Cart"
              className="empty-cart-image"
            />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {cartList.map(item => (
                <li key={item.dish_id} className="cart-item">
                  <div className="item-image-container">
                    <img
                      src={item.dish_image}
                      alt={item.dish_name}
                      className="item-image"
                      data-testid="dish-image"
                    />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name" data-testid="dish-name">
                      {item.dish_name}
                    </h3>
                    <p className="item-price" data-testid="dish-price">
                      {item.dish_currency} {item.dish_price}
                    </p>
                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() => decrementCartItemQuantity(item.dish_id)}
                        data-testid="decrement-button"
                      >
                        -
                      </button>
                      <span data-testid="item-quantity">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => incrementCartItemQuantity(item.dish_id)}
                        data-testid="increment-button"
                      >
                        +
                      </button>
                    </div>
                    <p className="item-total">
                      Total: {item.dish_currency}{' '}
                      {(item.dish_price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCartItem(item.dish_id)}
                    className="remove-item"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <h3>
                Order Total: {cartList[0]?.dish_currency}{' '}
                {calculateTotal().toFixed(2)}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
