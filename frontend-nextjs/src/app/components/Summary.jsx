"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useUserContext } from "../UserContext";

// import RiskMeter from './RiskMeter';
import { motion, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CARD_WIDTH = 280; // 260px + padding/gap
const VISIBLE_COUNT = 2;

const Summary = () => {
  const { setChatbot } = useUserContext();
  const [shortDescription, setShortDescription] = useState('');
  const [executiveSummary, setExecutiveSummary] = useState('');
  const [corporateOverview, setCorporateOverview] = useState('');
  const [insights, setInsights] = useState([]);
  const [comparables, setComparables] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, insights.length - VISIBLE_COUNT);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  const handleClick = () => {
    setChatbot(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const fetchSummary = async (prompt, setter) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        setter(data.message);
      } else {
        console.error('API Error:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
    }
  };

  const parseInsights = (text) => {
    const lines = text.split('\n').filter(Boolean);
    return lines.map((line) => {
      const [name, ...rest] = line.split(':');
      return {
        name: name.trim(),
        value: rest.join(':').trim(),
      };
    });
  };

  const parseComparables = (text) => {
    const lines = text.split('\n').filter(Boolean);
    return lines.map((line) => {
      // Expecting format: Revenue: 1200, Increased
      const [left, right] = line.split(',');
      const [name, valueStr] = left.split(':');
      const increaseStr = right?.toLowerCase().includes('increase');

      return {
        name: name.trim(),
        value: parseFloat(valueStr.trim()),
        increase: increaseStr,
      };
    });
  };

  useEffect(() => {

    const fetchAllSummaries = async () => {
      setLoading(true);

      await Promise.all([
        fetchSummary(
          "If you have been given an uploaded pdf document of a company then analyse the document and give me a short description of what the pdf is about in 3 to 5 words as a heading, Act professionally in the reply with only the lines to the point in your answer. Do not mention that you are a chatbot.",
          setShortDescription
        ),
        fetchSummary(
          "If you have been given an uploaded pdf document of a company then analyse the document and give me a 50 word executive summary of the document, Act professionally in the reply with only the lines to the point in your answer.  Do not mention that you are a chatbot.",
          setExecutiveSummary
        ),
        fetchSummary(
          "If you have been given an uploaded pdf document of a company then analyse the document and give me a corporate overview within 50 words, Act professionally in the reply with only the lines to the point in your answer.  Do not mention that you are a chatbot.",
          setCorporateOverview
        ),
        fetchSummary(
          "Analyse the uploaded PDF document and list key financial or operational insights in the format 'Name: Value'. For example: Revenue: INR 120 Million. Limit to the most important 5-6 metrics. Act professionally and only provide the structured list with a max of 6 items.Do not include any headings or numberings, only the data asked in the format asked",
          (message) => setInsights(parseInsights(message))
        ),
        // fetchSummary(
        //   "From the uploaded PDF document, extract 2 financial or performance indicators that can be compared with last year. Reply in this format:\nMetric: Value, Increased/Decreased\nExample: Revenue: 1200, Increased.",
        //   (message) => setComparables(parseComparables(message))
        // ),
      ]);

      setLoading(false);
    };

    fetchAllSummaries();
  }, []);






  const containerRef = useRef(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Start the scrolling animation
  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ['0%', '-100%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  // Duplicate insights to make the loop seamless
  const duplicatedInsights = [...insights, ...insights];

  return (
    <div className="flex flex-col items-center w-full mb-5">
      <div className="flex flex-col items-center justify-center text-white w-full">
        <h1 className="text-3xl font-bold mb-6">Our LLM's insights on {shortDescription || 'the document.'}</h1>
        <div className='flex flex-row gap-14'>
          <div className='w-[40vw] h-full px-3 py-5 rounded-[25px] border-[2px] bg-black/50 flex flex-col text-center justify-center border-black'>
            <div className='text-[24px] font-bold'>Executive summary</div>
            <div className='text-[14px] font-bold opacity-70'>{executiveSummary || 'Generating summary...'}</div>
          </div>
          <div className='w-[40vw] h-full px-3 py-5 rounded-[25px] border-[2px] bg-black/50 flex flex-col text-center justify-center border-black'>
            <div className='text-[24px] font-bold'>Corporate overview</div>
            <div className='text-[14px] font-bold opacity-70'>{corporateOverview || 'Generating summary...'}</div>
          </div>
        </div>
        <div className="text-center text-md font-bold mb-12 w-1/2"></div>
      </div>



      {/* <div className='flex flex-row justify-around items-center gap-14 bg-black/50 p-6 rounded-[20px]'> */}
        {/* {comparables.length === 2 ? (
          <>
            <RiskMeter
              value={comparables[0].value}
              increase={comparables[0].increase}
              header={comparables[0].name}
            />
            <RiskMeter
              value={comparables[1].value}
              increase={comparables[1].increase}
              header={comparables[1].name}
            />
          </>
        ) : (
          <div className='text-white'>Generating performance indicators...</div>
        )} */}
        {/* <div className='flex flex-wrap gap-14'>
          {insights.length > 0 ? (
            insights.map((item, idx) => (
              <div
                key={idx}
                className='w-[260px] h-[120px] border-white rounded-[25px] border-[2px] bg-black flex flex-col text-center justify-center'
              >
                <div className='text-[24px] text-white/90 font-bold'>{item.name}</div>
                <div className='text-[18px] text-white/80 font-bold opacity-89'>{item.value}</div>
              </div>
            ))
          ) : (
            <div className='text-white'>Generating insights...</div>
          )}
        </div> */}
      {/* </div> */}
      <motion.button
            whileHover={{ scale: 1.05, opacity: 0.8 }}
            whileTap={{ scale: 0.95 }}
            className="border-none bg-blue-500 px-3  p-2 rounded-xl shadow-lg mb-6"
          >
            <Link href={"/chatbot"} onClick={handleClick}>
              <h2 className="flex flex-row gap-3 items-center justify-center text-xl text-white font-semibold ">AI Assistant <BsBoxArrowUpRight />
</h2>
            </Link>
          </motion.button>
      {/* <div
      className='relative w-full overflow-hidden bg-black/50 p-6 rounded-[20px]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        className='flex gap-6 cursor-grab active:cursor-grabbing'
        drag='x'
        dragConstraints={{ left: -1000, right: 0 }}
        animate={controls}
      >
        {duplicatedInsights.map((item, idx) => (
          <div
            key={idx}
            className='px-3 min-w-[260px] h-[120px] border-white rounded-[25px] border-[2px] bg-black flex flex-col text-center justify-center flex-shrink-0'
          >
            <div className='text-[24px] text-white/90 font-bold'>{item.name}</div>
            <div className='text-[18px] text-white/80 font-bold opacity-89'>{item.value}</div>
          </div>
        ))}
      </motion.div>
    </div> */}
      <div className="relative w-full  p-6 rounded-[20px] overflow-hidden">
      {/* Slider track */}
      <motion.div
        className="flex gap-6"
        animate={{ x: -currentIndex * CARD_WIDTH }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {insights.map((item, idx) => (
          <div
            key={idx}
            className="px-3 min-w-[260px] h-[120px] border-black rounded-[25px] border-[2px] bg-black/70 flex flex-col text-center justify-center flex-shrink-0"
          >
            <div className="text-[18px] text-blue-400/90 font-bold">{item.name}</div>
            <div className="text-[20px] text-white/80 font-bold opacity-89">{item.value}</div>
          </div>
        ))}
      </motion.div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
        disabled={currentIndex === maxIndex}
      >
        <ChevronRight size={24} />
      </button>
    </div>
    </div>
  );
};

export default Summary;
