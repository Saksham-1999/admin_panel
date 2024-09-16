import React from 'react'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
import styles from './SIRTs.module.css'

function SIRTs() {
  return (
    <div className={styles.sirts}>
    <Sidebar/>
    <Navbar/>
    <Footer/>
    <Workspace>
        <h1>SIRTs</h1>
    </Workspace>
    </div>
  )
}

export default SIRTs