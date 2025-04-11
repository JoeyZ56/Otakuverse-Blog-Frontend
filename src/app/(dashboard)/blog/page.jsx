"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const GetBlogPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:4000/api/post");
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <ClipLoader color="#9333EA" size={200} />
        </div>
      ) : (
        <>
          <div className="max-w-6xl px-4 py-10 mx-auto">
            <h1 className="mb-10 text-3xl font-bold text-center text-purple-700">
              Community Posts
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
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

export default GetBlogPost;
