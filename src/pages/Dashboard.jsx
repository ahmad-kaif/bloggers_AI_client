// pages/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const backend_url_production="https://sentimental-blogs-backend.onrender.com";
  // const backend_url_development="http://localhost:8081";

  const fetchPosts = async () => {
    const res = await axios.get(`${backend_url_production}/posts/get`, {
      withCredentials: true,
    });
    setPosts(res.data);
  };

  const createPost = async (e) => {
    e.preventDefault();
    await axios.post(
      `${backend_url_production}/posts/create`,
      { title, content },
      { withCredentials: true }
    );
    setTitle("");
    setContent("");
    fetchPosts();
  };

  const deletePost = async (id) => {
    // console.log("Deleting post with ID:", id);
    await axios.delete(`${backend_url_production}/posts/delete/${id}`, {
      withCredentials: true,
    });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backend_url_production}/auth/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logout successful!");
      window.location.href = "/";
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="flex justify-between items-cente text-white bg-gray-900 p-4 rounded shadow mb-6 ">
        <h1 className="text-3xl font-bold mb-4">Sentimenatl Blogs 🧠</h1>
        <button onClick={handleLogout} className="text-blue-500 cursor-pointer">
          Logout
        </button>
      </div>

      <form
        onSubmit={createPost}
        className="text-white bg-gray-900 p-4 rounded shadow mb-6"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-3  rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Create Note
        </button>
      </form>

      {posts.map((post) => (
        <NoteCard key={post._id} post={post} onDelete={deletePost} />
      ))}

      {/* {console.log("posts", posts)} */}
    </div>
  );
}
