import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function MyBlogs() {
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      let token = localStorage.getItem("jwt");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.get(
          "https://blog-app-1-8j9g.onrender.com/api/blogs/my-blog",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setMyBlogs(data);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("jwt");
          navigate("/login");
        } else {
          console.log(error);
        }
      }
    };

    fetchMyBlogs();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      toast.error("You are not authorized");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.delete(
        `https://blog-app-1-8j9g.onrender.com/api/blogs/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success(res.data.message || "Blog deleted successfully");
      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("jwt");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete blog");
      }
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
        {myBlogs.length > 0 ? (
          myBlogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              key={blog._id}
            >
              {blog.blogImage && (
                <img
                  src={blog.blogImage.url}
                  alt="blog"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <span className="text-sm text-gray-600">{blog.category}</span>
                <h4 className="text-xl font-semibold my-2">{blog.title}</h4>
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/blog/update/${blog._id}`}
                    className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                  >
                    UPDATE
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">
            You have not posted any blog yet!
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
