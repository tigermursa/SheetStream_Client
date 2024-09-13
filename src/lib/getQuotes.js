export default async function getQuotes() {
  try {
    const result = await fetch("https://api.adviceslip.com/advice", {
      cache: "no-cache",
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
