import React, { useState } from "react";
import { motion } from "framer-motion";

const slideInFromTop = {
  hidden: { opacity: 0, y: -50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 1.25,
      delay: 0.25,
    },
  },
};

const Encryption = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLoginPopup = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full">
      {/* Heading */}
      <div className="absolute w-auto h-auto top-0 z-[5]">
        <motion.div
          variants={slideInFromTop}
          initial="hidden"
          animate="show"
          className="text-[40px] font-medium text-center text-gray-200 mt-[80px]"
        >
          Performance
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            &{" "}
          </span>
          Security
        </motion.div>
      </div>

      {/* Lock + Click Me Area */}
      <div
        onClick={toggleLoginPopup}
        className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto cursor-pointer"
      >
        <div className="flex flex-col items-center group w-auto h-auto">
          <img
            src="/encr/LockTop.png"
            alt="Lock top"
            width={50}
            height={50}
            className="w-[50px] translate-y-5 transition-all duration-200 group-hover:translate-y-11"
          />
          <img
            src="/encr/LockMain.png"
            alt="Lock Main"
            width={70}
            height={70}
            className="z-10"
          />
        </div>

        <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#7042f88b] opacity-[0.9]">
          <h1 className="Welcome-text text-white text-[12px]">click me</h1>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute z-[20] bottom-[10px] px-[5px]">
        <div className="cursive text-[20px] font-medium text-center text-gray-300">
          Secure your data with end-to-end encryption
        </div>
      </div>

      {/* Background video */}
      <div className="w-full flex items-start justify-center absolute z-[0]">
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="none"
          className="w-full h-auto"
          src="/encr/encryption.webm"
        />
      </div>

      {/* Login Popup Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-[30] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1e1e2f] text-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded bg-[#2a2a3d] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 rounded bg-[#2a2a3d] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded text-white font-semibold"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={toggleLoginPopup}
                className="text-sm text-gray-400 hover:text-white mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Encryption;
