"use client";
import { motion, AnimatePresence } from "framer-motion";
import TextAnim from "./components/TextAnim";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from './UserContext';  // Import context hook

export default function Home() {

  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const inViewAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  const router = useRouter();
  const { login } = useUserContext();
  // Set up the IntersectionObserver to detect when the section is in view
  useEffect(() => {
    if (login) {
      router.push("/home");
      return; // Skip the observer logic if already logged in
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);  // Update state when the section enters/exits the viewport
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current); // Start observing the section
    }

    // Cleanup the observer when component unmounts
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current); // Stop observing
      }
    };
  }, []);
  return (
    <div className="flex flex-col items-center min-h-[80vh] w-full mt-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={inViewAnimation}
        viewport={{ once: true }}
        className="text-white mt-20 max-w-4xl mx-auto text-center"
      >
        <h1 className="text-6xl md:text-5xl font-bold mb-6">
          <TextAnim text={"Welcome to Nameee"}/>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Description.
        </p>
      </motion.div>
      <div
        className="flex flex-row justify-center items-center gap-10"
      >
        <button className="hover:scale-120 transition-all duration-200 bg-transparent border-2 border-white  px-4 pb-2 pt-3 rounded-xl shadow-lg">
          <Link href={"/login"}>
            <h2 className="text-2xl font-semibold mb-2">Login</h2>
          </Link>
        </button>
        <button className="hover:scale-120 transition-all duration-200 bg-transparent border-2 border-white  px-4 pb-2 pt-3 rounded-xl shadow-lg">
          <Link href={"/signup"}>
            <h2 className="text-2xl font-semibold mb-2">Signup</h2>
          </Link>
        </button>
      </div>


    </div>
  );
}
