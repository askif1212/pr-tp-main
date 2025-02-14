import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [laptop, setLaptop] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLaptop = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:5000/laptops/${id}`)
        setLaptop(response.data)
        setImagePreview(response.data?.image)
      } catch (err) {
        console.error('Error fetching laptop:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchLaptop()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5000/laptops/${id}`, laptop)
      navigate('/')
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setLaptop({ ...laptop, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/laptops/${id}`)
      navigate('/')
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (loading) return <div className="text-center p-4 text-gray-800">Loading...</div>
  if (error) return <div className="text-center p-4 text-red-600">Error: {error}</div>
  if (!laptop) return <div className="text-center p-4 text-gray-800">Laptop not found</div>

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <div className="mb-8 border-b pb-6">
        <h2 className="text-2xl font-bold mb-4">Current Product Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-semibold">Name:</p>
            <p className="text-gray-800">{laptop.name}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Price:</p>
            <p className="text-gray-800">${laptop.price}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600 font-semibold">Description:</p>
            <p className="text-gray-800">{laptop.description}</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          {imagePreview && (
            <div className="relative">
              <img src={imagePreview} alt={laptop.name} className="w-full h-48 object-cover rounded" />
            </div>
          )}
          <label className="block mb-2 mt-4 text-gray-700">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="w-full border rounded p-2 text-black" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Name</label>
          <input type="text" value={laptop.name} onChange={(e) => setLaptop({ ...laptop, name: e.target.value })} className="w-full border rounded p-2 text-black" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Price</label>
          <input type="number" value={laptop.price} onChange={(e) => setLaptop({ ...laptop, price: Number(e.target.value) })} className="w-full border rounded p-2 text-black" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Description</label>
          <textarea value={laptop.description} onChange={(e) => setLaptop({ ...laptop, description: e.target.value })} className="w-full border rounded p-2 text-black" />
        </div>
        <div className="flex justify-between mt-6">
          <button type="submit" className=" !border-black !border text-black px-4 py-2 rounded hover:!border-blue-700">Save Changes</button>
          <button type="button" onClick={handleDelete} className="!border-red-400 !border text-black px-4 py-2 rounded hover:!border-red-700">Delete Product</button>
        </div>
      </form>
    </div>
  )
}

export default ProductDetails
