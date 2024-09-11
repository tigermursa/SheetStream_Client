export default async function getSingleBlogs({ id }) {
  const result = await fetch(`http://localhost:5000/api/v1/files/single/${id}`);
  return result.json();
}
