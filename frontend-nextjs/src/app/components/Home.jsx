"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import TextAnim from "./TextAnim";
import Pricing from "./Pricing";
import { useRouter } from "next/navigation"; // ← Import this


export default function Home() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const [file, setFile] = useState(null);
  const router = useRouter(); // ← Initialize router


  const inViewAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("PDF uploaded and processed!");
        router.push("/dashboard"); // ← Redirect on success

      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error during upload.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] w-full mt-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={inViewAnimation}
        viewport={{ once: true }}
        className="text-white mt-20 max-w-4xl mx-auto text-center"
      >
        <h1 className="text-[100px] font-bold mb-6">
          <TextAnim text={"hello"} />
        </h1>
        <p className="text-[20px] mb-8">Description</p>
      </motion.div>

      <div className="flex flex-col gap-4 items-center">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="text-white"
        />
        <button
          onClick={handleUpload}
          className="hover:scale-105 transition-all duration-200 bg-white border-2 px-4 pb-2 pt-3 rounded-xl shadow-lg text-black hover:border-white hover:bg-transparent hover:text-white"
        >
          <h2 className="text-2xl font-semibold">Upload</h2>
        </button>
      </div>

      <Pricing />
    </div>
  );
}
