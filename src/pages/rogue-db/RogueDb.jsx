import React,{ useEffect } from 'react'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
// import { usePopup } from '../../popup/PopupContext';
import styles from './RougeDb.module.css'

function RogueDb() {
  // const { setShowPopup } = usePopup();

  // useEffect(() => {
  //   setShowPopup(true);
  // }, [setShowPopup]);
  return (
    <div className={styles.rougeDb}>
    <Sidebar/>
    <Navbar/>
    <Footer/>
    <Workspace>
        <h1>Rogue DB</h1>
    </Workspace>
    </div>
  )
}

export default RogueDb