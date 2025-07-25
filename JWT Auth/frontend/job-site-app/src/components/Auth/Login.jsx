import React, { useState } from 'react'
import { login, logOut } from '../../services/authService';
import { useNavigate } from 'react-router-dom';


function Login() {

    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            const res = await login(loginData)
            const token = res.data.token
            localStorage.setItem('token', token)
            setMessage('Login successful')
            navigate('/dashboard')
            runLogOutTimer()


            //fetch users as proof
            // const userRes = await 
        } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed')
        }
    }

    function runLogOutTimer() {
        setTimeout(() => {
            logOut()
        }, 5000);
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' value={loginData.username} onChange={e => setLoginData({ ...loginData, username: e.target.value })} required />
                <input type="password" placeholder='Password' value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} required />

                <button type='submit'>Login</button>

            </form>
            <p>{message}</p>
        </div>
    )
}

export default Login