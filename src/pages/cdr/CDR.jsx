import React from "react";
import Sidebar from "../../global/Sidebar";
import Navbar from "../../global/Navbar";
import Footer from "../../global/Footer";
import Workspace from "../../global/Workspace";
import DynamicTable from "../../table/DynamicTable";
import styles from "./CDR.module.css";

function CDR() {
  return (
    <div className={styles.cdr}>
      <Sidebar />
      <Navbar />
      <Footer />
      <Workspace>
        <h1> CDR </h1>

        <DynamicTable />
      </Workspace>
    </div>
  );
}

export default CDR;
