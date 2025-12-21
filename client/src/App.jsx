import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
      setMessage('Error fetching users')
    } finally {
      setLoading(false)
    }
  }

  const testApi = async () => {
    try {
      const response = await axios.get('/api')
      setMessage(response.data.message)
    } catch (error) {
      console.error('Error testing API:', error)
      setMessage('Error connecting to backend')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Node.js Full-Stack App</h1>
        <button onClick={testApi} className="test-btn">
          Test Backend Connection
        </button>
        {message && <p className="message">{message}</p>}
        
        <div className="users-section">
          <h2>Users</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="users-list">
              {users.map(user => (
                <li key={user.id} className="user-item">
                  <strong>{user.name}</strong> - {user.email}
                </li>
              ))}
            </ul>
          )}
          <button onClick={fetchUsers} className="refresh-btn">
            Refresh Users
          </button>
        </div>
      </header>
    </div>
  )
}

export default App

