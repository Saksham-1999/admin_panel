import React from 'react'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
import Table from '../../table/Table'
import styles from './Quarantine.module.css'
import Heading from '../../components/Heading'

function Quarantine() {
  return (
    <div className={styles.quarantine}>
    <Sidebar/>
    <Navbar/>
    <Footer/>
    <Workspace>
      {/* <h1> Quarantine </h1> */}
      <Heading heading="Quarantine"/>
      <Table/>
    
    </Workspace> 
  </div>
  )
}

export default Quarantine