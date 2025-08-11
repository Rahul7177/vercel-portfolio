"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "../style/Experience.css";

const experiences = [
    {
        name: "Spectov",
        role: "Full Stack Developer Intern",
        url: "https://www.spectov.in",
        start: "May 2024",
        end: "Feb 2025",
        shortDescription: [
          "Optimized RESTful APIs, cutting average response time by 35% and improving frontend load speed by 40% through lazy loading and code splitting.",
          "Redesigned the company website using ReactJS and GSAP animations, boosting UI/UX and driving a 65% increase in user impressions.",
          "Led a team of 6 to build a scalable internal training portal, improving onboarding and increasing course enrollments by 40%.",
          "Worked across the full stack with a focus on performance, scalability, and clean architecture.",
        ],
      },
      {
        name: "GDSC",
        role: "Web Developer Volunteer",
        url: "https://gdsc.community.dev/",
        start: "March 2023",
        end: "July 2024",
        shortDescription: [
          "Volunteered to build and maintain web projects for the university chapter, enhancing the club's online presence and engagement.",
          "Collaborated with a team of student developers, fostering a community of learning and shared growth through pair programming and code reviews.",
          "Organized and led workshops on web development fundamentals, helping to upskill dozens of fellow students.",
          "Gained practical experience with Git, version control, and collaborative workflows.",
        ],
      },
];

function Experience() {
  const [selected, setSelected] = useState(0);

  return (
    <motion.div
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{ visible: { opacity: 1, y: -50 }, hidden: { opacity: 0, y: 0 } }}
      className="my-32 px-4 max-w-screen-xl mx-auto text-justify experience-section bg-white p-8 shadow-lg rounded-2xl border-4 border-neutral-700 border-b-12"
    >
      <div className="flex items-center gap-4 mb-8 title-wrapper">
        <h2 className="text-4xl font-extrabold font-raleway text-[var(--dark-text)] whitespace-nowrap section-title">
          Experience
        </h2>
        <div className="w-full h-[2px] bg-[var(--dark-text)]"></div>
      </div>

      <div className="grid grid-cols-[20%_80%] gap-4 experience-grid">
        <ul className="relative h-max overflow-hidden list-none flex-col experience-tabs">
          <div
            className="underline absolute left-[-0.5px] w-[3px] bg-[var(--theme-color)] transition-all duration-300 ease-in-out vertical-tab-ui "
            style={{ height: "3rem", top: `${selected * 3}rem` }}
          />
          <div className="absolute left-0 top-0 w-[1px] h-full bg-[var(--lightest-navy)] vertical-tab-ui" />

          {experiences.map((experience, index) => (
            <li
              key={experience.name}
              onClick={() => setSelected(index)}
              className={`h-[3rem] px-6 flex items-center cursor-pointer text-md w-full tab-item ${
                selected === index ? "active" : ""
              }`}
            >
              <span className="text-[var(--dark-text)] font-fira-code w-full pl-2">
                {experience.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="min-h-[40vh] font-raleway experience-content">
          <div className="text-[var(--extra-dark-text)]">
            <h3 className="text-lg font-semibold job-role text-start w-full">
              {experiences[selected].role}
              <span className="text-[var(--theme-color)]">
                &nbsp;@&nbsp;
                <Link
                  href={experiences[selected].url}
                  className="hover:underline text-[var(--theme-color)]"
                >
                  {experiences[selected].name}
                </Link>
              </span>
            </h3>
            <p className="text-[var(--extra-dark-text)] job-dates">
              {experiences[selected].start} - {experiences[selected].end}
            </p>
            <ul className="flex flex-col gap-4 mt-4 pl-0 list-none">
              {experiences[selected].shortDescription.map((desc, idx) => (
                <li
                  key={idx}
                  className="relative text-[var(--dark-text)] font-medium w-3/4 job-description-item"
                >
                  <span className="absolute left-[-20px] top-[6px] text-[var(--theme-color)]">
                    ▹
                  </span>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Experience;