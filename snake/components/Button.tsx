import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', variant = 'primary' }) => {
  const baseStyle = "px-6 py-3 font-mono text-lg font-bold tracking-widest uppercase transition-all duration-200 border-2 rounded-sm focus:outline-none";
  
  const variants = {
    primary: "border-cyber-neonGreen text-cyber-neonGreen hover:bg-cyber-neonGreen hover:text-black shadow-[0_0_10px_#39ff14] hover:shadow-[0_0_20px_#39ff14]",
    secondary: "border-cyber-neonPink text-cyber-neonPink hover:bg-cyber-neonPink hover:text-black shadow-[0_0_10px_#ff00ff] hover:shadow-[0_0_20px_#ff00ff]"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};