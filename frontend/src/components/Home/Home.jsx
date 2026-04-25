import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navigation from "./Navigation";

const Home = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[0    ]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="/sas.webm"
      />

      {/* Particle layer */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute top-0 left-0 w-full h-full z-0"
        options={{
          fullScreen: false,
          particles: {
            number: {
              value: 60,
              density: { enable: true, area: 800 },
            },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 5, random: true },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 200 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="relative z-1">
        <Navigation />
      </div>
    </div>
  );
};

export default Home;
