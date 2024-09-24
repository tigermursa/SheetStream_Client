export default async function getAllBlogs() {
  try {
    const response = await fetch("https://sheetstream-server.onrender.com/api/v1/files/files", {
      method: "GET",
      cache: "no-store", // Disable caching
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Parse response as JSON
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return []; // Return an empty array in case of error
  }
}
