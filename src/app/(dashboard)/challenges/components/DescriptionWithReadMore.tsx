"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DescriptionWithReadMoreProps {
  text: string;
  limit?: number;
}

const DescriptionWithReadMore: React.FC<DescriptionWithReadMoreProps> = ({
  text,
  limit = 600,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState(text);

  // Truncate at nearest word
  useEffect(() => {
    if (text.length > limit) {
      const truncated = text.slice(0, limit);
      const lastSpace = truncated.lastIndexOf(" ");
      setTruncatedText(truncated.slice(0, lastSpace) + "...");
    } else {
      setTruncatedText(text);
    }
  }, [text, limit]);

  return (
    <div className="mt-4 text-[12px] ">
      <AnimatePresence initial={false}>
        <motion.div
          key={expanded ? "full" : "truncated"}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p>{expanded ? text : truncatedText}</p>
        </motion.div>
      </AnimatePresence>

      {text.length > limit && (
        <button
          className="text-brightblue text-[12px] mt-1 underline hover:no-underline cursor-pointer"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default DescriptionWithReadMore;