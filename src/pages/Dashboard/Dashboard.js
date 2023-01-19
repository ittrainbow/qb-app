import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDoc, doc } from 'firebase/firestore'

import './Dashboard.css'

import { auth, db } from '../../db/firebase'
import { logout, verifyEmail } from '../../db/auth'
import { Context } from '../../App'
import { setUser, clearUser } from '../../redux/actions'

export const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const { email } = user
  const { name } = useSelector((state) => state.user)
  const { context, setContext } = useContext(Context)
  const { countdown } = context

  const fetchUserName = async () => {
    try {
      await getDoc(doc(db, 'users', auth.currentUser.uid)).then((response) => {
        dispatch(setUser(response.data().name))
        setContext({
          ...response.data(),
          countdown
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (countdown > 0) {
      const setCountdown = setInterval(
        () => setContext({ ...context, countdown: countdown - 1 }),
        1000
      )
      return () => clearInterval(setCountdown)
    }
    //eslint-disable-next-line
  }, [countdown])

  useEffect(() => {
    fetchUserName()
    return
    //eslint-disable-next-line
  }, [])

  const verifyEmailHandler = () => {
    verifyEmail()
    setContext({ ...context, countdown: 60 })
  }

  const logoutHandler = () => {
    logout()
    dispatch(clearUser())
    navigate('/')
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="profileDataDiv">
          Logged in as
          <div>{name ? name : '...loading'}</div>
          <div>{email ? email : '...loading'}</div>
        </div>
          <button className="buttonBig" disabled={countdown > 0} onClick={verifyEmailHandler}>
            Verify Email{countdown > 0 ? ` ${countdown}` : null}
          </button>
          <button className="buttonBig" disabled={!name} onClick={() => navigate('/profile')}>
            Change Name
          </button>
          <button className="buttonBig" onClick={() => logoutHandler()}>
            Logout
          </button>
      </div>
    </div>
  )
}
