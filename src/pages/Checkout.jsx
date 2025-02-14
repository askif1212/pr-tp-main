import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Checkout() {
  const { clearCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart()
      navigate('/')
    }, 3000)
    return () => clearTimeout(timer)
  }, [clearCart, navigate])

  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Order Successful!</h1>
      <p>Thank you for your purchase. Redirecting to home page...</p>
    </div>
  )
}

export default Checkout
