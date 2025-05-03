"use client";

import React, { useState, useEffect } from "react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else if (window.scrollY === 0) {
        setIsVisible(false);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 ${
        isVisible ? "block" : "hidden"
      } p-2 font-bold bg-white text-blue-500 text-3xl rounded-full cursor-pointer w-12 h-12 flex items-center justify-center border-double border-4 border-blue-500 hover:text-white hover:bg-blue-500`}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;