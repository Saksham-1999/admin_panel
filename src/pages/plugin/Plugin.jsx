import React from 'react'
import styles from './Plugin.module.css'
import Sidebar from '../../global/Sidebar'
import Navbar from '../../global/Navbar'
import Footer from '../../global/Footer'
import Workspace from '../../global/Workspace'
import PluginTable from '../../table/PluginTable';
import { Tabs, Tab } from '../../tabs/Tab';
import ReportsTable from '../../table/ReportsTable'

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
            <ReportsTable />
          </Tab>
          <Tab label="Update">This is Update content</Tab>
        </Tabs>
      </Workspace>
    </div>
  );
}

export default Plugin