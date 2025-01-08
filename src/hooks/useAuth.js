import { useState, useEffect } from "react";

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data from sessionStorage
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      // Parse the user data from the JSON string
      const [email, username, _id] = JSON.parse(storedUser);
      setUser({ email, username, _id });
    }
  }, []);

  return user;
}

export default useAuth;
