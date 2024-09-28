"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import BASE_URL from "@/utils/BaseUrl";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // For navigation

  const handleLogout = async () => {
    try {
      setLoading(true);

      // Call the logout API using SWR's mutate
      await fetch(`${BASE_URL}/api/logout`, {
        method: "POST",
      });

      // Redirect the user to the login page after logout
      router.push("/login");
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
        className={`text-red-500 ${loading ? "opacity-50" : ""}`}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Logout;
