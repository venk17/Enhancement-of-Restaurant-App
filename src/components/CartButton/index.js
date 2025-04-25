import React from 'react'
import './styles.css'

const CartButton = ({count}) => (
  <div className="cart-button">
    <span className="cart-icon">🛒</span>
    {count > 0 && <span className="cart-count">{count}</span>}
  </div>
)

export default CartButton
