// hooks/useScrollAnimation.js
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export function useScrollAnimation() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const exitY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  const enterScale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const enterOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return {
    ref,
    exitY,
    exitScale,
    enterScale,
    enterOpacity,
  };
}
