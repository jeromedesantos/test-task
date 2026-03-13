import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>

        <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>

        <p className="text-gray-500 mt-2">
          The page you are looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};
