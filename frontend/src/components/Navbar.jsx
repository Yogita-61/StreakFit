import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { user, logout } = useAppContext()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) return null

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-logo">
          🔥 StreakFit
        </Link>
        <div className="nav-menu">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/workout" className="nav-link">Workouts</Link>
          <Link to="/account" className="nav-link">Progress</Link>
          <button onClick={handleLogout} className="nav-btn">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
