// pages/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:8080/posts/get", {
      withCredentials: true,
    });
    setPosts(res.data);
  };

  const createPost = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8080/posts/create",
      { title, content },
      { withCredentials: true }
    );
    setTitle("");
    setContent("");
    fetchPosts();
  };

  const deletePost = async (id) => {
    console.log("Deleting post with ID:", id);
    await axios.delete(`http://localhost:8080/posts/delete/${id}`, {
      withCredentials: true,
    });
    fetchPosts();
  };

  // const editPost = async (id)=>{
  //   await axios.put(`http://localhost:8080/posts/update/${id}`, { title, content }, { withCredentials: true });
  //   fetchPosts();
  // }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogout = async () => {
    // await axios.get("http://localhost:8080/auth/logout", {
    //   withCredentials: true,
    // });
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-6 ">
      <h1 className="text-3xl font-bold mb-4">Dashboard 🧠</h1>
      <button onClick={handleLogout} className="text-blue-500 cursor-pointer">Logout</button>
      </div>
    

      <form onSubmit={createPost} className="bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
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
