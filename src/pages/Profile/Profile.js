import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDoc, setDoc, doc } from 'firebase/firestore'

import './Profile.css'
import { auth, db } from '../../db'
import { Loader, Drop } from '../../UI'
import { Context } from '../../App'
import { saveHelper } from '../../components/Table'

export const Profile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { context, setContext, loadedContext, setCountdown, initialCountdown } = useContext(Context)
  const { name, dpi, year } = context
  const canSave = saveHelper(context, loadedContext)

  const submitHandler = async () => {
    setLoading(true)
    try {
      const { uid } = auth.currentUser
      const response = await getDoc(doc(db, 'users', uid))
      await setDoc(doc(db, 'users', uid), { ...response.data(), name, dpi, year })
    } catch (error) {
      console.error(error)
    }
    setCountdown(initialCountdown)
    setLoading(false)
    navigate(-1)
  }

  const cancelHandler = () => {
    setContext(loadedContext)
    navigate(-1)
  }

  const onChangeHandler = async (name) => setContext({ ...context, name })

  const dpiHandler = () => setContext({ ...context, dpi: !dpi })

  const form = () => {
    return (
      <>
        <div>
          Profile editor
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => onChangeHandler(e.target.value)}
          />
          <div className="subProfile">
            <div className="subLeft">Count DPI</div>
            <input className="subRight mt5" type="checkbox" checked={dpi} onChange={dpiHandler} />
          </div>
          <div className="subProfile">
            <div className="subLeft mt5">Year: {year}</div>
            <div className="subRight"><Drop /></div>
          </div>
        </div>
        <button className="buttonBig" disabled={!canSave}onClick={submitHandler}>
          Save profile
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
