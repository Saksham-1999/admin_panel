import React from 'react'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
import styles from './Settings.module.css'

function Settings() {
  return (
    <div className={styles.settings}>
    <Sidebar/>
    <Navbar/>
    <Footer/>
    <Workspace>
        <h1>Settings</h1>
    </Workspace>
    </div>
  )
}

export default Settings