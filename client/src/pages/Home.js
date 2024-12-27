import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("logout");
    logout();
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen p-8">
      {/* Left Section */}
      <div className="text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-5xl font-extrabold text-indigo-600 tracking-widest mb-4">
          Welcome Home
        </h1>
        <p className="text-lg mb-2">Your personal hub awaits.</p>
        {user && (
          <h2 className="text-2xl font-semibold tracking-wide">
            Hello,{" "}
            <span className="text-indigo-500">
              {user.username.toUpperCase()}
            </span>
          </h2>
        )}
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="/chat"
          className="px-6 py-3 bg-indigo-500  font-semibold rounded-lg shadow hover:bg-indigo-600 transition"
        >
          Chat
        </a>
        <a
          href="/register"
          className="px-6 py-3 bg-green-600  font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          Register
        </a>
        <a
          href="/login"
          className="px-6 py-3 bg-orange-500  font-semibold rounded-lg shadow hover:bg-orange-600 transition"
        >
          Login
        </a>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-red-500  font-semibold rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
