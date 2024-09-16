import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    console.log("user data", user);
  }, [user]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
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
          console.log("user data", userData[0]);
          setUser(userData[0]);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  

  return { user };
};
