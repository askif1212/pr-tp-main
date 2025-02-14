import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  const decrementCart = (productId) => {
    setCartItems(cartItems => {
      const index = cartItems.findIndex(item => item.id === productId)
      if (index !== -1) {
        const newCartItems = [...cartItems]
        newCartItems.splice(index, 1)
        return newCartItems
      }
      return cartItems
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart,decrementCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
