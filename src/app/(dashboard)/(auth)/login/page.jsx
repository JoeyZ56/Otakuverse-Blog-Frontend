"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();

  useEffect(() => {
    const err = params.get("error");
    const msg = params.get("success");

    if (err) setError(err);
    if (msg) setSuccess(msg);
  }, [params]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error: Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl">
        <h1 className="mb-6 text-2xl font-bold text-center text-purple-700">
          Welcome Back!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="text"
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold text-white transition bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}
        </form>

        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, type: "tween" }}
          className="mt-6 text-center"
        >
          <Link
            href="/register"
            className="text-sm text-purple-600 hover:underline"
          >
            Create new account
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
