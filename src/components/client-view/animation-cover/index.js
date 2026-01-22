"use client";
import { motion } from "framer-motion";

export default function AnimationWrapper({ children, className, ...props }) {
  return (
    <motion.div
      initial="offscreen"
      whileInView={"onScreen"}
      viewport={{
        once: true,
        amount: "0.8",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
