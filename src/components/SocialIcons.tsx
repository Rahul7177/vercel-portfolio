import Link from "next/link";
import React from "react";
import "../style/SocialIcons.css";
import {
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

const SocialIcons = () => {
  const socialLinks = [
    { name: "Github", icon: <FiGithub />, link: "https://www.github.com/Rahul7177" },
    // { name: "Youtube", icon: <FiYoutube />, link: "https://www.youtube.com/rahulraj/" },
    { name: "LinkedIn", icon: <FiLinkedin />, link: "https://www.linkedin.com/in/rahul-raj-5637a7230/" },
    { name: "Instagram", icon: <FiInstagram />, link: "https://instagram.com/rahulx_31" },
    { name: "Twitter", icon: <FiTwitter />, link: "https://twitter.com/Rahul02258712" },
  ];

  return (
    <div className="social-icons fixed bottom-0 left-8 hidden md:block">
      <ul className="social-icons-list list-none flex flex-col gap-0 transition-all duration-300 ease-in-out">
        {socialLinks.map(({ name, icon, link }) => (
          <li
            key={name}
            title={name}
            className="social-icons-list-item text-xl flex justify-center items-center transition-all duration-200 ease-in-out"
          >
            <Link
              href={link}
              className="social-icons-list-item-link p-4 py-3 text-[#233554] outline-2 outline-dashed outline-transparent"
              target="_blank"
            >
              {icon}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialIcons;
