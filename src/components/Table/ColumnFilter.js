import React from 'react'

import './table.css'

export const ColumnFilter = (props) => {
  
  const { 
    filterValue
  } = props.column

  return (
    <input
      className="searchInputColumn"
      value={filterValue || ''}
      onChange={() => {}}
    ></input>
  )
}

export default ColumnFilter
