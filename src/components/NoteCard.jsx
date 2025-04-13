export default function NoteCard({ post, onDelete }) {
  return (
    <div className="text-white bg-gray-900 p-4 rounded shadow mb-4">
      <h3 className="text-xl font-bold">
        {post.title} {post.mood}
      </h3>
      <p className="text-gray-500 text-xs">
        {new Date(post.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>

      <p className="text-gray-700 mt-1">{post.content}</p>
      <div className="mt-2 flex justify-end space-x-2">
        {/* Add Edit Button Here if needed */}
        <button
          onClick={() => onDelete(post._id)}
          className="text-red-500 text-sm cursor-pointer"
        >
          Delete
        </button>
        {/* <button onClick={() => onEdit(post._id)} className="text-blue-500 text-sm">Edit</button> */}
      </div>
    </div>
  );
}
