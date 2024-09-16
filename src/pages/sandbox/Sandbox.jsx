import React, { useState } from 'react'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
// import Details from '../../popup/Details'
// import Popup from '../../popup/Popup'
// import PluginActivity from '../../popup/PluginActivity'

// import StyledTable from '../../table/StyledTable'
import styles from './Sandbox.module.css'

function Sandbox() {
  

  return (
    <div className={styles.sandbox}>
    <Sidebar/>
    <Navbar/>
    <Footer/>
    <Workspace>
      <h1> Sandbox </h1>
    </Workspace>
    </div>
  )
}

export default Sandbox