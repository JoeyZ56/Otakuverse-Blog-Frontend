"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Footer from "../../../components/Footer";
import ScrollTopBtn from "../../../components/ScrollTopBtn";
import { loader } from "../../../../public/images/index";

const createBlogPost = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    img: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("http://localhost:4000/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Post error:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Image src={loader} alt="loader" className="" width={40} height={40} />
      </div>
    );
  } else if (loading === false) {
    return (
      <>
        <div className="">
          <div className="">
            <h1>Community Posts</h1>
          </div>
          {form.map((data) => (
            <div className="" key={data._id}>
              <h1 className="">{data.title}</h1>
              <p className="">{data.desc}</p>
              <Link
                href={`/blog/${data._id}`}
                className=""
                key={data._id}
                id="links"
              >
                <motion.div
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, type: "tween" }}
                  className=""
                >
                  <Image
                    src={item.img}
                    alt="item"
                    width={400}
                    height={250}
                    className=""
                    id="image"
                  />
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
        <ScrollTopBtn />
      </>
    );
  }
};

export default createBlogPost;
