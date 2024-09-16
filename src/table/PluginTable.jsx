// src/components/SimpleTable.js
import LicenseForm from "../popup/licenseFormPopup/LicenseForm";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./Table.module.css";
import { useTable, usePagination } from "react-table";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import mockData from "../mockData";
import DateFormatter from "../components/Common/DateFormater";

function SimpleTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLicensePopup, setShowLicensePopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  const simpleColumns = useMemo(
    () => [
      { Header: "License ID", accessor: "license_id" },
      { Header: "Plugin ID", accessor: "plugins[0].plugin_id" },
      { Header: "Email", accessor: "allocated_to" },
      {
        Header: "Validity From",
        accessor: "valid_from",
        Cell: ({ value }) => <DateFormatter dateString={value} />,
      },
      {
        Header: "Validity Till",
        accessor: "valid_till",
        Cell: ({ value }) => <DateFormatter dateString={value} />,
      },
      {
        Header: "Issue",
        accessor: "issue",
        Cell: ({ row }) => {
          const pluginId = row.original.plugins[0]?.plugin_id;
          const email = row.original.allocated_to;
          const buttonText = !pluginId && !email ? "Allocate" : "Revoke";

          return (
            <button
              style={{
                backgroundColor: buttonText === "Revoke" ? "red" : "green",
                color: "white",
                padding: "3px 5px",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "background-color 0.3s",
              }}
              onClick={() => handleIssueClick(row.original, buttonText)}
            >
              {buttonText}
            </button>
          );
        },
      },
    ],
    []
  );

  const handleIssueClick = (row, buttonText) => {
    setShowLicensePopup(true);
    setSelectedRow({ ...row, buttonText });
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/licenses/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  // useEffect(() => {
  //   // Simulate API call with setTimeout
  //   setTimeout(() => {
  //     setData(mockData);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  const handleSubmit = async (email, licenseId) => {
    setShowLicensePopup(false);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/licenses/${licenseId}/allocate/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ allocated_to: email, license: licenseId }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRevoke = async (email, licenseId) => {
    setShowLicensePopup(false);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/licenses/revoke-license/${licenseId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ allocated_to: email, license: licenseId }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
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
  } = useTable(
    {
      columns: simpleColumns,
      data,
      initialState: { pageIndex: 0 },
      getRowId: (row, relativeIndex) => relativeIndex.toString(),
    },
    usePagination
  );

  const { pageIndex } = state;

  return (
    <div className={styles.tableContainer}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table {...getTableProps()} className={styles.table}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column.id}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={cell.column.id}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <GrFormPrevious />
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <GrFormNext />
            </button>
          </div>
        </>
      )}
      {showLicensePopup && (
        <LicenseForm
          onClose={() => setShowLicensePopup(false)}
          rowData={selectedRow}
          handleSubmit={handleSubmit}
          handleRevoke={handleRevoke}
        />
      )}
    </div>
  );
}

export default SimpleTable;
