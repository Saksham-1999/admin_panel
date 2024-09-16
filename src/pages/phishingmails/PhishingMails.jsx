import React from 'react'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
import styles from './PhishingMails.module.css'


function PhishingMails() {
  return (
    <div className={styles.phishingmails}>
    <Sidebar/>
    <Navbar/>
    <Footer/>
    <Workspace>
      <h1> PhishingMails </h1>
    </Workspace> 
  </div>
  )
}

export default PhishingMails