"use client";
import { EmblaCarousel } from "../components/EmblaCarousel";
import Blog from "./(dashboard)/blog/page";

export default function Home() {
  return (
    <section className="min-h-screen py-10 bg-gray-50">
      <div className="px-4 mx-auto space-y-12 max-w-7xl">
        {/* Hero Carousel */}
        <div className="overflow-hidden shadow-md rounded-xl">
          <EmblaCarousel />
        </div>

        {/* Blog Posts */}
        <div>
          <Blog />
        </div>
      </div>
    </section>
  );
}
