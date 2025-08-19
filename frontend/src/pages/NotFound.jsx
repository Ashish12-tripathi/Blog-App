import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">
        Page Not Found
      </h2>
      <p className="text-gray-600 mt-2 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default PageNotFound;
