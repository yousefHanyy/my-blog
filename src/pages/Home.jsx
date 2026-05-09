import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-100">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <div className="p-10">
      <div className="flex justify-between gap-4 flex-wrap  ">
        {posts.map((post) => (
          <div
            key={post.id}
            className="card bg-base-100 w-96 shadow-sm hover:transition hover:shadow-lg"
          >
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.description}</p>
              <div className="card-actions justify-end">
                <span className="badge badge-outline">By {post.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
