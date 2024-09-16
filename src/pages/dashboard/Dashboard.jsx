import React from 'react'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
import CardComponent from '../../card/CardComponent'
// import Popup from '../../popup/Popup'
import styles from './Dashboard.module.css'
import LineChart from '../../chart/LineChart'
import emailIcon from '../../assets/email.png';
import sandboxIcon from '../../assets/sandbox.png';
import cdrIcon from '../../assets/cdr.png';
import impectIcon from '../../assets/impect.png';

function Dashboard() {
  return (
    <div className={styles.dashboard}>
    <Sidebar/>
    <Navbar/>
    <Footer/>
    <Workspace>
      <h1> Dashboard </h1>
      <CardComponent icon={emailIcon} title={"Total Mail"} initialCount={45000}/>
      <CardComponent icon={sandboxIcon} title={"Sandbox Testing"} initialCount={10200}/>
      <CardComponent icon={cdrIcon} title={"CDR Completed"} initialCount={4016}/>
      <CardComponent icon={impectIcon} title={"Impected Found"} initialCount={2040}/>
      <CardComponent icon={cdrIcon} title={"CDR Completed"} initialCount={4016}/>
      {/* <Popup/> */}
      <LineChart/>
    </Workspace> 
  </div>
  )
}

export default Dashboard