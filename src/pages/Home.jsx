import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

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

  const handleDelete = async (postId) => {
    // optimistic update:
    const previousPosts = [...posts];
    setPosts(posts.filter((p) => p.id !== postId));
    setPostToDelete(null);
    //-------------------------
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Post removed successfully.");
    } catch (err) {
      // incase deletion fails server side, we have to roll back the ui due to the optimistic update:
      setPosts(previousPosts);

      toast.error("Deletion failed. Access denied.");
      console.error(err);
    }
  };

  const formatDate = (date) => {
    if (!date) return "JAN 01";
    const d = new Date(date);
    return `${d.toLocaleString("en-US", { month: "short" }).toUpperCase()} ${String(d.getDate()).padStart(2, "0")}`;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div className="px-2 sm:px-4 md:px-8 lg:px-60 py-8 sm:py-10 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1d1b19] mb-8 sm:mb-10 md:mb-12 font-['Space_Mono']  leading-10">
        Latest Entries
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-10 md:mb-12">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#fff8f5] border-2 border-[#1d1b19] overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="bg-[#e8e1de] border-b-2 border-[#1d1b19] h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden shrink-0">
              <img
                className="w-full h-full object-cover"
                src={post.image || "https://placehold.co/600x400"}
                alt={post.title}
              />
            </div>

            <div className="p-3 sm:p-3.5 md:p-4 flex flex-col gap-2 sm:gap-2.5 md:gap-3 grow">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs text-[#6f5b3c] font-medium font-['Source_Sans_3'] leading-4">
                  {formatDate(post.createdAt)}
                </span>
              </div>

              <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#1d1b19]  font-['Space_Mono'] leading-7 line-clamp-3">
                {post.title}
              </h2>

              <p className="text-sm sm:text-sm text-[#434840] line-clamp-2 leading-5 font-['Nimbus_Sans']">
                {post.description}
              </p>

              <div className="flex items-center justify-between gap-2 mt-auto pt-2 flex-wrap">
                <span className="text-xs text-[#6f5b3c] italic font-['Source_Sans_3'] min-w-0">
                  By {post.author}
                </span>

                {user && post.userId === user.id && (
                  <div className="flex gap-1.5 sm:gap-2 shrink-0">
                    <button
                      onClick={() => navigate(`/edit-post/${post.id}`)}
                      className="text-xs px-2 sm:px-2.5 py-1 border border-[#43643d] text-[#43643d] rounded hover:bg-[#43643d] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setPostToDelete(post.id)}
                      className="text-xs px-2 sm:px-2.5 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
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

      {posts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found.</p>
        </div>
      )}

      <input
        type="checkbox"
        id="delete_modal"
        className="modal-toggle"
        checked={!!postToDelete}
        onChange={() => setPostToDelete(null)}
      />
      <div className="modal" role="dialog">
        <div className="modal-box bg-white border-2 border-[#1d1b19] max-w-sm sm:max-w-md">
          <h3 className="text-lg font-bold text-[#1d1b19] font-['Space_Mono']">
            Confirm Deletion
          </h3>
          <p className="py-4 text-[#434840] text-sm">
            Are you sure you want to remove this post?
          </p>
          <div className="modal-action flex gap-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600 transition-colors cursor-pointer text-sm"
              onClick={() => handleDelete(postToDelete)}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 border-2 border-[#1d1b19] text-[#1d1b19] rounded cursor-pointer font-bold hover:bg-gray-100 transition-colors text-sm"
              onClick={() => setPostToDelete(null)}
            >
              Cancel
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="delete_modal">
          Close
        </label>
      </div>
    </div>
  );
}

export default Home;
