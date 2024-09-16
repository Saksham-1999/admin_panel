import React, { useState, useEffect } from "react";
import Sidebar from "../../global/Sidebar";
import Navbar from "../../global/Navbar";
import Footer from "../../global/Footer";
import Workspace from "../../global/Workspace";
import styles from "./Profile.module.css";
import { UserData } from "../../mockData";
import { useUser } from "../../hooks/UserData";


function Profile() {
  const { user } = useUser();

  // for dummy data only
  // const user = UserData;

  return (
    // <></>
    <div className={styles.profile}>
      <Navbar />
      <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
        <Sidebar />
        <Workspace>
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div
              style={{
                display: "block",
                marginTop: "0px",
                backgroundColor: "gray",
                width: "100%",
              }}
            >
              <div
                style={{
                  backgroundColor: "black",
                  maxWidth: "140px",
                  height: "60px",
                  color: "white",
                  fontSize: "22px",
                }}
              >
                <h2 style={{ padding: "12px" }}>About</h2>
              </div>
            </div>
            {/* details area */}
            <div
              style={{
                backgroundColor: "white",
                flex: "1",
                paddingBottom: "20px",
              }}
            >
              <div style={{ marginLeft: "1%" }}>
                <div style={{ display: "flex" }}>
                  <strong style={{ fontSize: "20px", padding: "15px" }}>
                    Full Name <span style={{ paddingLeft: "150px" }}>:</span>
                  </strong>
                  <span
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {user?.full_name}
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <strong style={{ fontSize: "20px", padding: "15px" }}>
                    Email<span style={{ paddingLeft: "198px" }}>:</span>
                  </strong>
                  <span
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {user?.email}
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <strong style={{ fontSize: "20px", padding: "15px" }}>
                    Phone<span style={{ paddingLeft: "190px" }}>:</span>
                  </strong>
                  <span
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {user?.phone_number}
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <strong style={{ fontSize: "20px", padding: "15px" }}>
                    Address<span style={{ paddingLeft: "170px" }}>:</span>
                  </strong>
                  <span
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {user?.address}
                  </span>
                </div>
                <div style={{ display: "flex" }}>
                  <strong style={{ fontSize: "20px", padding: "15px" }}>
                    Organization<span style={{ paddingLeft: "128px" }}>:</span>
                  </strong>
                  <span
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {user?.organization}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Workspace>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
