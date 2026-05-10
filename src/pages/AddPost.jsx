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
    <div className="flex justify-center mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-200 w-full max-w-md shadow-xl p-6 border border-base-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isEdit ? "Edit Post" : "Add New Post"}
        </h2>

        <label className="label font-semibold">Title</label>
        <input
          required
          type="text"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label font-semibold">Description</label>
        <textarea
          required
          className="textarea textarea-bordered h-24 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label className="label font-semibold">Image URL</label>
        <input
          required
          type="url"
          className="input input-bordered w-full"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />

        <button type="submit" className="btn btn-primary mt-6 w-full">
          {isEdit ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default AddPost;
