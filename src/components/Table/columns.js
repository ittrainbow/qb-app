import { format } from 'date-fns'
import { ColumnFilter } from './ColumnFilter'

export const GROUPED_COLUMNS = [
  {
    id: 1,
    header: 'Game',
    footer: 'Game',
    columns: [
      {
        header: 'Year',
        footer: 'Year',
        accessor: 'year',
        cell: ({ value }) => {
          return format(new Date(value), 'dd/mm/yy')
        },
        disableSortBy: true,
        disableFilters: true
      },
      {
        header: 'Week',
        footer: 'Week',
        accessor: 'week',
        disableSortBy: true,
        disableFilters: true
      },
      {
        header: 'VS',
        footer: 'VS',
        accessor: 'opp',
        disableSortBy: true,
        disableFilters: true
      },
      {
        header: 'Score',
        footer: 'Score',
        accessor: 'score',
        disableSortBy: true,
        disableFilters: true
      }
    ]
  },
  {
    id: 2,
    header: 'Stat',
    footer: 'Stat',
    columns: [
      {
        header: 'Cmp',
        footer: 'Cmp',
        accessor: 'cmp'
      },
      {
        header: 'Att',
        footer: 'Att',
        accessor: 'att'
      },
      {
        header: '%',
        footer: '%',
        accessor: 'cmp_percent',
        disableSortBy: true,
        disableFilters: true
      },
      {
        header: 'Yds',
        footer: 'Yds',
        accessor: 'yards'
      },
      {
        header: 'TD',
        footer: 'TD',
        accessor: 'td'
      },
      {
        header: 'Int',
        footer: 'Int',
        accessor: 'int'
      }
    ]
  },
  {
    id: 3,
    header: 'Sacks',
    footer: 'Sacks',
    columns: [
      {
        header: 'Sk',
        footer: 'Sk',
        accessor: 'sacks'
      },
      {
        header: '-Yds',
        footer: '-Yds',
        accessor: 'sack_yards'
      }
    ]
  },
  {
    id: 4,
    header: 'DPI',
    footer: 'DPI',
    columns: [
      {
        header: 'DPI',
        footer: 'DPI',
        accessor: 'dpi'
      },
      {
        header: '+Yds',
        footer: '+Yds',
        accessor: 'dpi_yards'
      },
      {
        header: '+TD',
        footer: '+TD',
        accessor: 'dpi_td'
      }
    ]
  },
  {
    id: 5,
    header: 'Rtg',
    footer: 'Rtg',
    columns: [
      {
        header: 'PR',
        footer: 'PR',
        accessor: 'rating',
        disableSortBy: true,
        disableFilters: true
      },
      {
        header: 'QBR',
        footer: 'QBR',
        accessor: 'qbr'
      }
    ]
  }
]
