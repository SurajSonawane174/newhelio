import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import ScrollReveal from "scrollreveal";
import "../../styles/skills.css";


const skillData = [
  { name: "Python", image: "/skills/py_trans.png" },
  { name: "C++", image: "/skills/cpptrans2.png" },
  { name: "Docker", image: "/skills/docker.webp" },
  { name: "Framer", image: "/skills/framer.png" },
  { name: "HTML", image: "/skills/html_trans.png" },
  { name: "Java", image: "/skills/javatransperant.png" },
  { name: "JavaScript", image: "/skills/js_trans.png" },
  { name: "MongoDB", image: "/skills/mongodb.png" },
  { name: "MUI", image: "/skills/mui.png" },
  { name: "MySQL", image: "/skills/mysql.png" },
  { name: "Redux", image: "redux.png" },
  { name: "React", image: "skills/react.png" },
  { name: "Tailwind", image: "/skills/tailwind.png" }
];

const Skills = () => {
  useEffect(() => {
    ScrollReveal().reveal(".subtitle, .header", { origin: "top" });
    ScrollReveal().reveal(".swiper1", { origin: "right" });
    ScrollReveal().reveal(".swiper2", { origin: "left" });
    ScrollReveal().reveal(".light-container, .skills", { origin: "bottom" });

    new Swiper(".swiper1", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      speed: 5000,
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 5, spaceBetween: 40 }
      }
    });

    new Swiper(".swiper2", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true
      },
      speed: 5000,
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 5, spaceBetween: 40 }
      }
    });

    const cube = document.querySelector(".cube");
    const container = document.querySelector(".container");
    let timeoutId;

    document.addEventListener("mousemove", (e) => {
      clearTimeout(timeoutId);
      cube.classList.remove("animate");

      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = (e.clientY - rect.top) / rect.height * 2 - 1;
      const rotateX = y * 50;
      const rotateY = x * 50;
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      timeoutId = setTimeout(() => {
        cube.style.transform = "";
        cube.classList.add("animate");
      }, 1000);
    });
  }, []);

  return (
    <div className="skills-wrapper">
      <div className="header">
        <h1 className="title">
          Skills <span className="gradient-text"> & </span> Technologies
        </h1>
        <p className="subtitle">Using the latest tech this world has to offer</p>
      </div>

      <div className="swiper-container swiper1">
        <div className="swiper-wrapper">
          {skillData.map((skill, index) => (
            <div className="swiper-slide" key={index}>
              <img src={skill.image} alt={skill.name} width="100" height="100" />
            </div>
          ))}
        </div>
      </div>

      <div className="swiper-container swiper2">
        <div className="swiper-wrapper">
          {skillData.map((skill, index) => (
            <div className="swiper-slide" key={index}>
              <img src={skill.image} alt={skill.name} width="100" height="100" />
            </div>
          ))}
        </div>
      </div>

      <div className="light-cube">


        <div className="skills">
          <div className="container">
            <div className="box cube animate">
              <div id="front" className="card">
                <img src="/skills/icons8-java-logo-64.png" alt="Java" />
              </div>
              <div id="back" className="card">
                <img src="https://img.icons8.com/?size=100&id=uLDrtp8o8zTG&format=png&color=000000" alt="Python" />
              </div>
              <div id="left" className="card">
                <img src="/skills/icons8-c++-64.png" alt="C++" />
              </div>
              <div id="right" className="card">
                <img src="https://img.icons8.com/?size=100&id=laVIsJnTtYoj&format=png&color=000000" alt="React" />
              </div>
              <div id="top" className="card">
                <img src="../src/skills/react.png" alt="React" />
              </div>
              <div id="bottom" className="card">
                <img src="/skills/icons8-html-logo-64.png" alt="HTML" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
