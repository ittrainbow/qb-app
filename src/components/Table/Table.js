import React, { useMemo, useState, useContext } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table'
import { setDoc, doc } from 'firebase/firestore'

import { auth, db } from '../../db'
import Loader from '../Loader/Loader'
import { GROUPED_COLUMNS } from './columns'
import RODGERS from './RODGERS.json'
import GlobalFilter from './GlobalFilter'
import ColumnFilter from './ColumnFilter'
import { calc } from './calculator'
import { Context } from '../../App'

const firstYear = 2021
const initialState = { pageIndex: 0, pageSize: 18 }

const Table = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toSave, setToSave] = useState(false)
  const { context, setContext } = useContext(Context)
  const { dpi } = context
  const columns = useMemo(() => GROUPED_COLUMNS, [])
  const data = useMemo(() => RODGERS, [])

  const defaultColumn = useMemo(() => {
    return {
      filter: ColumnFilter
    }
  }, [])

  const openHandler = () => {
    setOpen(!open)
  }

  const saveDPIHandler = async () => {
    setLoading(true)
    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), context)
    } catch (error) {
      console.error(error)
    }
    setToSave(!toSave)
    setLoading(false)
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  )

  const { globalFilter, pageIndex } = state

  const pickerHandler = (year) => {
    setOpen(false)
    gotoPage(year)
  }

  const dpiHandler = () => {
    setToSave(!toSave)
    setContext({
      ...context,
      dpi: !dpi
    })
  }

  const dropMenu = () => {
    return (
      <div className="dropdown">
        <button onClick={openHandler} className="button">
          Pick Year
        </button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <button onClick={() => pickerHandler(0)}>{firstYear}</button>
            </li>
            <li className="menu-item">
              <button onClick={() => pickerHandler(pageCount - 1)}>{firstYear + 1}</button>
            </li>
          </ul>
        ) : null}
      </div>
    )
  }

  const table = () => {
    return (
      <>
        <div className="buttonDiv">
          <button className="buttonShort" disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
            {0 + firstYear}
          </button>
          <button
            className="buttonShort"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            Prev
          </button>
          <div className="year">{pageIndex + firstYear} </div>
          <button className="buttonShort" disabled={!canNextPage} onClick={() => nextPage()}>
            Next
          </button>
          <button
            className="buttonShort"
            disabled={!canNextPage}
            onClick={() => gotoPage(pageCount - 1)}
          >
            {pageCount - 1 + firstYear}
          </button>
          <div>{dropMenu()}</div>
          <div className="dpi">
            <div className="cboxDiv">
              <input type="checkbox" className="cbox" checked={dpi} onChange={() => dpiHandler()} />
            </div>
            DPIs as completions (endzone DPI as TDs){' '}
            <button className="buttonShort" disabled={!toSave} onClick={() => saveDPIHandler()}>
              Save
            </button>
          </div>
        </div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className={column.isSorted ? 'headerSelected' : null}>
                      {column.render('header')}
                    </div>
                    <div>
                      {column.canFilter && !!column.disableSortBy ? column.render('filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return row.original.week !== 'SZN' ? (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{calc(cell, row, dpi)}</td>
                  })}
                </tr>
              ) : null
            })}
          </tbody>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return row.original.week === 'SZN' ? (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <span className="bold">{calc(cell, row, dpi)}</span>
                      </td>
                    )
                  })}
                </tr>
              ) : null
            })}
          </tbody>
        </table>
      </>
    )
  }

  return loading ? <Loader /> : table()
}

export default Table
