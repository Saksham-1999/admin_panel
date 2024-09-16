import React from "react";
import styles from "./LicenseHistoryModal.module.css";

const LicenseHistoryModal = ({ history, onClose, licenseId }) => {
    console.log(history)
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal}>
        <h2>
          <span>{licenseId} :</span> License Report
        </h2>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Allocated Email</th>
              <th>User Till</th>
            </tr>
          </thead>
          <tbody>
            {history?.map((entry, index) => (
              <tr key={index}>
                <td>{entry?.srNo}</td>
                <td>{entry?.allocatedEmail}</td>
                <td>{new Date(entry?.userTill).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LicenseHistoryModal;
