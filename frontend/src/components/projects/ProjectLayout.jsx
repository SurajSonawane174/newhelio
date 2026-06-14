import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const item = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

// Destructuring the exact field names from your MongoDB Schema
const ProjectLayout = ({ title, description, createdAt, liveLink, githubLink }) => {
  return (
    <motion.div
      variants={item}
      className="text-sm md:text-base flex items-center justify-between w-[80vw] relative rounded-lg overflow-hidden p-4 md:p-6 custom-bg border border-white/5 hover:border-cyan-500/30 transition-colors"
    >
      <Link
        // Prioritize liveLink, fallback to github, fallback to empty anchor
        to={liveLink || githubLink || "#"}
        target="_blank"
        className="flex items-center justify-between w-full"
      >
        {/* Project Info */}
        <div className="flex items-center justify-center space-x-2">
          <h2 className="bg-gradient-to-r from-[#7e57c2] to-[#00bcd4] bg-clip-text text-transparent font-semibold whitespace-nowrap">
            {title}
          </h2>
          {/* Added line-clamp-1 so super long descriptions don't break your UI */}
          <p className="text-muted hidden sm:inline-block line-clamp-1 max-w-md">
            {description}
          </p>
        </div>

        {/* Line Separator */}
        <div className="self-end flex-1 mx-2 mb-1 border-b border-dashed border-muted/30" />

        {/* Date: Automatically parsed from Mongoose's timestamps */}
        <p className="text-muted sm:text-muted whitespace-nowrap font-mono text-xs">
          {new Date(createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
        </p>
      </Link>
    </motion.div>
  );
};

export default ProjectLayout;