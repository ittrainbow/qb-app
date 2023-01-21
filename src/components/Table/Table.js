import React, { useMemo, useState, useContext, useEffect } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table'
import { doc, setDoc } from 'firebase/firestore'

import career from './json/career.json'

import { Loader } from '../../UI'
import { auth, db } from '../../db'
import { Context } from '../../App'
import { COLUMNS, GlobalFilter, navHelper, saveHelper, calcHelper } from './index.js'
import { Drop } from '../../UI/Drop/Drop'

const Table = () => {
  const { context, setContext, loadedContext } = useContext(Context)
  const { dpi, year, search } = context
  const [loading, setLoading] = useState(false)
  const columns = useMemo(() => COLUMNS, [])
  const seasons = useMemo(() => career, [])
  const data = seasons[year]
  const { firstSeason, lastSeason } = navHelper(seasons)
  const canSave = saveHelper(context, loadedContext)

  const initialState = { pageSize: 20 }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  )

  const { globalFilter } = state

  useEffect(() => {
    setGlobalFilter(search)
    return
    // eslint-disable-next-line
  }, [year])

  const dpiHandler = () => setContext({ ...context, dpi: !dpi })

  const saveHandler = async () => {
    setLoading(true)
    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), context)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const yearHandler = (year) => setContext({ ...context, year })

  const table = () => {
    return (
      <>
        <div className="buttonDiv">
          <button
            className="buttonShort"
            disabled={year === firstSeason}
            onClick={() => yearHandler(firstSeason)}
          >
            {firstSeason}
          </button>
          <button
            className="buttonShort"
            disabled={year === firstSeason}
            onClick={() => yearHandler(year - 1)}
          >
            Prev
          </button>
          <div className="year">{year} </div>
          <button
            className="buttonShort"
            disabled={year === lastSeason}
            onClick={() => yearHandler(year + 1)}
          >
            Next
          </button>
          <button
            className="buttonShort"
            disabled={year === lastSeason}
            onClick={() => yearHandler(lastSeason)}
          >
            {lastSeason}
          </button>

          <div>
            <Drop />
          </div>
          <div className="dpi">
            <div className="cboxDiv">
              <input type="checkbox" className="cbox" checked={dpi} onChange={() => dpiHandler()} />
            </div>
            DPIs as completions (endzone DPI as TDs){' '}
            <button
              className="buttonShort"
              disabled={!loadedContext || !canSave}
              onClick={() => saveHandler()}
            >
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
                    return <td {...cell.getCellProps()}>{calcHelper(cell, row, dpi)}</td>
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
                        <span className="bold">{calcHelper(cell, row, dpi)}</span>
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
