"use client";

import React from "react";
import Link from "next/link";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

// Social links data
const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: FiGithub,
    url: "https://www.github.com/Rahul7177",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://www.linkedin.com/in/rahul-raj-5637a7230/",
  },
  {
    name: "Twitter",
    icon: FiTwitter,
    url: "https://twitter.com/Rahul02258712",
  },
  {
    name: "Instagram",
    icon: FiInstagram,
    url: "https://instagram.com/rahulx_31",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 text-[var(--dark-text)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="flex flex-row items-center space-x-6 mb-4">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-xl hover:text-[var(--theme-color)] hover:-translate-y-1 transition-all duration-300"
            >
              <social.icon />
            </Link>
          ))}
        </div>

        <div className="text-center font-mono text-xs">
          <p className="mb-1">
            <Link
              href="https://github.com/Rahul7177/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--theme-color)] transition-colors duration-300"
            >
              💖 Designed & Built by Rahul Raj
            </Link>
          </p>
          <p>&copy; {currentYear} | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;