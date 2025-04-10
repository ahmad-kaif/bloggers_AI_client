import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to Sentiment Notes 📝
        </h1>
        <p className="mb-6">Write, analyze, and feel your thoughts.</p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-white text-indigo-600 rounded-md font-semibold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 border border-white rounded-md"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
