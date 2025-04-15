"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const BlogPost = () => {
  const [post, setPost] = useState(null);

  const params = useParams();
  const postId = params?.id;

  useEffect(() => {
    const getPostById = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/post/${postId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error(`Failed to fetch post. Status: ${res.status}`);
          return;
        }

        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (postId) {
      getPostById();
    }
  }, [postId]);

  if (!post) {
    return <p className="py-10 text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl px-4 py-10 mx-auto space-y-8">
      {/* Author Section */}
      <div className="flex items-center space-x-4">
        {post.profileImage && (
          <Image
            src={`data:image/png;base64,${Buffer.from(
              post.profileImage.data.data
            ).toString("base64")}`}
            alt="User"
            width={60}
            height={60}
            className="object-cover border rounded-full"
          />
        )}
        <span className="text-lg font-medium text-gray-700">
          {post.username}
        </span>
      </div>

      {/* Post Title & Excerpt */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-purple-700">
          {post.title}
        </h1>
        <h3 className="text-lg text-gray-600">{post.excerpt}</h3>
      </div>

      {/* Post Image */}
      {post.img && (
        <div className="w-full h-[300px] relative overflow-hidden rounded-lg shadow-md">
          <Image
            src={`data:${post.img.contentType};base64,${Buffer.from(
              post.img.data.data
            ).toString("base64")}`}
            alt="Post Image"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Post Content */}
      <div className="prose text-gray-800 max-w-none">
        <p>{post.content}</p>
      </div>

      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-block px-5 py-2 font-medium text-white transition bg-purple-600 rounded hover:bg-purple-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
