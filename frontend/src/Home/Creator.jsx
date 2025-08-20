import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Creator() {
  const [admin, setAdmin] = useState([]);
  console.log(admin);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("jwt"); // <-- define token here
        if (!token) {
          toast.error("You are not authorized");
          return;
        }

        const { data } = await axios.get(
          "https://blog-app-1-8j9g.onrender.com/api/users/admins",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(data.admins);
        setAdmin(data.admins);
      } catch (error) {
        console.log("Failed to fetch admins:", error);
        toast.error(error.response?.data?.message || "Failed to fetch admins");
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div key={element._id} className="text-center">
              <img
                src={element.photo.url}
                alt={element.name}
                className="md:w-56 md:h-56 object-cover border border-black rounded-full mx-auto"
              />
              <p className="mt-2">{element.name}</p>
              <p className="text-gray-600 text-xs">{element.role}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No creators available</p>
        )}
      </div>
    </div>
  );
}

export default Creator;
