"use client";

import React from "react";
import Link from "next/link";
import { FiFolder, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
// import Button from "@/components/Button";

// Define the type for a single project
interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
}

// Data for the project cards
const projectsData: Project[] = [
  {
    title: "Typespeed - A typing web app",
    description: "Built to measure the typing speed and accuracy.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Rahul7177/TypeSpeed",
  },
  {
    title: "Voice Assistant",
    description: "A voice controlled assistant to communicate and perform minor tasks.",
    tech: ["Python", "Pyttsx3", "Speech Recognition"],
    link: "#",
  },
  {
    title: "Time to Have More Fun",
    description: "A single page web app for helping me choose where to travel, built with Next.js, Firebase, and Tailwind CSS.",
    tech: ["Next.js", "TypeScript", "Firebase"],
    link: "#",
  },
  {
    title: "Apple Music Clone",
    description: "A clone of the Apple Music web app, built with Next.js and the Apple Music API.",
    tech: ["Next.js", "Apple Music API", "Tailwind CSS"],
    link: "#",
  },
  {
    title: "OctoProfile",
    description: "A nicer look at your GitHub profile and repository stats with data visualizations of your top languages.",
    tech: ["Next.js", "Chart.js", "GitHub API"],
    link: "#",
  },
  {
    title: "Spotify Profile",
    description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played songs, and more.",
    tech: ["Next.js", "Spotify API", "SWR"],
    link: "#",
  },
];

const MoreProjects = () => {
  return (
    <motion.section 
      className="max-w-4xl mx-auto px-0 py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: -50 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <div className="text-center">
        <h2 className="text-4xl  text-[var(--dark-text)] mb-4 font-raleway font-extrabold">
          Other Noteworthy Projects
        </h2>
        <Link 
          href="http//:github.com/Rahul7177" 
          className="font-mono text-md text-[var(--theme-color)] hover:underline"
        >
          View the archive
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 cursor-pointer">
        {projectsData.map((project, index) => (
          <motion.div 
            key={index}
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-600 to-neutral-900 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative flex flex-col justify-between h-full bg-white rounded-lg p-6 transition-transform duration-300 group-hover:-translate-y-2 shadow-2xl">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <FiFolder className="text-4xl text-[var(--dark-text)]" />
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink className="text-2xl text-[var(--dark-text)] hover:text-[var(--theme-color)] transition-colors" />
                  </Link>
                </div>
                <h3 className="text-lg font-raleway font-bold text-[var(--dark-text)] mb-2 group-hover:text-[var(--theme-color)] transition-colors">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </Link>
                </h3>
                <p className="text-[var(--dark-text)] text-sm leading-relaxed font-raleway">
                  {project.description}
                </p>
              </div>
              <ul className="flex flex-wrap gap-x-4 mt-6 font-firacode text-sm text-[var(--dark-text)]">
                {project.tech.map((techItem, techIndex) => (
                  <li key={techIndex}>{techItem}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

    </motion.section>
  );
};

export default MoreProjects;