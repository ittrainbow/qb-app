import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import { Trash } from 'react-bootstrap-icons'

import './table.css'

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)

  const onChangeHandler = useAsyncDebounce((value) => {
    setFilter(value || undefined)
  }, 100)

  return (
    <div className="search">
      <div>Search:</div>
      <div className="searchInput">
        <input
          value={value || ''}
          onChange={(e) => {
            const { value } = e.target

            setValue(value)
            onChangeHandler(value)
          }}
        ></input>
      </div>
      <div>
        <Trash
          className="trashIcon"
          onClick={() => {
            setValue('')
            onChangeHandler('')
          }}
        />
      </div>
    </div>
  )
}
