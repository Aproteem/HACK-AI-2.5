// components/AboutUs.tsx
'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutUs() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 text-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/80 rounded-2xl shadow-lg p-10 space-y-6"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-center text-blue-500"
        >
          About Us
        </motion.h2>

        <motion.p variants={itemVariants} className="text-lg leading-relaxed">
          We’re <span className="font-semibold text-blue-500">FinSight AI</span> — a passionate group of builders brought together by the HackAI 2025 hackathon and a shared curiosity around what’s possible when AI meets real-world problems.
        </motion.p>

        <motion.p variants={itemVariants} className="text-lg leading-relaxed">
          Our team — <strong>Aproteem</strong>, <strong>Sifat</strong>, <strong>Aalvee</strong>, and <strong>Arnab</strong> — dove deep into the challenge of making complex financial documents more accessible. What started as a prompt about PDFs turned into <strong>Project X</strong>, an intelligent assistant that can parse, summarize, and visualize annual reports in real-time.
        </motion.p>

        <motion.p variants={itemVariants} className="text-lg leading-relaxed">
          Along the way, we discovered that AI isn’t magic — it’s engineering, iteration, and persistence. We explored tools like <strong>GPT-4</strong>, <strong>LangChain</strong>, <strong>LlamaIndex</strong>, and <strong>Unstructured.io</strong>, and learned how to balance accuracy, speed, and usability.
        </motion.p>

        <motion.p variants={itemVariants} className="text-lg leading-relaxed">
          This project pushed our limits, taught us how to think critically, and showed us what a small team with big ideas can do in a short time. We’re proud of what we built — and even more excited about where it can go next.
        </motion.p>
      </motion.div>
    </section>
  )
}
