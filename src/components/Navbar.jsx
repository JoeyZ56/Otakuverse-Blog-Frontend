"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Logout from "./Logout";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //Checks if token exists in localStorage
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); //Set to true if token exists
    };

    checkToken();

    //  watch for storage changes (E.G. logout in another tab)
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return (
    <nav
      className="flex items-center justify-between w-full px-6 py-4 bg-white shadow-md"
      id="nav"
    >
      {/* Logo */}
      <motion.div
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-purple-800"
          id="logo"
        >
          OtakuVerse
        </Link>
      </motion.div>

      <div className="flex items-center space-x-6">
        {isLoggedIn && (
          <>
            <Link
              href="/createpost"
              className="font-medium text-gray-700 hover:text-purple-700"
            >
              Create Post
            </Link>
            <Link
              href="/account"
              className="font-medium text-gray-700 hover:text-purple-700"
            >
              Account
            </Link>
            <Logout />
          </>
        )}

        {isLoggedIn === false && (
          <>
            <Link
              href="/register"
              className="font-medium text-gray-700 hover:text-purple-700"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="font-medium text-gray-700 hover:text-purple-700"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
