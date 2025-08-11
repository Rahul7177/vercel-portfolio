'use client'
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Button from '@/components/Button';
import "../style/Hero.css";
import gsap from 'gsap';

import { 
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiMongodb, 
  SiHtml5, SiCss3, SiGithub, SiCplusplus, 
  SiGit, SiGooglegemini 
} from 'react-icons/si';

const techLogos = [
  SiCplusplus, SiJavascript, SiNodedotjs, SiReact, SiGithub, 
  SiHtml5, SiCss3, SiExpress, SiMongodb, SiGit, SiGooglegemini
];

type AnimatedItem = {
    id: number;
    IconComponent: React.ComponentType<{ className?: string }>;
    left: string;
    duration: string;
    delay: string;
    size: string;
};

const Hero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [animatedItems, setAnimatedItems] = useState<AnimatedItem[]>([]);

  const componentRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2);
      const y = (clientY - innerHeight / 2);
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- UPDATED: All icons now have the same fixed scroll speed and size ---
    const numLanes = 5;
    const iconsPerLane = 3;
    // All icons take 20s to scroll, ensuring they all move at the same speed.
    const animationDuration = 12; 
    const staggerDelay = animationDuration / iconsPerLane; // Time between icons in the same lane

    const items = [];
    let iconCounter = 0;

    for (let i = 0; i < numLanes; i++) {
      // Each lane starts at a slightly different time for a more natural effect.
      const laneInitialDelay = Math.random() * staggerDelay; 
      for (let j = 0; j < iconsPerLane; j++) {
        const laneIndex = i;
        const leftPosition = 60 + (laneIndex * (40 / numLanes));
        
        items.push({
          id: iconCounter++,
          IconComponent: techLogos[(i * iconsPerLane + j) % techLogos.length],
          left: `${leftPosition}%`,
          duration: `${animationDuration}s`,
          delay: `${laneInitialDelay + j * staggerDelay}s`,
          // FIXED: All icons are now the same size for a uniform look.
          size: 'text-4xl' 
        });
      }
    }
    setAnimatedItems(items);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useLayoutEffect(() => {
    const component = componentRef.current;
    const content = heroContentRef.current;

    if (!component || !content) return;

    const ctx = gsap.context(() => {
      const timelineElements = gsap.utils.toArray(content.children);
      
      gsap.from(timelineElements, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
      });

    }, component);

    return () => ctx.revert();
  }, []);
  
  const parallaxStyle = {
    transform: `translateX(${position.x / -30}px) translateY(${position.y / -30}px)`,
    transition: 'transform 0.1s ease-out'
  };

  return (
    <div ref={componentRef} className="hero flex flex-col items-start justify-center gap-6 mt-8 mb-8 px-12 min-h-fit hero-section py-8 bg-white rounded-2xl shadow-lg relative overflow-hidden border-4 border-neutral-600 border-b-12">
      
      {/* Background Icons Layer */}
      <div 
        style={parallaxStyle} 
        className="absolute inset-0 z-0 font-raleway font-medium pointer-events-none"
      >
        {animatedItems.map(item => (
          <div
            key={item.id}
            className={`scrolling-snippet`}
            style={{
              left: item.left,
              animationDuration: item.duration,
              animationDelay: item.delay,
            }}
          >
            <item.IconComponent className={item.size} /> 
          </div>
        ))}
      </div>


      {/* Text Content Layer */}
      <div ref={heroContentRef} className="relative z-10 flex flex-col items-start gap-6">
        <h1 className="hero-title text-[var(--extra-dark-text)] text-md font-firacode tracking-normal ml-1">
          Hi, my name is
        </h1>
        <h2 className="hero-title-large font-raleway font-extrabold uppercase text-[var(--dark-text)] text-7xl text-shadow-lg">
          Rahul Raj
        </h2>
        <div className="flex flex-wrap items-baseline gap-x-4">
          <h3 className="hero-title-sub font-raleway font-extrabold text-neutral-700 capitalize text-7xl -mt-2">
            I code things that
          </h3>
          <span className="hero-title-sub font-raleway font-extrabold text-[var(--theme-color)] text-7xl uppercase text-shadow-lg mt-4">
            matters.
          </span>
        </div>
        <div className="hero-button mt-4 text-xl">
          <Button text="Check out my Work" link="https://github.com/Rahul7177" />
        </div>
      </div>
    </div>
  )
}

export default Hero;
