import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'

function Home() {
  const [laptops, setLaptops] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchLaptops = async () => {
      const response = await axios.get('http://localhost:5000/laptops')
      setLaptops(response.data)
    }
    fetchLaptops()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 px-5">
      {laptops.map(laptop => (
        <div key={laptop.id} className="bg-white border rounded-lg shadow-lg p-4">
          <Link to={`/product/${laptop.id}`} className="text-gray-900">
            <img src={laptop.image} alt={laptop.name} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-xl font-bold mt-2">{laptop.name}</h2>
            <p className="text-gray-600">${laptop.price}</p>
          </Link>
          <button
            onClick={() => addToCart(laptop)}
            className="mt-4 !bg-blue-400 text-black px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
