export default async function getAllBlogs() {
  try {
    const result = await fetch(
      "https://sheetstream-server.vercel.app/api/v1/files/files",
      {
        next: {
          revalidate: 120,
        },
      }
    );
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }
    return result.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return an empty array or handle it accordingly
  }
}
