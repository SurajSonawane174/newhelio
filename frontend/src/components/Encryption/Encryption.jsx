import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

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
  // "idle" -> lock closed, "open" -> form visible, "success" -> granted, "error" -> denied
  const [status, setStatus] = useState("idle");
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLockClick = () => {
    if (status === "idle") setStatus("open");
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // CRUCIAL: Ensures your secure session cookie is stored in the browser
        credentials: 'include', 
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        setStatus("success");
        // Redirect to dashboard after showing the success animation
        setTimeout(() => {
          window.location.href = '/admin/dashboard'; 
        }, 1500);
      } else {
        setStatus("error");
        // Re-open the form after showing the error and clear the password
        setTimeout(() => {
          setStatus("open");
          setCredentials((prev) => ({ ...prev, password: "" }));
        }, 1800);
      }
    } catch (err) {
      // Catch network errors (backend offline)
      setStatus("error");
      setTimeout(() => {
        setStatus("open");
        setCredentials((prev) => ({ ...prev, password: "" }));
      }, 1800);
    }
  };

  return (
    <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full overflow-hidden">
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

      {/* Lock Area */}
      <motion.div
        className="flex flex-col items-center justify-center absolute z-[20] w-auto h-auto"
        animate={{ y: status === "idle" ? -50 : -110 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <div
          onClick={handleLockClick}
          className={`flex flex-col items-center group w-auto h-auto ${
            status === "idle" ? "cursor-pointer" : ""
          }`}
        >
          <motion.img
            src="/encr/LockTop.png"
            alt="Lock top"
            width={50}
            height={50}
            className="w-[50px] z-0"
            animate={
              status === "success"
                ? { y: [-8, -22, 20] } // pop fully open, then snap shut
                : { y: status === "idle" ? 20 : -8 } // open/error = shackle lifted, idle = closed
            }
            transition={
              status === "success"
                ? { duration: 0.9, times: [0, 0.4, 1], ease: "easeInOut" }
                : { type: "spring", stiffness: 150, damping: 12 }
            }
          />
          <img
            src="/encr/LockMain.png"
            alt="Lock Main"
            width={70}
            height={70}
            className="z-10"
          />
        </div>
      </motion.div>

      {/* Dynamic Action Area (Form, Success, or Error) */}
      <div className="absolute z-[20] flex flex-col items-center justify-center w-auto h-auto translate-y-[80px]">
        <AnimatePresence mode="wait">
          {status === "open" && (
            <motion.form
              key="login-form"
              onSubmit={handleLogin}
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute flex flex-col gap-4 w-[240px] bg-[#1e1e2f]/90 border border-[#7042f88b] rounded-lg p-5 backdrop-blur-sm shadow-[0_0_20px_rgba(112,66,248,0.2)]"
            >
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Username"
                autoComplete="off"
                className="relative top-0 left-0 w-full p-2.5 text-sm rounded bg-[#2a2a3d] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Password"
                className="relative top-0 left-0 w-full p-2.5 text-sm rounded bg-[#2a2a3d] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <button
                type="submit"
                className="relative w-full mt-1 bg-gradient-to-r from-purple-500 to-cyan-500 p-2.5 rounded text-white font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_15px_rgba(112,66,248,0.5)] transition-all active:scale-95"
              >
                Access
              </button>
            </motion.form>
          )}

          {status === "success" && (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-2 text-sm text-cyan-400 font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
            >
              <span>Access Granted</span>
              <motion.span
                initial={{ scale: 0, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 15 }}
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              </motion.span>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error-message"
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center gap-2 text-sm text-red-500 font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
            >
              <span>Access Denied</span>
              <motion.span
                initial={{ scale: 0, rotate: 45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
              >
                <XCircle className="w-5 h-5 text-red-500" />
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
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
    </div>
  );
};

export default Encryption;