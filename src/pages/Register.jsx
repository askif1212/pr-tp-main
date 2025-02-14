import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(email, password)
      navigate('/')
    } catch (err) {
      setError('Email already exists')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Register</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Password <span className='text-xs text-slate-400'>8 character and up</span></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern=".{8,}"
            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
            required
          />
        </div>
        <button type="submit" className="w-full !bg-white hover:border-indigo-700 text-black py-2 rounded transition-all border border-slate-400">
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Login</Link>
      </p>
    </div>
  )
}

export default Register
