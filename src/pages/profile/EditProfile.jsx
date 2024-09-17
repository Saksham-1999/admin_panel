import React, { useEffect, useState } from "react";
import Navbar from "../../global/Navbar";
import Sidebar from "../../global/Sidebar";
import Workspace from "../../global/Workspace";
import { validateEmail } from "../../Validation";
import { toast } from "react-toastify";

function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone_number: '',
    address: '',
    organization: '',
  });

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




  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        full_name: user.full_name || '',
        phone_number: user.phone_number || '',
        address: user.address || '',
        organization: user.organization || '',
      })
    }
  }, [])

  console.log("form Data------------", formData)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.email !== user.email) {
      alert("Email cannot be changed.");
      return;
    }
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // Make API call to update user profile
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log("id----------", userId)
      const response = await fetch(
        `http://127.0.0.1:8000/user-profiles/user_id/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        // Update the user state if needed
        setUser(updatedUser[0]);
        setIsLoading(false);
        toast.success("Profile updated successfully!");
      } else {
        setIsLoading(false);
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <Workspace>
        <div style={{ height: "100%", width: "100%" }}>
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
                  maxWidth: "300px",
                  height: "60px",
                  color: "white",
                  fontSize: "22px",
                }}
              >
                <h2 style={{ padding: "12px" }}>Edit Profile</h2>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                flex: "1",
                paddingBottom: "20px",
                paddingTop: "30px",
              }}
            >
              <form onSubmit={handleSubmit} style={{ marginLeft: "1%" }}>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <strong
                    style={{
                      fontSize: "20px",
                      padding: "15px",
                      width: "200px",
                    }}
                  >
                    Email <span style={{ float: "right" }}>:</span>
                  </strong>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      marginLeft: "15px",
                    }}
                    readOnly
                  />
                </div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <strong
                    style={{
                      fontSize: "20px",
                      padding: "15px",
                      width: "200px",
                    }}
                  >
                    Full Name <span style={{ float: "right" }}>:</span>
                  </strong>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      marginLeft: "15px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <strong
                    style={{
                      fontSize: "20px",
                      padding: "15px",
                      width: "200px",
                    }}
                  >
                    Phone <span style={{ float: "right" }}>:</span>
                  </strong>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      marginLeft: "15px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <strong
                    style={{
                      fontSize: "20px",
                      padding: "15px",
                      width: "200px",
                    }}
                  >
                    Address <span style={{ float: "right" }}>:</span>
                  </strong>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      marginLeft: "15px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <strong
                    style={{
                      fontSize: "20px",
                      padding: "15px",
                      width: "200px",
                    }}
                  >
                    Organization <span style={{ float: "right" }}>:</span>
                  </strong>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    style={{
                      fontSize: "18px",
                      padding: "15px",
                      marginLeft: "15px",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    fontSize: "18px",
                    padding: "10px 20px",
                    marginTop: "20px",
                    marginLeft: "215px",
                  }}
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Workspace>
    </div>
  );
}

export default EditProfile;
