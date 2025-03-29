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
    <div className="border mt-10 border-gray-500 bg-yellow-200 py-2 overflow-hidden whitespace-nowrap relative rotate-1 cursor-wait">
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-100%"] }} // Moves text from right to left
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }} // Adjust duration for speed
        style={{ display: "flex", width: "max-content" }} // Prevents breaking
      >
        {scrollingText.map((text, index) => (
          <span key={index} className="text-lg font-medium text-black px-4">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MovingBar;
