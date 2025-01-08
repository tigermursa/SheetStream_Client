import { useEffect } from "react";
import { useRouter } from "next/router";

const ClearSession = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear sessionStorage
    sessionStorage.clear();

    // Clear the "access_token" cookie
    document.cookie = "access_token";

    // Navigate to the /auth/login page
    router.push("/auth/login");
  }, [router]); // Empty dependency array means it runs once when the component mounts

  return null; // The component doesn't render anything
};

export default ClearSession;
