import React from 'react'
import styles from  './Workspace.module.css' 

function Workspace({ children }) {
  return (
    <div className={styles.workspace}>
        {children}
    </div>
  )
}

export default Workspace