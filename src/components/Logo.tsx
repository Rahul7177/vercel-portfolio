import React from "react";

function Logo() {
  return (
    <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-14 py-0">
      <title>Logo</title>
      <g>
        {/* New RR Text */}
        <text
          x="50"
          y="60"
          textAnchor="middle"
          fontSize="25"
          fill="currentColor"
          fontWeight="bold"
        >
          RR
        </text>

        {/* Hexagonal Outline */}
        <path
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          d="M 50, 5
             L 11, 27
             L 11, 72
             L 50, 95
             L 89, 73
             L 89, 28 z"
        />
      </g>
    </svg>
  );
}

export default Logo;
