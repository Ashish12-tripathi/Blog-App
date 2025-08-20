import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function MyBlogs() {
  const navigateTo = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
         const token = localStorage.getItem("jwt"); // <-- define token here
        if (!token) {
          toast.error("You are not authorized");
          return;
        }
        const { data } = await axios.get(
          "https://blog-app-1-8j9g.onrender.com/api/blogs/my-blog",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setMyBlogs(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch your blogs");
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        toast.error("You are not authorized");
        return;
      }

      const res = await axios.delete(
        `https://blog-app-1-8j9g.onrender.com/api/blogs/delete/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message || "Blog deleted successfully");
      setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <Link
                to={`/blog/${element._id}`}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
                key={element._id}
              >
                {element?.blogImage && (
                  <img
                    src={element?.blogImage?.url}
                    alt="blogImg"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">{element.category}</span>
                  <h4 className="text-xl font-semibold my-2">{element.title}</h4>
                  <div className="flex justify-between mt-4">
                    <Link
                      to={`/blog/update/${element._id}`}
                      className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element._id)}
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
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
