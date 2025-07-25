import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoutes from './routing/PrivateRoutes';
import Dashboard from './components/Protected/Dashboard';
import Jobs from './components/Protected/Job/Jobs';
import { logOut } from './services/authService';

function App() {

  return (
    <>
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Router>
        <nav>
          <Link to="/jobs">See all jobs</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/">Register</Link> |
          <Link to="/login">Login</Link>
          <button onClick={() => logOut()}>Log out</button>
        </nav>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/jobs' element={<Jobs />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
