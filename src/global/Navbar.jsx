import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import bell from "../assets/bell.svg";
import userIcon from "../assets/user.png";
import { IoIosArrowDropdown } from "react-icons/io";
import edit from "../assets/edit.png";
import changePassword from "../assets/changePassword.png";
import logout from "../assets/log-out.png";
import LogoutPopup from "../logpopup/LogoutPopup";
import NotificationPopup from "../notificationPopup/NotificationPopup";
import ChangePassword from "../popup/ChangePassword/ChangePassword";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function NotificationBadge({ count }) {
  return (
    <div className={styles.notificationBadge}>
      {count > 0 && (
        <span className={styles.badge}>{count > 9 ? "9+" : count}</span>
      )}
    </div>
  );
}

function Navbar() {
  const notificationCount = 50;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [changePasswordPopup, setChangePasswordPopup] = useState(false);
  const menuRef = useRef();
  const triggerRef = useRef();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://127.0.0.1:8000/profile/user_id/${userId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData[0]);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [])

  const handleClick = () => {
    setChangePasswordPopup(false);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const notifications = [
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 2",
    "Notification 3",
  ]; // Example notifications

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChangePasswordPopup = () => {
    setChangePasswordPopup(true);
    setIsDropdownOpen(false);
  };

  // const closeChangePasswordPopup = ()=>{
  //   setChangePasswordPopup(false)
  // }

  const handleLogoutPopup = () => {
    // Perform logout actions (e.g., clearing user session)
    setShowLogoutPopup(true);
    setIsDropdownOpen(false);
    // navigate('/login'); // Redirect to login page
  };

  const closeLogoutPopup = () => {
    setShowLogoutPopup(false);
  };

  const handleBellClick = () => {
    setShowNotificationPopup(!showNotificationPopup); // Toggle notification popup
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.bell} onClick={handleBellClick}>
        <img src={bell} alt="notification bell" />
        <NotificationBadge count={notificationCount} />
      </div>

      <div className={styles.userDiv} onClick={toggleDropdown}>
        <div className={styles.user}>
          <img src={user?.profile || userIcon} alt="user profile" />
        </div>
        <div className={styles.userinfo}>
          <h5>{user?.full_name || "User Name"}</h5>
          <h6>Admin</h6>
        </div>
        <div className={styles.dropdownContainer}>
          <div className={styles.menuTrigger} ref={triggerRef}>
            <IoIosArrowDropdown />
          </div>

          {isDropdownOpen && (
            <div
              className={`${styles.dropdownMenu} ${styles.active}`}
              ref={menuRef}
            >
              <ul>
                <li
                  className={styles.dropdownItem}
                  onClick={() => navigate("/Profile")}
                >
                  <img src={edit} alt="Edit Profile" />
                  <a href="/edit-profile">Edit Profile</a>
                </li>
                <li
                  className={styles.dropdownItem}
                  onClick={handleChangePasswordPopup}
                >
                  <img src={changePassword} alt="Change Password" />
                  <a href="#">Change Password</a>
                </li>
                <li className={styles.dropdownItem} onClick={handleLogoutPopup}>
                  <img src={logout} alt="Logout" />
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {showLogoutPopup && <LogoutPopup onClose={closeLogoutPopup} />}
      {showNotificationPopup && ( // Render NotificationPopup if showNotificationPopup is true
        <NotificationPopup
          notifications={notifications}
          onClose={() => setShowNotificationPopup(false)}
        />
      )}
      {changePasswordPopup && (
        <ChangePassword
          onClose={() => setChangePasswordPopup(false)}
          Done={handleClick}
        />
      )}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Password change Request has been send!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Navbar;
