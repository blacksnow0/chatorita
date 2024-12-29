import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import background from "../Assets/background.jpeg";
import snoop from "../Assets/snoop.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col md:flex-row gap-4 px-4 py-6">
      {/* Left Section with Background Image */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center rounded-3xl shadow-lg relative overflow-hidden"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex flex-col justify-center items-center h-full bg-black bg-opacity-60 text-white p-6">
          {user && (
            <h1 className="text-3xl text-white  drop-shadow-lg mb-4 font-bold tracking-wider">
              {user.username.toUpperCase()} 
            </h1>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wide drop-shadow-lg">
            Discover Connections
          </h1>
          <p className="text-base md:text-lg text-gray-100 max-w-md text-center leading-relaxed">
            Your personal hub for chatting, connecting, and staying in touch
            with the world.
          </p>
          <div className="mt-6">
            <a
              href="/chat"
              className="drop-shadow-xl inline-block px-6 py-3 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 transition-all"
            >
              Start Chatorita
            </a>
          </div>
        </div>
      </div>

      {/* Right Section with Border and Content */}
      <div className="relative w-full md:w-1/2 bg-white border-2 border-gray-200 rounded-3xl shadow-lg flex items-center mb-10">
        {/* Small Container for 'Find Friends' */}
        <div className="absolute top-10 left-10 bg-indigo-100 border border-indigo-300 rounded-lg shadow-md px-8 py-6 flex flex-col items-center gap-2 hidden xl:flex">
          <button onClick={() => navigate("/login")}>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className="text-3xl text-indigo-500"
              />
              <img
                src={snoop}
                alt="Snoop Dogg"
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
          </button>
          <p className="text-indigo-600 font-semibold drop-shadow-lg">
            CONNECT
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8 text-center w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-indigo-600 mb-6 drop-shadow-lg tracking-widest">
            Welcome To Chatorita
          </h1>
          <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
            Your ultimate platform to connect with friends and family. Stay
            updated with your favorite communities and explore endless
            possibilities in a single space.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
