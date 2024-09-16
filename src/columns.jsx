import React from 'react';

export const COLUMNS = [
    {
        Header: "Message Id",
        accessor: "message_id",
        disableSortBy: true,
        Filter: MessageIdFilter,  // Add custom filter component
        filter: 'includes',
    },
    {
        Header: "Categories",
        accessor: "categories",
        disableSortBy: true,

    },
    {
        Header: "Started On",
        accessor: "stared_on",
        disableSortBy: true,

    },
    {
        Header: "Completed On",
        accessor: "completed_on",
        disableSortBy: true,
    },
    {
        Header: "Threat Score",
        accessor: "threat_score",
        sortType: 'basic',

    },
    {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,

    },
    {
        Header: "Detailed report",
        accessor: "Detailed Report",
        Cell: ({ value }) => (
            <a href={`/reports/${value}`} className="reportLink">
              View Report
            </a>
          ),
          disableSortBy: true,

    },
];

function MessageIdFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
        
      />
    );
  }