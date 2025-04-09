import React from "react";
import { motion } from "framer-motion";

const MovingBar = () => {
  const items = [
    "✦ Mutual Funds Made Simple",
    "✦ Grow Your Wealth",
    "✦ Smart Investing",
    "✦ Secure Future",
    "✦ Financial Success Starts Here",
    "✦ Invest Wisely",
    "✦ Wealth Creation",
    "✦ Financial Growth",
    "✦ Future Secured",
    "✦ Smart Investments",
    "✦ Grow Your Money",
    "✦ Plan Your Future",
    "✦ Financial Freedom",
    "✦ Investment Solutions",
    "✦ Building Wealth Together",
    "✦ Your Financial Partner",
    "✦ Investing Made Easy",
    "✦ Achieve Your Goals",
  ];

  // Duplicate the array for seamless looping
  const scrollingText = [...items, ...items];

  return (
<div className="border mt-10 flex border-gray-500 bg-gradient-to-r from-red-300 to-blue-300 py-2 overflow-hidden whitespace-nowrap relative -rotate-1 cursor-wait">
    {/* Left blur effect */}
    <div
      className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-red-300 to-transparent pointer-events-none"
      style={{ zIndex: 10 }} // Ensure it's on top
    ></div>
    <motion.div
      className="flex gap-6"
      animate={{ x: ["0%", "-100%"] }} // Moves text from right to left
      transition={{ repeat: Infinity, duration: 80, ease: "linear" }} // Adjust duration for speed
      style={{ display: "flex", width: "max-content" }} // Prevents breaking
    >
      {scrollingText.map((text, index) => (
        <span key={index} className="text-lg font-medium text-black px-4">
          {text}
        </span>
      ))}
    </motion.div>
    <motion.div
      className="flex gap-6"
      animate={{ x: ["0%", "-100%"] }} // Moves text from right to left
      transition={{ repeat: Infinity, duration: 80, ease: "linear" }} // Adjust duration for speed
      style={{ display: "flex", width: "max-content" }} // Prevents breaking
    >
      {scrollingText.map((text, index) => (
        <span key={index} className="text-lg font-medium text-black px-4">
          {text}
        </span>
      ))}
    </motion.div>
    {/* Right blur effect */}
    <div
      className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-blue-300 to-transparent pointer-events-none"
      style={{ zIndex: 10 }} // Ensure it's on top
    ></div>
  </div>
  );
};

export default MovingBar;
