"use client";
import { motion, AnimatePresence } from "framer-motion";
import TextAnim from "./components/TextAnim";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from './UserContext';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { login } = useUserContext();

  useEffect(() => {
    setIsMounted(true);
    if (login) {
      router.push("/home");
    }
  }, [login, router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-row w-full items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col items-center pb-[10vh] w-[70vw] mt-10 bg-black/50 rounded-[100px] border-black shadow-2xl shadow-white border-4"
      >
        <motion.div
          variants={itemVariants}
          className="text-white mt-20 max-w-4xl mx-auto text-center"
        >
          <h1 className="text-zinc-300 text-[70px] font-bold mb-6">
            <TextAnim text={"Welcome to FinSight"} />
          </h1>
          <motion.p
            variants={itemVariants}
            className="font-bold px-10 text-zinc-400/70 text-center text-md md:text-lg mb-8"
          >
            FinSight is your intelligent companion for analyzing annual financial reports.
            It leverages AI to instantly generate summaries, insights, and key metrics.
            Skip the hours of reading and go straight to the data that matters.
            
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-row justify-center items-center gap-10"
        >
          <motion.button
            whileHover={{ scale: 1.05, opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            className=" text-blue-600 bg-white border-none border-white px-4 py-2 rounded-xl shadow-lg"
          >
            <Link href={"/login"}>
              <h2 className="text-lg   font-semibold">Login</h2>
            </Link>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            className="border-none bg-blue-500 px-4 py-2 rounded-xl shadow-lg"
          >
            <Link href={"/signup"}>
              <h2 className="text-lg text-white font-semibold">Signup</h2>
            </Link>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}