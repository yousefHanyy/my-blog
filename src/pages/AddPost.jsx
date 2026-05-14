import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

function AddPost() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:5000/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setImage(res.data.image);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch post details.");
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      toast.warn("Please login to manage posts.");
      navigate("/login");
      return;
    }

    try {
      const postData = {
        title,
        description,
        image,
        author: user.name,
        userId: user.id,
        createdAt: new Date().toISOString(),
      };

      if (isEdit) {
        await axios.put(`http://localhost:5000/posts/${id}`, postData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Post updated successfully!");
      } else {
        await axios.post("http://localhost:5000/posts", postData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Post created successfully!");
      }
      navigate("/");
    } catch (err) {
      toast.error(isEdit ? "Update failed." : "Creation failed.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center  px-2 sm:px-4 py-8">
      <div className="w-full max-w-sm md:max-w-md bg-[#fff8f5] border-2 border-[#1d1b19] overflow-hidden">
        <div className="h-2 bg-[#1d1b19] pattern-dots"></div>

        <div className="p-6 md:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1d1b19] mb-2 font-['Space_Mono']">
              {isEdit ? "Update Entry" : "Create Entry"}
            </h1>
            <p className="text-sm text-[#434840] font-['Source_Sans_3']">
              {isEdit
                ? "Modify your post details."
                : "Share your thoughts with the world."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <div>
              <label className="block text-xs md:text-sm font-bold text-[#43643d] uppercase tracking-wide mb-2 font-['Source_Sans_3']">
                Title
              </label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                className="w-full px-3 py-2 md:py-3 border-2 border-[#1d1b19] text-sm text-[#1d1b19] placeholder-gray-400 focus:outline-none focus:bg-[#e8e1de]"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-[#43643d] uppercase tracking-wide mb-2 font-['Source_Sans_3']">
                Description
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your post content..."
                rows="5"
                className="w-full px-3 py-2 md:py-3 border-2 border-[#1d1b19] text-sm text-[#1d1b19] placeholder-gray-400 focus:outline-none focus:bg-[#e8e1de] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-[#43643d] uppercase tracking-wide mb-2 font-['Source_Sans_3']">
                Image URL
              </label>
              <input
                required
                type="url"
                value={image || "https://placehold.co/600x400"}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 md:py-3 border-2 border-[#1d1b19] text-sm text-[#1d1b19] placeholder-gray-400 focus:outline-none focus:bg-[#e8e1de]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 md:py-4 bg-[#43643d] border-2 border-[#1d1b19] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#354c2d] transition-colors font-['JetBrains_Mono'] cursor-pointer mt-6 md:mt-8"
            >
              {isEdit ? "Update Post" : "Publish Entry"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5 md:my-6">
            <div className="flex-1 h-0.5 bg-[#1d1b19]"></div>
            <span className="text-xs text-[#6f5b3c] font-['Source_Sans_3']">
              or
            </span>
            <div className="flex-1 h-0.5 bg-[#1d1b19]"></div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-2 md:py-3 border-2 border-[#1d1b19] text-[#1d1b19] font-bold uppercase text-sm tracking-wide hover:bg-gray-100 transition-colors font-['JetBrains_Mono'] cursor-pointer"
          >
            Back to Articles
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
