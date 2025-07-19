// pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const backend_url_production="https://sentimental-blogs-backend.onrender.com";
  const backend_url_development="http://localhost:8081";

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${backend_url_production}/auth/register`,
        // "http://localhost:8081/auth/register",
        { email, password },
        { withCredentials: true }
      );
      // console.log("Signup response:", res.data);
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
  
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "User already exists");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full cursor-pointer bg-indigo-600 text-white p-2 rounded"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
