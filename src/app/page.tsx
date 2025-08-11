import React from 'react'
import SocialIcons from '@/components/SocialIcons';
import Email from '@/components/Email';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';

// Note: Navbar, Footer, CustomCursor, fonts, and globals.css are removed
// because they are now handled by app/layout.tsx

const HomePage = () => {
  return (
    // The main wrapper div is no longer needed
    <>
      <SocialIcons/>
      <Email/>
      <main className='px-6 sm:px-12 md:px-20 lg:px-32 py-2 flex flex-col gap-12 sm:gap-14 md:gap-16 graph-paper-bg'>
        <Hero/>
        <About/>
        <Experience/>
        <Projects/>
        <Contact/>
      </main>
    </>
  )
}

export default HomePage;