// src/components/About/ExperienceTimeline.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, CheckCircle2, Calendar, Clock } from "lucide-react";

const API_BASE = "http://localhost:8080/api/v1";

const formatTimelineDate = (dateString, isCurrent) => {
  if (isCurrent) return "Present";
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch (e) {
    return "";
  }
};

const getDuration = (startDate, endDate, isCurrent) => {
  try {
    const start = new Date(startDate);
    const end = isCurrent || !endDate ? new Date() : new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (months < 0) months = 0;
    if (months === 0) months = 1;

    const years = Math.floor(months / 12);
    const remMonths = months % 12;

    if (years === 0) return `${remMonths} mo${remMonths !== 1 ? "s" : ""}`;
    if (remMonths === 0) return `${years} yr${years !== 1 ? "s" : ""}`;
    return `${years} yr${years !== 1 ? "s" : ""} ${remMonths} mo${remMonths !== 1 ? "s" : ""}`;
  } catch (e) {
    return "";
  }
};

const getStartYear = (dateString) => {
  try {
    const year = new Date(dateString).getFullYear();
    return isNaN(year) ? null : year;
  } catch (e) {
    return null;
  }
};

const getEarliestYear = (experiences) => {
  let minYear = null;
  experiences.forEach((exp) => {
    const year = getStartYear(exp.startDate);
    if (year !== null && (minYear === null || year < minYear)) {
      minYear = year;
    }
  });
  return minYear;
};

const cardVariants = (fromLeft) => ({
  hidden: { opacity: 0, x: fromLeft ? -60 : 60, y: 20 },
  visible: { opacity: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 70, damping: 16 } },
});

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const tagVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.45 } },
};

const tagItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

/* ---------------------------------- Logo / Avatar ---------------------------------- */

