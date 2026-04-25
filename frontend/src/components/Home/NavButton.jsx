import {
  Github,
  Home,
  Linkedin,
  NotebookText,
  Palette,
  Phone,
  LockKeyhole,
  User,
} from "lucide-react";
import React from "react";
import ResponsiveComponent from "../ResponsiveComponent";
import clsx from "clsx";
import { motion } from "framer-motion";

const getIcon = (icon) => {
  const iconProps = { className: "w-full h-auto text-[#0ef]", strokeWidth: 1.5 };
  switch (icon) {
    case "home":
      return <Home {...iconProps} />;
    case "about":
      return <User {...iconProps} />;
    case "projects":
      return <Palette {...iconProps} />;
    case "contact":
      return <Phone {...iconProps} />;
    case "github":
      return <Github {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "lockkeyhole":
      return <LockKeyhole {...iconProps} />;
    case "resume":
      return <NotebookText {...iconProps} />;
    default:
      return <Home {...iconProps} />;
  }
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
};

const NavLink = motion.a;

const NavButton = ({
  x,
  y,
  label,
  link,
  icon,
  newTab,
  labelDirection = "right",
}) => {
  const buttonBaseClasses = `rounded-full flex items-center justify-center 
    bg-[rgba(0,0,0,0.1)] backdrop-blur-sm 
    border border-black 
    transition-all duration-300 
    hover:shadow-[0_0_1rem_#0ef] hover:border-none`;

  const labelBaseClasses = `absolute hidden peer-hover:block px-2 py-1 mx-2 
    top-1/2 -translate-y-1/2 text-[#0ef] text-sm 
    rounded-md shadow-lg whitespace-nowrap 
    bg-background`;

  return (
    <ResponsiveComponent>
      {({ size }) => {
        return size && size >= 480 ? (
          <div
            className="absolute cursor-pointer z-50"
            style={{ transform: `translate(${x}, ${y})` }}
          >
            <NavLink
              variants={item}
              href={link}
              target={newTab ? "_blank" : "_self"}
              rel={newTab ? "noopener noreferrer" : undefined}
              className={buttonBaseClasses}
              aria-label={label}
              name={label}
            >
              <span className="relative w-14 h-14 p-4 animate-spin-slow-reverse group-hover:pause">
                {getIcon(icon)}
                <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />
                <span
                  className={clsx(
                    labelBaseClasses,
                    labelDirection === "left" ? "right-full left-auto" : "left-full"
                  )}
                >
                  {label}
                </span>
              </span>
            </NavLink>
          </div>
        ) : (
          <div className="w-fit cursor-pointer z-50">
            <NavLink
              variants={item}
              href={link}
              target={newTab ? "_blank" : "_self"}
              rel={newTab ? "noopener noreferrer" : undefined}
              className={buttonBaseClasses}
              aria-label={label}
              name={label}
            >
              <span className="relative w-10 h-10 xs:w-14 xs:h-14 p-2.5 xs:p-4">
                {getIcon(icon)}
                <span className="peer bg-transparent absolute top-0 left-0 w-full h-full" />
                <span
                  className={clsx(
                    labelBaseClasses,
                    labelDirection === "left" ? "right-full left-auto" : "left-full"
                  )}
                >
                  {label}
                </span>
              </span>
            </NavLink>
          </div>
        );
      }}
    </ResponsiveComponent>
  );
};

export default NavButton;
