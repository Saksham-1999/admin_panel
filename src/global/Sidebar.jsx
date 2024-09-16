import React from 'react';
import styles from './Sidebar.module.css';
import logoTop from '../assets/IAF_logo.jpg';
import logoBottom from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logotop}>
        <img src={logoTop} alt="Top Logo" />
      </div>
      <div className={styles.titles}>
        <Link to="/dashboard"><h4>Dashboard</h4></Link>
        <Link to="/plugin"><h4>Plugin</h4></Link>
        <Link to="/sandbox"><h4>SandBox</h4></Link>
        <Link to="/quarantine"><h4>Quarantine</h4></Link>
        <Link to="/phishing-mails"><h4>Phishing Mails</h4></Link>
        <Link to="/rogue-db"><h4>Rogue DB</h4></Link>
        <Link to="/cdr"><h4>CDR</h4></Link>
        <Link to="/contact"><h4>Contact</h4></Link>
        <Link to="/reports"><h4>Reports</h4></Link>
        <Link to="/sirts"><h4>SIRTs</h4></Link>
        <Link to="/profile"><h4>Profile</h4></Link>
        <Link to="/settings"><h4>Settings</h4></Link>
      </div>
      <div className={styles.logobottom}>
        <img src={logoBottom} alt="Bottom logo" />
      </div>
    </div>
  );
}

export default Sidebar;
