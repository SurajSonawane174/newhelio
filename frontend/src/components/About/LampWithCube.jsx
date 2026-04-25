// File: components/LampWithCube.jsx
import React, { useEffect } from 'react';

const LampWithCube = () => {
  useEffect(() => {
    const cube = document.querySelector('.cube');
    const container = document.querySelector('.container');
    let timeoutId;

    const handleMouseMove = (e) => {
      clearTimeout(timeoutId);
      cube.classList.remove('animate');

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      const rotateX = y * 50;
      const rotateY = x * 50;
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      timeoutId = setTimeout(() => {
        cube.style.transform = '';
        cube.classList.add('animate');
      }, 1000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="light-cube">
      <div className="skills">
        <div className="container">
          <div className="box cube animate">
            <div id="front" className="card">
              <img src="/skills/icons8-java-logo-64.png" alt="Front" />
            </div>
            <div id="back" className="card">
              <img src="/skills/backup.png" alt="Back" />
            </div>
            <div id="left" className="card">
              <img src="/skills/icons8-c++-64.png" alt="Left" />
            </div>
            <div id="right" className="card">
              <img src="/skills/icons8-js-logo.png" alt="Right" />
            </div>
            <div id="top" className="card">
              <img src="/skills/react.png" alt="Top" />
            </div>
            <div id="bottom" className="card">
              <img src="/skills/icons8-html-logo-64.png" alt="Bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LampWithCube;
