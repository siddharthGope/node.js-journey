import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoutes from './routing/PrivateRoutes';
import Dashboard from './components/Protected/Dashboard';

function App() {

  return (
    <>
      <Router>
        <nav>
          <Link to="/">Register</Link> |
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
