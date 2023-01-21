export const navHelper = (seasons) => {
  const array = Object.keys(seasons)

  const careerArray = array.map((el) => Number(el))
  const firstSeason = Number(array[0])
  const lastSeason = Number(array[array.length - 1])

  return {
    careerArray,
    firstSeason,
    lastSeason
  }
}

export const saveHelper = (string1, string2) => {
  return JSON.stringify(string1) !== JSON.stringify(string2)
}

export const calcHelper = (cell, row, dpiCounts) => {
  const cmp = dpiCounts ? row.cells[4].value + row.cells[12].value : row.cells[4].value
  const att = dpiCounts ? row.cells[5].value + row.cells[12].value : row.cells[5].value
  const yds = dpiCounts ? row.cells[7].value + row.cells[13].value : row.cells[7].value
  const td = dpiCounts ? row.cells[8].value + row.cells[14].value : row.cells[8].value
  const int = row.cells[9].value

  const a = Math.min((cmp / att - 0.3) * 5, 2.375)
  const b = Math.min((yds / att - 3) / 4, 2.375)
  const c = Math.min((td / att) * 20, 2.375)
  const d = Math.min(2.375 - 25 * (int / att), 2.375)

  const percentage = ((100 * cmp) / att).toFixed(1)
  const passerRating = (((a + b + c + d) / 6) * 100).toFixed(1)

  const hasPlayed = () => !isNaN(cmp) && !isNaN(att)

  switch (cell.column.header) {
    case 'Cmp':
      return hasPlayed() ? cmp : '-'

    case 'Att':
      return hasPlayed() ? att : '-'

    case 'TD':
      return hasPlayed() ? td : '-'

    case 'Yds':
      return hasPlayed() ? yds : '-'

    case '%':
      return hasPlayed() ? percentage : '-'

    case 'PR':
      return hasPlayed() ? passerRating : '-'

    default:
      return cell.render('Cell')
  }
}
