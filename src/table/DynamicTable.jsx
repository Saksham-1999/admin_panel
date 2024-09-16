// src/components/DynamicTable.js
import React, { useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import ReactPaginate from 'react-paginate';
import styles from './DynamicTable.module.css';
import { data } from '../data';

const DynamicTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'MESSAGE ID',
        accessor: 'messageId',
      },
      {
        Header: 'CATEGORIES',
        accessor: 'categories',
      },
      {
        Header: 'STARTED ON',
        accessor: 'startedOn',
      },
      {
        Header: 'COMPLETED ON',
        accessor: 'completedOn',
      },
      {
        Header: 'THREAT SCORE',
        accessor: 'threatScore',
        sortType: 'basic',
      },
      {
        Header: 'STATUS',
        accessor: 'status',
        sortType: (rowA, rowB) => {
          if (rowA.values.status === 'completed' && rowB.values.status === 'pending') {
            return -1;
          }
          if (rowA.values.status === 'pending' && rowB.values.status === 'completed') {
            return 1;
          }
          return 0;
        },
      },
      {
        Header: 'DETAILED REPORT',
        accessor: 'detailedReport',
        Cell: ({ cell: { value } }) => (
          <a href={`/reports/${value}`} className={styles.reportLink}>
            View Report
          </a>
        ),
        disableSortBy: true,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handlePageClick = ({ selected }) => {
    gotoPage(selected);
  };

  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={Math.ceil(rows.length / pageSize)}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default DynamicTable;
