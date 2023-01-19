import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { userReducer } from './reducers'

const reducer = combineReducers({
  user: userReducer
})

export const store = configureStore({
  reducer
})
