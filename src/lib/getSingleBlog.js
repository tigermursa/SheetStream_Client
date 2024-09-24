export default async function getSingleBlogs(id) {
  try {
    const response = await fetch(
      `https://sheetstream-server.onrender.com/api/v1/files/single/${id}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching blog: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return { error: error.message };
  }
}

