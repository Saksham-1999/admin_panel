import React from 'react'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
import styles from './Contacts.module.css'
import Heading from '../../components/Heading'

function Contacts() {
  return (
    <div className={styles.contacts}>
    <Sidebar/>
    <Navbar/>
    <Footer/>
    <Workspace>
      {/* <h1> Contacts </h1> */}
      <Heading heading="Contacts"/>
    </Workspace> 
    </div>
  )
}

export default Contacts