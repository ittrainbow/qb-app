import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../db'
import './Login.css'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  const loginButtonActive = emailValid && password.length > 2

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
    if (error) alert(error)
    // eslint-disable-next-line
  }, [user, loading])

  const emailInput = (email) => {
    const checkEmailValid = /\S+@\S+\.\S+/.test(email)

    setEmail(email)
    setEmailValid(checkEmailValid)
  }

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => emailInput(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className={loginButtonActive ? 'login__btn' : 'login__inactive'}
          disabled={!loginButtonActive}
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  )
}
