import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-primaryDark to-primary flex flex-col items-center justify-center text-white">
      <h2 className="text-6xl font-bold mb-4 animate-pulse">404 - Not Found</h2>
      <p className="text-lg mb-6  text-secondary font-semibold">Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.</p>
      <Link href="/">
        <p className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-primary hover:text-white transition-all duration-300">
          Return Home
        </p>
      </Link>
    </div>
  );
}
