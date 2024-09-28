export const fetcher = async (url) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
  
  const res = await fetch(url, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
};
