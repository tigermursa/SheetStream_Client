export default async function getAllBlogs() {
  try {
    const result = await fetch("http://localhost:5000/api/v1/files/files", {
      next: {
        revalidate: 5,
      },
    });
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }
    return result.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return an empty array or handle it accordingly
  }
}

// cache:"no-store"  if want to show instant
