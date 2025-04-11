"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "../../../components/DragAndDropImage";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
  });
  const [postImage, setPostImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!postImage) {
      console.warn("No image selected");
      setError(true);
      setLoading(false);
      return;
    }

    setError(false);

    try {
      const token = localStorage.getItem("token");
      console.log("Image file to upload:", postImage);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      formData.append("img", postImage); // Attach image file

      const res = await fetch("http://localhost:4000/api/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseBody = await res.text();
      console.log("Response:", res.status, responseBody);

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Post creation failed");
      }

      // router.push("/#Posts");
    } catch (err) {
      console.error("Create post error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-purple-700">
          Create a Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            onChange={handleChange}
            placeholder="Post Title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="excerpt"
            type="text"
            onChange={handleChange}
            placeholder="Excerpt"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            name="content"
            onChange={handleChange}
            placeholder="Write your post content..."
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <ImageUploader
            onFileSelect={(file) => setPostImage(file)}
            label="Upload Post Image"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold text-white transition bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Publish Post"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-center text-red-500">
            An error occurred while creating the post!
          </p>
        )}
      </div>
    </div>
  );
}
