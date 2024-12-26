import React from "react";

function Home() {
  return (
    <div className="flex justify-between text-center align-center min-h-screen">
      <div>
        <h1 className="text-4xl font-bold">Home</h1>
        <p className="text-xl font-semibold">Welcome to the home page</p>
      </div>
      <div>
        <button className="p-4 mx-3 border bg-blue-500 text-white">
          <a href="/chat">Chat</a>
        </button>
        <button className="p-4 border bg-blue-500 text-white">
          <a href="/register">Register</a>
        </button>
      </div>
    </div>
  );
}

export default Home;
