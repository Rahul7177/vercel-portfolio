// import Link from 'next/link';
import React from 'react';

const Button = ({text, link}:{text: string; link: string}) => {
  return (
    <a 
      download 
      href={link} 
      className="
      btn
        // Base Styles
        bg-transparent text-sm text-[var(--dark-text)]
        border-2 border-solid border-neutral-900 rounded-[3px]  font-semibold
        px-3 py-2 w-fit

        // Transitions
        transition-all duration-300 ease-out

        // Hover State
        // hover:bg-neutral-800 hover:text-white hover:-translate-y-1 hover:shadow-lg

        // Focus State (for accessibility)
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-800
      "
    >
        {text}
    </a>
  )
}

export default Button;