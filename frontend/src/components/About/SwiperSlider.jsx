// File: components/SwiperSlider.jsx
import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const SkillData = [
  { name: 'Python', Image: '/skills/py_trans.png' },
  { name: 'C++', Image: '/skills/cpptrans2.png' },
  { name: 'Docker', Image: '/skills/docker.webp' },
  { name: 'Framer', Image: '/skills/framer.png' },
  { name: 'HTML', Image: '/skills/html_trans.png' },
  { name: 'Java', Image: '/skills/javatransperant.png' },
  { name: 'JavaScript', Image: '/skills/js_trans.png' },
  { name: 'MongoDB', Image: '/skills/mongodb.png' },
  { name: 'MUI', Image: '/skills/mui.png' },
  { name: 'MySQL', Image: '/skills/mysql.png' },
  { name: 'Redux', Image: '/skills/redux.png' },
  { name: 'React', Image: '/skills/react.png' },
  { name: 'Tailwind', Image: '/skills/tailwind.png' },
];

const SwiperSlider = () => {
  useEffect(() => {
    new Swiper('.swiper1', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: { delay: 0, disableOnInteraction: false },
      speed: 5000,
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      },
    });

    new Swiper('.swiper2', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
      },
      speed: 5000,
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      },
    });
  }, []);

  return (
    <>
      <div className="swiper-container swiper1">
        <div className="swiper-wrapper">
          {SkillData.map((skill, idx) => (
            <div key={idx} className="swiper-slide">
              <img src={skill.Image} alt={skill.name} height="80" />
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-container swiper2">
        <div className="swiper-wrapper">
          {SkillData.map((skill, idx) => (
            <div key={idx} className="swiper-slide">
              <img src={skill.Image} alt={skill.name} height="80" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SwiperSlider;
