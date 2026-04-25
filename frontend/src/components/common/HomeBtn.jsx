import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

// ✅ New recommended method (no warnings)
const NavLink = motion.create(Link);

const HomeBtn = () => {
  return (
    <div className="fixed top-4 left-2.5 xs:left-4 z-50">
      <NavLink
        to="/"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ delay: 1 }}
        className="w-10 h-10 xs:w-14 xs:h-14 p-2.5 xs:p-4
          rounded-full flex items-center justify-center
          bg-[rgba(0,0,0,0.1)] border border-black
          backdrop-blur-sm hover:shadow-[0_0_1rem_#0ef] hover:border-none group"
        aria-label="home"
      >
        <span className="relative w-full h-full group">
          <Home
            className="w-full h-auto text-[#0ef] group-hover:drop-shadow-[0_0_4px_#0ef]"
            strokeWidth={1.5}
          />
          <span className="absolute top-0 left-0 w-full h-full" />
        </span>
      </NavLink>
    </div>
  );
};

export default HomeBtn;
