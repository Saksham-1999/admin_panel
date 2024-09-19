// src/components/SimpleTable.js
import LicenseForm from "../popup/licenseFormPopup/LicenseForm";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./Table.module.css";
import { useTable, usePagination } from "react-table";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import mockData, { licenseReportData } from "../mockData";
import DateFormatter from "../components/Common/DateFormater";
import LicenseHistoryModal from "./LicenseHistoryModal";
import { toast } from "react-toastify";

function SimpleTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLicensePopup, setShowLicensePopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedLicenseHistory, setSelectedLicenseHistory] = useState(null);

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
        toast.error("Error allocating license");
        throw new Error("Network response was not ok");
      }
      toast.success("License allocated successfully");
      await fetchData();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error allocating license");
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
        toast.error("Error revoking license");
        throw new Error("Network response was not ok");
      }
      toast.success("License revoked successfully");
      await fetchData();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error revoking license");
    }
  };

  const handleRowClick = async (licenseId) => {
    if (event.target.tagName === 'BUTTON') {
      return; // Exit the function early if it's a button click
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/licenses/${licenseId}/history/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const history = await response.json();
      setSelectedLicenseHistory({
        licenseId: licenseId,
        history: history,
      });
      setShowHistoryModal(true);
    } catch (error) {
      console.error("Error fetching license history:", error);
    }

    // Simulate API call with setTimeout

    // setTimeout(() => {
    //   setSelectedLicenseHistory({
    //     licenseId: licenseId,
    //     history: licenseReportData,
    //   });
    //   setShowHistoryModal(true);
    // }, 1000);
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
                  <tr
                    {...row.getRowProps()}
                    key={row.id}
                    onClick={() => handleRowClick(row.original.license_id)}
                    style={{ cursor: "pointer" }}
                  >
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
      {showHistoryModal && (
        <LicenseHistoryModal
          licenseId={selectedLicenseHistory.licenseId}
          history={selectedLicenseHistory.history}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </div>
  );
}

export default SimpleTable;
