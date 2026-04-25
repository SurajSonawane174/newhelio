import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

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
  { name: "Redux", image: "/skills/redux.png" },
  { name: "React", image: "/skills/react.png" },
  { name: "Tailwind", image: "/skills/tailwind.png" },
];

const SkillsSwiper = () => {
  return (
    <div className="w-full py-10 px-4 bg-transparent text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center">
          Skills{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            & Technologies
          </span>
        </h2>

        {/* First Swiper - Left to Right */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          spaceBetween={20}
          autoplay={{
            delay: 1500, // stay time per slide
            disableOnInteraction: false,
          }}
          speed={2500}
          breakpoints={{
            320: { slidesPerView: 1, autoplay: { delay: 2000, speed: 2000 } },
            480: { slidesPerView: 2, autoplay: { delay: 1800, speed: 2200 } },
            640: { slidesPerView: 3, autoplay: { delay: 1600, speed: 2400 } },
            768: { slidesPerView: 4, autoplay: { delay: 1400, speed: 2600 } },
            1024: { slidesPerView: 5, autoplay: { delay: 1200, speed: 2800 } },
            1280: { slidesPerView: 6, autoplay: { delay: 1000, speed: 3000 } },
          }}
        >
          {skillData.map((skill, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <span className="text-sm">{skill.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Second Swiper - Right to Left */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          spaceBetween={20}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          speed={2500}
          breakpoints={{
            320: { slidesPerView: 1, autoplay: { delay: 2000, speed: 2000 } },
            480: { slidesPerView: 2, autoplay: { delay: 1800, speed: 2200 } },
            640: { slidesPerView: 3, autoplay: { delay: 1600, speed: 2400 } },
            768: { slidesPerView: 4, autoplay: { delay: 1400, speed: 2600 } },
            1024: { slidesPerView: 5, autoplay: { delay: 1200, speed: 2800 } },
            1280: { slidesPerView: 6, autoplay: { delay: 1000, speed: 3000 } },
          }}
        >
          {skillData.map((skill, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <span className="text-sm">{skill.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SkillsSwiper;