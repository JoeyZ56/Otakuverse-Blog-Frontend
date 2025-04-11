"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("token"); //clears the jwt
    window.location.href = "/login";
  };
  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      <button
        className="font-medium text-gray-700 hover:text-purple-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </motion.div>
  );
};

export default Logout;
