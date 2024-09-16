import React, { useMemo, useState } from 'react';
import styles from './Table.module.css';
import { useTable, usePagination,useSortBy,useFilters } from 'react-table';
import MOCK_DATA from '../MOCK_DATA.json';
import { COLUMNS } from '../columns';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

function Table() {
  const columns = useMemo(() => [
    {
      Header: 'Select',
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.isSelected}
          onChange={() => handleRowSelect(row)}
        />
      ),
      disableSortBy: true,
      disableFilters: true,
    },
    ...COLUMNS
  ], []);

  const data = useMemo(() => MOCK_DATA, []);

  const [selectedRows, setSelectedRows] = useState({});

  const handleRowSelect = (row) => {
    const newSelectedRows = { ...selectedRows, [row.id]: !selectedRows[row.id] };
    setSelectedRows(newSelectedRows);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      getRowId: (row, relativeIndex) => relativeIndex, // Ensure unique row IDs
    },
    useFilters,
    useSortBy,
    usePagination,
  );

  const { pageIndex } = state;

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                {...column.getHeaderProps(
                  column.id === 'threat_score' ? column.getSortByToggleProps() : {}
                )}
                key={column.id}
              >
                {column.render('Header')}
                {column.id === 'threat_score' && (
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                )}
                {column.id === 'message_id' && column.canFilter && column.render('Filter')}
              </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            const isSelected = !!selectedRows[row.id];
            return (
              <tr
                {...row.getRowProps()}
                key={row.id}
                className={isSelected ? styles.selectedRow : ''}
              >
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <GrFormPrevious />
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <GrFormNext />
        </button>
      </div>
    </div>
  );
}

export default Table;
