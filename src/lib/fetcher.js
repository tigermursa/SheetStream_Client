export const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error fetching data: ${error}`);
  }
  return response.json();
};
