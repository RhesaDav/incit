import { FaExclamationTriangle } from 'react-icons/fa';

export default function Error500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4">
      <FaExclamationTriangle className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold mb-2">500 - Internal Server Error</h1>
      <p className="text-lg text-gray-600 mb-4">
        Oops! Something went wrong on our end. Please try again later.
      </p>
      <a href="/" className="text-primary font-semibold hover:underline">
        Go back to the homepage
      </a>
    </div>
  );
}
