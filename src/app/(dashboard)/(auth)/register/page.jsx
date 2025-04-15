"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/DragAndDropImage";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("profileImage", userImage);

      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      if (res.status === 201) {
        router.push("/login?success=Account has been created");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Register error:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-purple-700">
          Register Today!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {error && <p className="font-bold text-red-500">* {error}</p>}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute text-sm text-purple-600 -translate-y-1/2 top-1/2 right-3 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute text-sm text-purple-600 -translate-y-1/2 top-1/2 right-3 hover:underline"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <ImageUploader
            onFileSelect={(file) => setUserImage(file)}
            label="Upload Profile Image"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold text-white transition bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-center text-red-500">
            An error occurred while registering!
          </p>
        )}

        <p className="mt-6 text-sm text-center">
          Already a user?{" "}
          <Link href="/login" className="text-purple-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
