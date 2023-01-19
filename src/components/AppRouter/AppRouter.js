import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Login, Register, Dashboard, Reset, Profile, NotFound } from '../../pages'
import { PrivateRoute } from './PrivateRoute'
import { Header } from '../../pages'
import Table from '../Table/Table'

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