const ExperienceLogo = ({ exp }) => (
  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
    {/* Rotating gradient ring */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: "conic-gradient(from 0deg, #a855f7, #22d3ee, #a855f7)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    {/* Soft glow */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-400/30 blur-md" />
    {/* Inner content */}
    <div className="absolute inset-[3px] rounded-full bg-[#0a0a14] flex items-center justify-center overflow-hidden">
      {exp.companyLogo ? (
        <img
          src={exp.companyLogo}
          alt={`${exp.company} logo`}
          className="w-full h-full object-contain p-2.5"
        />
      ) : (
        <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
      )}
    </div>
  </div>
);

/* ---------------------------------- Experience Card ---------------------------------- */

const ExperienceCard = ({ exp, index }) => {
  const fromLeft = index % 2 === 0;
  const duration = getDuration(exp.startDate, exp.endDate, exp.isCurrent);
  const startYear = getStartYear(exp.startDate);

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
      {/* Timeline node + year label */}
      <div className="absolute left-4 md:left-1/2 top-1.5 z-20 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#0a0a14] border-2 border-purple-500"
        >
          {exp.isCurrent && (
            <motion.span
              className="absolute inset-0 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <Briefcase className="w-3.5 h-3.5 text-cyan-400 relative z-10" />
        </motion.div>

        {startYear && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-[10px] font-mono tracking-widest text-gray-500 whitespace-nowrap"
          >
            {startYear}
          </motion.span>
        )}
      </div>

      {/* Spacer (desktop alternating layout) */}
      <div className={`hidden md:block w-1/2 ${fromLeft ? "md:order-2" : "md:order-1"}`} />

      {/* Card */}
      <motion.div
        variants={cardVariants(fromLeft)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={`relative w-full md:w-1/2 pl-12 md:pl-0 ${
          fromLeft ? "md:pr-12 md:order-1" : "md:pl-12 md:order-2"
        }`}
      >
        {/* Gradient border wrapper */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className="group relative p-[1px] rounded-xl bg-gradient-to-br from-purple-500/30 via-white/5 to-cyan-500/30 hover:shadow-[0_0_30px_rgba(112,66,248,0.25)] transition-shadow duration-300"
        >
          <div className="relative rounded-xl overflow-hidden">
            {/* Glassy hover background layer */}
            <div className="absolute inset-0 z-0">
              {exp.companyLogo ? (
                <img
                  src={exp.companyLogo}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover scale-125 opacity-0 blur-lg saturate-150 transition-all duration-700 ease-out group-hover:opacity-90 group-hover:blur-md group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-500/40 to-cyan-400/40 blur-2xl transition-opacity duration-700" />
              )}

              {/* Frosted glass overlay so text stays readable */}
              <div className="absolute inset-0 bg-[#13131f]/90 backdrop-blur-sm transition-all duration-700 group-hover:bg-[#13131f]/65 group-hover:backdrop-blur-md" />

              {/* Ghost index number */}
              <span
                className={`absolute -bottom-6 text-[7rem] sm:text-[9rem] font-black leading-none text-white/[0.04] select-none pointer-events-none ${
                  fromLeft ? "right-2" : "left-2"
                }`}
                style={{ WebkitTextStroke: "1px rgba(168,85,247,0.15)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 p-5">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                >
                  <ExperienceLogo exp={exp} />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide leading-tight">
                    {exp.role}
                  </h3>
                  <div className="flex items-center flex-wrap gap-2 mt-1.5">
                    <span className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase">
                      {exp.company}
                    </span>
                    {exp.isCurrent && (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                        <CheckCircle2 className="w-3 h-3" /> Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center flex-wrap gap-3 mt-2 text-gray-400 font-mono text-xs">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {formatTimelineDate(exp.startDate, false)} — {formatTimelineDate(exp.endDate, exp.isCurrent)}
                    </span>
                    {duration && (
                      <span className="flex items-center gap-1.5 text-purple-300">
                        <Clock className="w-3 h-3" />
                        {duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {exp.description?.length > 0 && (
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="list-none space-y-2 mb-4"
                >
                  {exp.description.map((point, idx) => (
                    <motion.li
                      key={idx}
                      variants={listItemVariants}
                      className="text-gray-300 text-sm leading-relaxed flex items-start"
                    >
                      <span className="text-purple-500 mr-2 mt-1">▹</span>
                      {point}
                    </motion.li>
                  ))}
                </motion.ul>
              )}

              {exp.technologiesUsed?.length > 0 && (
                <motion.div
                  variants={tagVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {exp.technologiesUsed.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      variants={tagItemVariants}
                      whileHover={{ scale: 1.08, borderColor: "rgba(34,211,238,0.6)" }}
                      className="flex items-center gap-1.5 text-[10px] sm:text-xs px-3 py-1 rounded-full bg-black/40 border border-white/10 text-purple-300 font-mono tracking-widest uppercase transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ---------------------------------- Timeline Track ---------------------------------- */

const TimelineTrack = ({ experiences }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const earliestYear = getEarliestYear(experiences);

  return (
    <div className="relative mt-8">
      {earliestYear && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <span className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-300 uppercase px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5">
            <Clock className="w-3 h-3" />
            Journey began in {earliestYear}
          </span>
        </motion.div>
      )}

      <div ref={containerRef} className="relative">
        {/* Static background line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

        {/* Animated scroll-linked line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 top-0 w-px bg-gradient-to-b from-purple-500 via-cyan-400 to-transparent -translate-x-1/2 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
        />

        {/* Traveling glow dot */}
        <motion.div
          style={{ top: lineHeight }}
          className="absolute left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_4px_rgba(34,211,238,0.7)] z-10"
        />

        <div className="flex flex-col gap-20 relative">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp._id || index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------- Main Component ---------------------------------- */

const ExperienceTimeline = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`${API_BASE}/experience`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setExperiences(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto py-20 px-4 relative z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-4"
      >
        <h2 className="text-3xl font-bold text-white tracking-widest uppercase">
          Career{" "}
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Trajectory
          </span>
        </h2>
        <p className="text-gray-500 text-sm font-mono mt-2 tracking-wide">
          A timeline of roles, responsibilities, and growth
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-cyan-400 font-mono tracking-widest animate-pulse">LOADING_TIMELINE_DATA...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 font-mono tracking-widest">ERROR: {error}</p>
        </div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 font-mono tracking-widest uppercase">Timeline records empty.</p>
        </div>
      ) : (
        <TimelineTrack experiences={experiences} />
      )}
    </div>
  );
};

export default ExperienceTimeline;