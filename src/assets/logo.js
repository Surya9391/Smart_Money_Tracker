import React from 'react';

// This is a simple SVG logo component that resembles the SmartMoney logo
const Logo = (props) => (
  <svg 
    width={props.width || 180}
    height={props.height || 60}
    viewBox="0 0 180 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Buildings */}
    <rect x="5" y="10" width="20" height="50" fill="#424242" />
    <rect x="30" y="25" width="20" height="35" fill="#424242" />
    
    {/* Window lines on buildings */}
    <rect x="10" y="15" width="3" height="10" fill="#FFFFFF" />
    <rect x="10" y="30" width="3" height="10" fill="#FFFFFF" />
    <rect x="10" y="45" width="3" height="10" fill="#FFFFFF" />
    
    <rect x="17" y="15" width="3" height="10" fill="#FFFFFF" />
    <rect x="17" y="30" width="3" height="10" fill="#FFFFFF" />
    <rect x="17" y="45" width="3" height="10" fill="#FFFFFF" />
    
    <rect x="35" y="30" width="3" height="10" fill="#FFFFFF" />
    <rect x="35" y="45" width="3" height="10" fill="#FFFFFF" />
    
    <rect x="42" y="30" width="3" height="10" fill="#FFFFFF" />
    <rect x="42" y="45" width="3" height="10" fill="#FFFFFF" />
    
    {/* Green house */}
    <polygon points="65,40 80,25 95,40" fill="#7cb342" />
    <rect x="70" y="40" width="20" height="20" fill="#7cb342" />
    
    {/* House window */}
    <rect x="75" y="45" width="10" height="10" fill="#FFFFFF" />
    <rect x="77" y="47" width="6" height="6" fill="#7cb342" />
    
    {/* SMART MONEY text */}
    <text x="100" y="35" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#424242">SMART</text>
    <text x="100" y="55" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#7cb342">MONEY</text>
  </svg>
);

export default Logo; 