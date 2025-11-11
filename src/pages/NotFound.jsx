import React from "react";

const NotFound = () => {
  return (
    <div className="notfound-container bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white flex flex-col items-center justify-center h-screen">
      <h1 className="text-8xl font-extrabold tracking-widest">404</h1>
      <p className="text-xl mt-4 opacity-90">Page Not Found!</p>
      <span className="text-4xl mt-2">😢</span>

      <button
        className="mt-8 px-6 py-3 bg-white text-indigo-900 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
        onClick={() => (window.location.href = "/")}
      >
        Go Home
      </button>
    </div>
  );
};
export default NotFound;
