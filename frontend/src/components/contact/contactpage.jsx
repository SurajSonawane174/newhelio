import React from "react";
import Form from "./Form"; // Adjust path as needed
import StarsCanvas from "../Encryption/StarCanvas";
import bg from "/backgrounds/bg-2.jpg"; // Adjust path as needed

import { GlobeDemo } from "./GlobeDemo";
export default function Contact() {
  return (
    <>
      <StarsCanvas></StarsCanvas>
      {/* Background Image */}
      <img
        src={bg}
        alt="Contact page background"
        className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-95"

      />

      <article className="relative w-full flex flex-col items-center justify-center py-8 sm:py-0 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-6 w-full mt-[7rem] sm:w-3/4">
          <h1 className="bg-gradient-to-r from-[#7e57c2] to-[#00bcd4] bg-clip-text text-transparent font-semibold text-center text-4xl capitalize">
            Contact the Codecaster
          </h1>
          <p className="text-center font-light text-[#919191] text-sm xs:text-base">
            Step into the circle of enchantment and weave your words into the
            fabric of the cosmos. Whether you seek to conjure collaborations,
            unlock mysteries, or simply share tales of adventure, your messages
            are treasured scrolls within this realm. Use the form below to send
            your missives through the ethereal network, and await the whisper of
            magic in response.
          </p>
        </div>
        <GlobeDemo></GlobeDemo>

        <Form />
      </article>
    </>
  );
}

