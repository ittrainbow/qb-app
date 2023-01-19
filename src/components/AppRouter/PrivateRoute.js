import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../db'

export const PrivateRoute = () => {
  
  const [user] = useAuthState(auth)

  return user ? <Outlet /> : <Navigate to="/login" />
}
