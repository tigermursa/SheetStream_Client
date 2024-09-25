import BASE_URL from "@/utils/BaseUrl";

export default async function loginUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/v2/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching
      body: JSON.stringify(userData), // Send form data
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
