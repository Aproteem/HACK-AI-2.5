"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import TextAnim from "./TextAnim";
import Pricing from "./Pricing";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const router = useRouter();

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
    setSelectedFile(e.target.files[0]);
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
        setShowLoading(true);
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              router.push("/dashboard");
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error during upload.");
    }
  };

  if (showLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 text-white">
        <div className="mb-4 animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white" />
        <p className="text-xl mt-4">Processing your PDF...</p>
        <p className="text-lg text-white/70 mt-2">Estimated time left: {countdown}s</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[80vh] w-full ">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={inViewAnimation}
        viewport={{ once: true }}
        className="text-white max-w-4xl mx-auto text-center"
      >
        <h1 className="text-[60px] font-bold mb-2">
          <TextAnim text={"Upload documents to use our LLM-based AI analyzer"} />
        </h1>
        <p className="text-[24px] text-white/80 mb-8">From executive overviews to financial highlights, FinSight makes it simple.</p>
      </motion.div>

      <div className="flex flex-col items-center gap-6">
        {/* File Input with Custom Styling */}
        <label className="flex flex-col items-center px-4 py-6 bg-white/10 rounded-xl border-2 border-dashed border-white/30 hover:bg-white/20 transition-all duration-200 cursor-pointer w-full max-w-md">
          <svg className="w-12 h-12 mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-white text-lg font-medium mb-1">Choose PDF File</span>
          <span className="text-white/70 text-sm">
            {selectedFile ? selectedFile.name : "No file chosen"}
          </span>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className={`px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
            selectedFile
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-500 cursor-not-allowed text-gray-200"
          }`}
        >
          Upload PDF
        </button>
      </div>

      <Pricing />
    </div>
  );
}
