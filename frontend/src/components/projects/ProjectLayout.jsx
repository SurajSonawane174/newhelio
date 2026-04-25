import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ React Router

const item = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

const ProjectLayout = ({ name, description, date, demoLink }) => {
  return (
    <motion.div
      variants={item}
      className="text-sm md:text-base flex items-center justify-between w-[80vw] relative rounded-lg overflow-hidden p-4 md:p-6 custom-bg"
    >
      <Link
        to={demoLink}
        target="_blank"
        className="flex items-center justify-between w-full"
      >
        {/* Project Info */}
        <div className="flex items-center justify-center space-x-2">
          <h2 className="bg-gradient-to-r from-[#7e57c2] to-[#00bcd4] bg-clip-text text-transparent  font-semibold">{name}</h2>
          <p className="text-muted hidden sm:inline-block">{description}</p>
        </div>

        {/* Line Separator */}
        <div className="self-end flex-1 mx-2 mb-1 border-b border-dashed border-muted" />

        {/* Date */}
        <p className="text-muted sm:text-muted">
          {new Date(date).toDateString()}
        </p>
      </Link>
    </motion.div>
  );
};

export default ProjectLayout;
