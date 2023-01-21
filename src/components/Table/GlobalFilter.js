import React, { useState, useContext, useEffect } from 'react'
import { useAsyncDebounce } from 'react-table'

import './table.css'
import { Context } from '../../App'

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
  const { context, setContext } = useContext(Context)
  const { search } = context

  const onChangeHandler = useAsyncDebounce((search) => {
    setContext({ ...context, search })
  }, 50)

  useEffect(() => {
    setFilter(search)
    return
    // eslint-disable-next-line
  }, [search])

  return (
    <div className="search">
      <div>Search:</div>
      <div>
        <input
          className="searchInput"
          value={value || ''}
          onChange={(e) => {
            const { value } = e.target

            setValue(value)
            onChangeHandler(value)
          }}
        ></input>
      </div>
      <div
        className="trashIcon"
        onClick={() => {
          setValue('')
          onChangeHandler('')
        }}
      >
        X
      </div>
    </div>
  )
}
