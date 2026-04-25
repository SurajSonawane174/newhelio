// File: components/SkillsSection.jsx
import React from 'react';
import SwiperSlider from './SwiperSlider';
import LampWithCube from './LampWithCube';
import './skills.css';

const SkillsSection = () => {
  return (
    <div className="content">
      <div className="header">
        <h1 className="title">
          Skills <span className="gradient-text"> & </span> Technologies
        </h1>
        <p className="subtitle">Using the latest tech this world has to offer</p>
      </div>

      <SwiperSlider />
      <LampWithCube />
    </div>
  );
};

export default SkillsSection;
