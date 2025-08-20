import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // token should be let type variable because its value will change in every login. (in backend also)
         let token = localStorage.getItem("jwt"); // <-- define token here
        
        console.log(token);
        if (token) {
          const { data } = await axios.get(
            "https://blog-app-1-8j9g.onrender.com/api/users/my-profile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) return;
        const { data } = await axios.get(
          "https://blog-app-1-8j9g.onrender.com/api/blogs/all-blogs",
          {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
            }
        );
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);