import {createContext, useContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const addCartItem = dish => {
    const existingItem = cartList.find(
      cartItem => cartItem.dish_id === dish.dish_id,
    )
    if (existingItem) {
      setCartList(
        cartList.map(cartItem =>
          cartItem.dish_id === dish.dish_id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem,
        ),
      )
    } else {
      setCartList([...cartList, {...dish, quantity: 1}])
    }
  }

  const removeCartItem = dishId => {
    setCartList(cartList.filter(cartItem => cartItem.dish_id !== dishId))
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(
      cartList.map(cartItem =>
        cartItem.dish_id === dishId
          ? {...cartItem, quantity: cartItem.quantity + 1}
          : cartItem,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    const foundItem = cartList.find(cartItem => cartItem.dish_id === dishId)
    if (foundItem.quantity > 1) {
      setCartList(
        cartList.map(cartItem =>
          cartItem.dish_id === dishId
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem,
        ),
      )
    } else {
      removeCartItem(dishId)
    }
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const cartCount = cartList.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{
        cartList,
        cartCount,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
