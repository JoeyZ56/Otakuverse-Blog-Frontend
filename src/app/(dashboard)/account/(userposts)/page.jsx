"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const UserPosts = () => {
  const [auth, setAuth] = useState({ token: null, userId: null });
  const [userPosts, setUserposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState(""); // Store the user's name

  const fetchUserPosts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:4000/api/post/${auth.userId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const data = await res.json();
      setUserposts(data.posts);
      setUserName(data.name);
    } catch (error) {
      console.error("Failed to fetch user data from the backend", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // const fetchUserData = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:4000/api/post/${auth.userId}`, {
  //       headers: { Authorization: `Bearer ${auth.token}` },
  //     });

  //     const data = await res.json();
  //     setUserName(data.name); // Set the user's name from the response
  //   } catch (error) {
  //     console.error("Failed to fetch user data", error);
  //   }
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      router.push("/login");
      return;
    }

    setAuth({ token, userId });
  }, []);

  useEffect(() => {
    if (auth.token && auth.userId) {
      //fetchUserData(); // Fetch user data (name)
      fetchUserPosts(); // Fetch user posts
    }
  }, [auth]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <ClipLoader color="#9333EA" size={200} />
        </div>
      ) : error ? (
        <div className="mt-6 text-center text-red-500">
          Failed to load posts.
        </div>
      ) : (
        <>
          <div className="max-w-6xl px-4 py-10 mx-auto">
            <h1 className="mb-10 text-3xl font-bold text-center text-purple-700">
              {`${userName}'s Posts`}
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-[1.02]"
                >
                  <Link href={`/blog/${post._id}`} className="block">
                    <motion.div
                      whileInView={{ opacity: 1 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={`data:${post.img.contentType};base64,${Buffer.from(
                          post.img.data.data
                        ).toString("base64")}`}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="object-cover w-full h-48"
                      />
                    </motion.div>
                    <div className="p-4">
                      <h2 className="mb-2 text-xl font-semibold text-gray-800">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserPosts;
