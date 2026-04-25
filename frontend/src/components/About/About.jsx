import React, { useEffect, useRef } from "react";
import "../../styles/about.css";
import Rob from "./Rob";
import Spotlight from "./Spotlight";
import Typed from "typed.js";
import ScrollReveal from "scrollreveal";
import ItemLayout from "./ItemLayout";
import Skills from "./sas";
import SkillsSwiper from "./SkillsSwipper";
import LampWithCube from "./LampWithCube";
import LampDemo from "./LampDemo";
// import { LampContainer } from "./LampContainer";
import StarsCanvas from "../Encryption/StarCanvas";

const About = () => {
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
      reset: false,
      distance: "150px",
      duration: 2000,
      delay: 200,
    });

    ScrollReveal().reveal(".reveal-left", { origin: "left" });
    ScrollReveal().reveal(".reveal-bottom", { origin: "bottom" });

    ScrollReveal().reveal(".reveal-left-always", {
      reset: false,
      distance: "150px",
      duration: 2000,
      delay: 200,
      origin: "left",
    });

    ScrollReveal().reveal(".reveal-bottom-always", {
      reset: false, // 👈 reset enabled for this one
      distance: "150px",
      duration: 2000,
      delay: 200,
      origin: "bottom",
    });

    ScrollReveal().reveal(".reveal-right-always", {
      reset: false, // 👈 reset enabled for this one
      distance: "80px",
      duration: 2000,
      delay: 200,
      origin: "right",
    });

    return () => typedInstance.destroy();
  }, []);
  return (
    <div className="about min-h-screen flex flex-col items-center justify-center">
      <div className="background">
        <StarsCanvas></StarsCanvas>
        <img
          src="/backgrounds/trees.webp"
          alt=""
          className="treebg reveal-bottom-always"
          loading="eager"
          fetchpriority="high"
        />
        <div className="image-container">
          <img
            src="/backgrounds/horse.png"
            alt="horse"
            className="horse-image reveal-right-always"
            loading="eager"
  fetchpriority="high"
          />
          <img
            src="/backgrounds/cliff.webp"
            alt="cliff"
            className="cliff-image reveal-right-always"
            loading="eager"
  fetchpriority="high"
          />
        </div>

        <img src="/backgrounds/stars.png" alt="stars" className="stars-image" />
      </div>
      <div className="rob">
        {/* <Spotlight></Spotlight> */}
        <Rob className="ROBOT"> </Rob>
      </div>
      <div className="intro-section">
        <div className="intro-content reveal-left">
          <span className="intro-greeting">Hello, it's me</span>
          <h1 className="intro-name">Suraj</h1>
          <h3 className="intro-typed-text">
            And I'm a <span ref={typedRef} className="typed-highlight" />
          </h3>
          <p className="intro-description">
            Creative, Passionate, and Enthusiastic about Technology
          </p>

          <div className="intro-buttons reveal-bottom">
            <a href="/resume.pdf" target="_blank" className="btn resume">
              Learn More
            </a>
            <a href="/projects" target="" className="btn projects">
              My Projects
            </a>
            <a href="/contact" target="" className="btn contact">
              Contact Me
            </a>
          </div>
        </div>
      </div>
      <div className="skill-container p-20">
        <ItemLayout
          className={
            "item col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <SkillsSwiper></SkillsSwiper>
        </ItemLayout>
      </div>
      <div className="lamp reveal-bottom">
        <div className="light-container">
          <div className="light active">
            <div
              style={{
                color: "#fff",
                position: "relative",
                top: "50px",
                fontSize: "40px",
                fontWeight: 700,
              }}
              data-aos="fade-zoom-in"
            >
              <span className="gradient-text">Expert</span>
              <span> In</span>
            </div>
          </div>
        </div>
        <LampWithCube></LampWithCube>
      </div>

      <section className="py-20 w-[80vw]">
        <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
          <ItemLayout
            className={
              " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
            }
          >
            <h2 className=" text-xl text-white md:text-2xl text-left w-full capitalize">
              Pixel Sorcerer
            </h2>
            <p className="font-light text-white  text-xs sm:text-sm md:text-base   ">
              My journey through the digital realm is guided by curiosity,
              precision, and a deep passion for building meaningful web
              experiences. I craft modern interfaces using powerful spells like
              JavaScript, with React.js and Next.js as my go-to grimoires.
              Whether it’s designing fluid user journeys or implementing robust
              backend systems, I bridge functionality and design effortlessly.
              Through the ancient craft of the Jamstack and tools like Tailwind
              CSS, MongoDB, and Framer Motion, I conjure responsive, fast, and
              aesthetic portals that don’t just function — they resonate. Every
              project is a new quest, and with every line of code, I strive to
              blend logic with visual storytelling.
            </p>
          </ItemLayout>

          <ItemLayout
            className={" col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
          >
            <p className="font-semibold text- w-full text-left text-2xl sm:text-5xl git-stat-text">
              7+{" "}
              <sub className="font-semibold text-white text-base">Projects</sub>
            </p>
          </ItemLayout>

          <ItemLayout
            className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
          >
            <p className="git-stat-text font-semibold w-full text-left text-2xl sm:text-5xl">
              3+{" "}
              <sub className="font-semibold text-white text-base">
                years of experience
              </sub>
            </p>
          </ItemLayout>
          {/* 
          <ItemLayout className={"col-span-full"}>
            <img
              className="w-full h-auto"
              src={`https://skillicons.dev/icons?i=appwrite,aws,babel,bootstrap,cloudflare,css,d3,docker,figma,firebase,gatsby,git,github,graphql,html,ipfs,js,jquery,kubernetes,linux,mongodb,mysql,netlify,nextjs,nodejs,npm,postgres,react,redux,replit,sass,supabase,tailwind,threejs,vercel,vite,vscode,yarn`}
              alt="CodeBucks"
              loading="lazy"
            />
          </ItemLayout> */}

          <ItemLayout className={"col-span-full md:col-span-6 !p-0"}>
            <img
              className="w-20vw h-auto"
              src={`https://github-readme-stats.vercel.app/api/top-langs?username=SurajSonawane174&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF&icon_color=FEFE5B&text_bold=false`}
              alt="CodeBucks"
              loading="lazy"
            />
          </ItemLayout>

          <ItemLayout className="col-span-full md:col-span-6 !p-0">
            <img
              className="w-full h-auto"
              src="https://github-readme-stats.vercel.app/api?username=SurajSonawane174&show_icons=true&theme=transparent&hide_border=true&title_color=FEFE5B&text_color=FFFFFF"
              alt="GitHub Stats"
            />
          </ItemLayout>

          <ItemLayout className="col-span-full md:col-span-12 !p-0">
            <img
              className="w-full h-auto bg-transperant"
              src="https://ghchart.rshah.org/SurajSonawane174"
              alt="GitHub Streak Stats"
            />
          </ItemLayout>

          {/* <ItemLayout className="col-span-full md:col-span-12 !p-0">
            <img
              className="w-full h-auto bg-transperant"
              src="https://github-readme-streak-stats.herokuapp.com/?user=SurajSonawane174"
              alt="GitHub Streak Stats"
            />
          </ItemLayout> */}
        </div>
      </section>
    </div>
  );
};

export default About;
