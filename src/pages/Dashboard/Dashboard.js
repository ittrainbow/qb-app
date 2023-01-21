import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Dashboard.css'

import { auth } from '../../db/firebase'
import { logout, verifyEmail } from '../../db/auth'
import { Context } from '../../App'

export const Dashboard = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const { email } = user
  const { context, setContext, initialContext, countdown, setCountdown, initialCountdown } =
    useContext(Context)
  const { dpi, year, name } = context

  const verifyEmailHandler = () => {
    verifyEmail()
    setCountdown(initialCountdown)
  }

  const logoutHandler = () => {
    logout()
    setContext(initialContext)
    navigate('/')
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="profileDataDiv">
          Logged in as
          <div>{name ? name : '...loading'}</div>
          <div>{email ? email : '...loading'}</div>
          <div>DPI: {dpi ? 'counts' : 'not counts'}</div>
          <div>Season picked: {year}</div>
        </div>
        <button className="buttonBig" disabled={countdown > 0} onClick={verifyEmailHandler}>
          Verify Email{countdown > 0 ? ` ${countdown}` : null}
        </button>
        <button
          className="buttonBig"
          disabled={!auth.currentUser}
          onClick={() => {
            navigate('/profile')
          }}
        >
          Edit Profile
        </button>

        <button className="buttonBig" onClick={() => logoutHandler()}>
          Logout
        </button>
      </div>
    </div>
  )
}
