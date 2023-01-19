import React, { useState } from 'react'

import AppRouter from './components/AppRouter/AppRouter'
import './App.css'

export const Context = React.createContext()

const App = () => {
  const initialContext = { countdown: 60, dpi: false }
  const [context, setContext] = useState(initialContext)
  const clearContext = () => setContext(initialContext)

  return (
    <div className="App">
      <Context.Provider value={{ context, setContext, clearContext }}>
        <AppRouter />
      </Context.Provider>
    </div>
  )
}

export default App
