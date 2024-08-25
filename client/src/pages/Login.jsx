import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-lg mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-lg mb-4"
        />
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white p-2 rounded-lg w-32 mb-4"
        >
          Login
        </Link>
        <Link to="/signup" className="text-blue-500">
          Signup
        </Link>
      </form>
    </div>
  );
};

export default Login;
