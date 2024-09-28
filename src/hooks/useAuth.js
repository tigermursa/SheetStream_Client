import useSWR from "swr";

export const fetcher = async (url) => {
  const res = await fetch(url, {
    credentials: "include", // Ensures cookies are included in the request
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

export function useAuth() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/v3/user/me",
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return { user: null, isLoading: true, isError: false };
  }

  if (error) {
    return { user: null, isLoading: false, isError: true };
  }

  return { user: data, isLoading: false, isError: false };
}
