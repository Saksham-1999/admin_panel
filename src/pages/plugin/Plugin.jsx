import React from 'react'
import styles from './Plugin.module.css'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
import Table1 from '../../table/Table';
import PluginTable from '../../table/PluginTable';
// import emailIcon from '../assets/email.png';
// import TableComponent from '../../table/Table'
// import TabPanel from '../../tabs/Tab'
import { Tabs, Tab } from '../../tabs/Tab';
// import {Table2} from '../../table/Table2'
// import CardComponent from '../../card/CardComponent'
import LineChart from '../../chart/LineChart'

function Plugin() {
  return (
    <div className={styles.plugin}>
      <Sidebar />
      <Navbar />
      <Footer />
      <Workspace>
        <h1>Plugin Management</h1>
        <Tabs defaultTab={0}>
          <Tab label="Install">This is installed content</Tab>
          <Tab label="License">
            <PluginTable />
          </Tab>
          <Tab label="Reports">
            <Table1 />
          </Tab>
          <Tab label="Update">This is Update content</Tab>
        </Tabs>
      </Workspace>
    </div>
  );
}

export default Plugin