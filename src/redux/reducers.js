import { SET_USER, CLEAR_USER } from './types'

const initialState = {
  name: ''
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        name: action.payload
      }
    }

    case CLEAR_USER: {
      return {
        ...state,
        name: ''
      }
    }

    default:
      return state
  }
}
