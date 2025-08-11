"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  // State to track the mouse position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // State to track if the cursor is hovering over an interactive element
  const [isHovering, setIsHovering] = useState(false);
  // State to track mouse clicks for the hit effect
  const [isClicked, setIsClicked] = useState(false);
  // State to determine if the custom cursor should be visible
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable the custom cursor on non-touch devices with a larger screen
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      setIsVisible(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add mousemove listener
    window.addEventListener("mousemove", handleMouseMove);

    // --- Logic for hover and click effects ---
    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Add click listeners
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Select all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input[type="submit"]'
    );

    // Add event listeners to all interactive elements
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  // Define variants for the cursor animation
  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      border: "2px solid black",
    },
    hovering: {
      scale: 3,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid #404040",
    },
    clicked: {
      scale: 0.8, // Shrink the main dot on click
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  };

  // Do not render the component on smaller screens
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: position.x - 8, // Center the dot
          translateY: position.y - 8,
        }}
        variants={cursorVariants}
        animate={isClicked ? "clicked" : isHovering ? "hovering" : "default"}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      {/* The click ripple effect */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9999]"
            style={{
              translateX: position.x - 24,
              translateY: position.y - 24,
              border: "2px solid black",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
