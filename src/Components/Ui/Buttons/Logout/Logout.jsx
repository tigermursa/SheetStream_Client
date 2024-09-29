"use client";

import { useState } from "react";
import BASE_URL from "@/utils/BaseUrl";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      // Call the logout API
      const response = await fetch(`${BASE_URL}/api/v2/auth/logout`, {
        method: "POST",
        credentials: "include", // This is important for cookies
      });

      if (response.ok) {
        // Redirect the user to the login page after logout
        router.push("/auth/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`text-gray-50 bg-secondary p-2 rounded-lg mt-3 font-semibold shadow-lg shadow-gray-500 ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
  
};

export default Logout;
