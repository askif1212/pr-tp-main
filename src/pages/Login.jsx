import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const success = await login(email, password)
      if (success) {
        navigate('/')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div >
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Password <span className='text-xs text-slate-400'>8 character and up</span></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2 text-gray-900"
            pattern=".{8,}"
            required
          />
        </div>
        <button type="submit" className="w-full text-black border border-slate-400 py-2 rounded transition-all duration-300 ease-in-out hover:border-blue-600">
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-600">Register</Link>
      </p>
    </div>
  )
}

export default Login
