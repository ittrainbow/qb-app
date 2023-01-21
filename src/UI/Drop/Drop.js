import React, { useState, useContext, useMemo } from 'react'
import { Context } from '../../App'
import career from '../../components/Table/json/career.json'
import { navHelper } from '../../components/Table'

export const Drop = () => {
  const { context, setContext } = useContext(Context)
  const [open, setOpen] = useState(false)
  const seasons = useMemo(() => career, [])
  const { careerArray } = navHelper(seasons)

  const seasonHandler = (year) => {
    setContext({ ...context, year })
    setOpen(false)
  }

  return (
    <div className="dropdown">
      <button onClick={() => setOpen(!open)} className="button">
        Pick Year
      </button>
      {open ? (
        <ul className="menu">
          {careerArray.map((el) => (
            <li key={el} className="menu-item">
              <button id={el} onClick={(e) => seasonHandler(Number(e.target.id))}>
                {el}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
