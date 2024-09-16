import React from 'react'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
import styles from './Reports.module.css'

function Reports() {
  return (
    <div className={styles.reports}>
    <Sidebar/>
    <Navbar/>
    <Footer/>
    <Workspace>
      <h1> Reports </h1>
    </Workspace> 
  </div>
  )
}

export default Reports