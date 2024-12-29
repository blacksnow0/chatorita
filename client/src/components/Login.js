import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate login request (replace with your API logic)
    try {
      await login(formData);
      alert("Login success");
      navigate("/chat");
    } catch (err) {
      setError("Invalid username or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        {error && (
          <p className="mt-2 text-lg text-center text-orange-500">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2  bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none  ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center ">
          Don't have an account?{" "}
          <a href="/register" className="hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
