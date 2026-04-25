import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import ScrollReveal from "scrollreveal";

const IntroSection = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typedInstance = new Typed(typedRef.current, {
      strings: ["COEPIAN", "Developer", "Programmer", "Student"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });

    ScrollReveal({
      reset: true,
      distance: "150px",
      duration: 2000,
      delay: 200,
    });

    ScrollReveal().reveal(".reveal-bottom", { origin: "bottom" });
 


  }, []);

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full max-w-3xl mx-auto reveal-bottom">
        <span className="text-sm sm:text-lg text-gray-400 block mb-1">
          Hello, it's me
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-500">
          Suraj
        </h1>
        <h3 className="text-lg sm:text-2xl mt-3">
          And I'm a{" "}
          <span
            ref={typedRef}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold"
          />
        </h3>
        <p className="text-sm sm:text-base md:text-lg mt-4 text-gray-300">
          Creative, Passionate, and Enthusiastic about Technology
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4 mt-8 reveal-bottom">
          <a
            href="/resume.pdf"
            target="_blank"
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded shadow text-center"
          >
            Learn More
          </a>
          <a
            href="/projects"
            target="_blank"
            className="w-full sm:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded shadow text-center"
          >
            My Projects
          </a>
          <a
            href="/contact"
            target="_blank"
            className="w-full sm:w-auto px-6 py-2 bg-gray-800 hover:bg-gray-900 rounded shadow text-center"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
