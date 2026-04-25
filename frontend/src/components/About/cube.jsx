import React, { useEffect, useState } from "react";
import "swiper/css";

const skillData = [
  { name: "Python", image: "/skills/py_trans.png" },
  { name: "C++", image: "/skills/cpptrans2.png" },
  { name: "Docker", image: "/skills/docker.webp" },
  { name: "Framer", image: "/skills/framer.png" },
  { name: "HTML", image: "/skills/html_trans.png" },
  { name: "React", image: "/skills/react.png" },
];

const SkillsCube = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  let timeoutId;

  const handleMouseMove = (e) => {
    clearTimeout(timeoutId);
    const cube = document.querySelector(".cube");
    const rect = cube.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = (e.clientY - rect.top) / rect.height * 2 - 1;
    const rotateX = y * 50;
    const rotateY = x * 50;
    setRotation({ x: rotateX, y: rotateY });
    timeoutId = setTimeout(() => {
      setRotation({ x: 0, y: 0 });
    }, 1000);
  };

  return (
    <div
      className="w-full h-[400px] flex items-center justify-center bg-transparent relative"
      onMouseMove={handleMouseMove}
    >
      <div
        className="w-[200px] h-[200px] absolute transform-style-preserve-3d animate-spin-slow"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.2s ease-in-out",
        }}
      >
        {skillData.map((skill, i) => {
          const faceClass = [
            "translate-z-[100px]",
            "rotate-y-90 translate-z-[100px]",
            "rotate-y-180 translate-z-[100px]",
            "-rotate-y-90 translate-z-[100px]",
            "rotate-x-90 translate-z-[100px]",
            "-rotate-x-90 translate-z-[100px]",
          ][i];

          return (
            <div
              key={i}
              className={`absolute w-full h-full flex items-center justify-center ${faceClass} bg-black bg-opacity-40 border border-white rounded-lg`}
            >
              <img
                src={skill.image}
                alt={skill.name}
                className="w-16 h-16 object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsCube;
