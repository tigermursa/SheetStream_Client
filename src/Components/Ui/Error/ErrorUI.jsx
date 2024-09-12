import React from "react";

const ErrorUI = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100">
      <div className="text-center max-w-lg p-8">
        <h1 className="text-9xl font-extrabold text-red-500">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-lg mb-6">
          We can't seem to find the page you're looking for. It may have been
          moved or deleted.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-gray-800 text-gray-100 hover:bg-gray-700 focus:ring-2 focus:ring-red-500 rounded-md transition duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorUI;
