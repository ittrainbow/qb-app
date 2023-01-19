import { SET_USER, CLEAR_USER } from './types'

export function setUser(payload) {
  return {
    type: SET_USER,
    payload
  }
}

export function clearUser() {
  return {
    type: CLEAR_USER
  }
}
