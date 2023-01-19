import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDoc, setDoc, doc } from 'firebase/firestore'

import './Profile.css'
import { auth, db } from '../../db'
import { setUser } from '../../redux/actions'
import Loader from '../../components/Loader/Loader'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { name } = useSelector((state) => state.user)
  const [editedName, setEditedName] = useState(name)
  const [loading, setLoading] = useState(false)

  const submitHandler = async () => {
    setLoading(true)
    if (name !== editedName) {
      try {
        const { uid } = auth.currentUser
        const response = await getDoc(doc(db, 'users', uid))
        const data = response.data()
        await setDoc(doc(db, 'users', uid), { ...data, name: editedName })
        dispatch(setUser(editedName))
      } catch (error) {
        console.error(error)
      }
    }
    setLoading(false)
    navigate(-1)
  }

  const cancelHandler = () => {
    navigate(-1)
  }

  const onChangeHandler = async (e) => {
    setEditedName(e)
  }

  const form = () => {
    return (
      <>
        Name editor
        <input
          type="text"
          className="input__container"
          value={editedName}
          onChange={(e) => onChangeHandler(e.target.value)}
        />
        <button className="buttonBig" disabled={name === editedName} onClick={submitHandler}>
          Save name
        </button>
        <button className="buttonBig" onClick={cancelHandler}>
          Cancel changes
        </button>
      </>
    )
  }

  return (
    <div className="profile">
      <div className="profile__container">{loading ? <Loader /> : form()}</div>
    </div>
  )
}
