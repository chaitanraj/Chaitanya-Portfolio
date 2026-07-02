"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <footer ref={ref} className="border-t theme-divider pb-20 sm:pb-16">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm sm:text-base theme-text-primary italic"
        >
          &quot; ...miles to go before I sleep &quot;
          <br></br>  -Robert Frost
        </motion.p>
      </div>
    </footer>
  );
}

