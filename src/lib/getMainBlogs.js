export default async function getMainBlogs() {
  try {
    const result = await fetch("http://localhost:5000/api/v2/blogs/get");
    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }
    return result.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return an empty array o
  }
}
//method: "GET",
// headers: {
//     "Cache-Control": "no-store",
//   },
//   next: {
//     revalidate: 30,
//   },
