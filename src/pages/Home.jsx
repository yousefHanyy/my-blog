import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load posts.");
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const confirmDelete = (postId) => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p className="mb-2 font-bold">Delete this post?</p>
          <div className="flex gap-2">
            <button
              className="btn btn-xs btn-error"
              onClick={() => {
                handleDelete(postId);
                closeToast();
              }}
            >
              Confirm
            </button>
            <button className="btn btn-xs btn-ghost" onClick={closeToast}>
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false },
    );
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Post removed successfully.");
    } catch (err) {
      toast.error("Deletion failed. Access denied.");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-100">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Blog Posts</h1>
      <div className="flex justify-center gap-6 flex-wrap">
        {posts.map((post) => (
          <div
            key={post.id}
            className="card bg-base-100 w-96 shadow-sm hover:transition hover:shadow-lg border border-base-200"
          >
            <figure>
              <img
                className="h-48 w-full object-cover"
                src={post.image || "https://placehold.co/600x400"}
                alt={post.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="line-clamp-3">{post.description}</p>

              <div className="card-actions justify-between items-center mt-4">
                <span className="badge badge-outline">By {post.author}</span>

                {user && post.userId === user.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-post/${post.id}`)}
                      className="btn btn-xs btn-info btn-outline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(post.id)}
                      className="btn btn-xs btn-error btn-outline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
