import React, { useRef } from "react";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import Spotlight from "./Spotlight";
import Rob from "./Rob";
import IntroSection from "./IntroSection";
import { GlobeDemo } from "./GlobeDemo";
import SkillsSection from "./SkillsSection";
import { TracingBeam } from "./TracingBeam";

const dummyContent = [
  {
    title: "Lorem Ipsum Dolor Sit Amet",
    description: (
      <>
        <p>
          Sit duis est minim proident non nisi velit non consectetur...
        </p>
      </>
    ),
    badge: "React",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540",
  },
  {
    title: "Exercitation ad quis cupidatat",
    description: (
      <>
        <p>Enim cillum dolor et nulla sunt exercitation...</p>
      </>
    ),
    badge: "Changelog",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540",
  },
];

export function About() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    mass: 1.2,
  });

  // Rob Movement
  const robY = useTransform(smoothScroll, [0, 0.4], [0, 200]);
  const robX = useTransform(smoothScroll, [0, 0.4], [0, 150]);
  const robScale = useTransform(smoothScroll, [0, 0.4], [1, 0.8]);

  // IntroSection
  const leftOpacity = useTransform(smoothScroll, [0.1, 0.4], [0, 1]);
  const leftX = useTransform(smoothScroll, [0.1, 0.4], ["-100px", "0px"]);

  // Globe/Skills scaling
  const nextScale = useTransform(smoothScroll, [0.4, 0.6], [0.9, 1]);
  const nextOpacity = useTransform(smoothScroll, [0.4, 0.6], [0, 1]);

  return (
    <div className="min-h-[500vh] w-full bg-black overflow-x-hidden text-white">
      {/* === Hero Section (Rob + Intro) === */}
      <div
        ref={containerRef}
        className="h-[100vh] top-0 w-full bg-black/[0.96] bg-grid-white/[0.02] flex items-center justify-center relative z-20"
      >
        <div className="w-full px-4 md:px-20 flex items-center justify-between relative">
          {/* Intro (left) */}
          <motion.div
            style={{ opacity: leftOpacity, x: leftX }}
            className="w-1/2 absolute top-1/2 -translate-y-1/2 left-10"
          >
            <IntroSection />
          </motion.div>

          {/* Rob (right) */}
          <motion.div
            style={{ x: robX, y: robY, scale: robScale }}
            className="w-1/2 absolute right-10 top-1/2 -translate-y-1/2 flex justify-center items-center"
          >
            <div className="relative">
              <Spotlight />
              <Rob />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[30vh] w-full" />

      {/* === Globe Section === */}
      <motion.div
        style={{ scale: nextScale, opacity: nextOpacity }}
        className="h-[100vh] w-full flex items-center justify-center sticky top-0 z-10 bg-black"
      >
        <GlobeDemo />
      </motion.div>

      {/* === Skills Section (Optional) === */}
      <motion.div
        style={{ scale: nextScale, opacity: nextOpacity }}
        className="h-[100vh] w-full flex items-center justify-center sticky top-0 z-0 bg-black"
      >
        <SkillsSection />
      </motion.div>

      {/* === Tracing Section === */}
      <TracingBeam className="px-6 pt-10">
        <div className="max-w-2xl mx-auto antialiased relative">
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <h2 className="bg-white text-black rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.badge}
              </h2>
              <p className="text-xl font-semibold mb-4">{item.title}</p>
              <div className="text-sm prose prose-sm prose-invert text-gray-300">
                {item?.image && (
                  <img
                    src={item.image}
                    alt="blog"
                    className="rounded-lg mb-10 object-cover"
                  />
                )}
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </div>
  );
}
