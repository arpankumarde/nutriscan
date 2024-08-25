import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl text-center mb-4">Coming Soon</h1>
      <p className="text-2xl text-center mb-8">
        We're working hard to bring you an amazing experience.
      </p>
      <Link
        to="/"
        className="text-blue-500 font-bold border-2 border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
