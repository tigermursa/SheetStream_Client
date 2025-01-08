import BASE_URL from "@/utils/BaseUrl";

export default async function loginUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/v2/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      // Get the JWT token from the response (assuming the backend sends the token back in the response)
      const token = data.token;

      // Set the cookie from the frontend
      document.cookie = `access_token=${token}; path=/; max-age=${
        60 * 60 * 24
      }; secure=true; samesite=strict;`;

      // Save the user data in sessionStorage as an array
      const user = [data.email, data.username, data._id];
      sessionStorage.setItem("user", JSON.stringify(user));

      console.log("can u see me", data);
      return data; // User login successful, return the data
    } else {
      // Handle error
      return { error: data.message };
    }
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
