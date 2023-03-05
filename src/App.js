import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getDoc, doc } from 'firebase/firestore'
import Dice from 'react-dice-roll'

import { auth, db } from './db/'

import AppRouter from './components/AppRouter/AppRouter'

import './App.css'

export const Context = React.createContext()
export const initialContext = { dpi: false, year: 2022, name: '', email: '', search: '' }
export const initialCountdown = 60

const App = () => {
  const [user] = useAuthState(auth)
  const [context, setContext] = useState(initialContext)
  const [countdown, setCountdown] = useState(initialCountdown)
  const [loadedContext, setLoadedContext] = useState('')

  useEffect(() => {
    if (countdown > 0) {
      const cdown = setInterval(() => setCountdown(countdown - 1), 1000)
      return () => clearInterval(cdown)
    }
    // eslint-disable-next-line
  }, [countdown])

  const setContextOnInit = (data) => {
    setContext(data)
    setLoadedContext(data)
  }

  const fetchUserName = async () => {
    if (user) {
      const { displayName, email, uid } = user
      try {
        await getDoc(doc(db, 'users', uid)).then((response) => {
          if (response.data()) {
            const { name, year, dpi, email } = response.data()
            setContextOnInit({ ...context, name, year, dpi, email })
          } else {
            setContextOnInit({ ...initialContext, name: displayName, email })
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchUserName()
    return
    // eslint-disable-next-line
  }, [user])

  return (
    <div className="App">
      <Context.Provider
        value={{
          context,
          setContext,
          initialContext,
          loadedContext,
          countdown,
          setCountdown
        }}
      >
        <AppRouter />
      </Context.Provider>
    </div>
  )
}

export default App
