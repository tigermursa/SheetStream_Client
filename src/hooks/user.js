"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode"; // Import jwt-decode

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data if access token exists
    const fetchUser = async () => {
      const token = Cookies.get("access_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Decode the JWT to extract the user ID
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded); // Log decoded token

        const userId = decoded.id; // Get user ID from the token

        const response = await fetch(
          `http://localhost:5000/api/v3/user/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        console.log("Fetched user data:", data); // Log fetched user data
        setUser(data);
      } catch (error) {
        console.log("Error fetching user:", error); // Log error
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    Cookies.remove("access_token"); // Remove the token
    setUser(null); // Clear the user state
  };

  return { user, loading, error, logout };
}
