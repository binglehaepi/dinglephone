import React from 'react';

interface PhoneShellProps {
  children: React.ReactNode;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({ children }) => {
  return (
    <div className="relative w-[390px] h-[844px] bg-cream-100 rounded-[44px] shadow-elevated overflow-hidden border-4 border-cream-300">
      {/* Soft Frame Border */}
      <div className="absolute inset-0 rounded-[44px] border-[4px] border-cream-50/50 pointer-events-none z-[100]" />
      
      {/* Screen Content */}
      <div className="w-full h-full rounded-[40px] overflow-hidden bg-cream-100 relative">
        {children}
      </div>

      {/* Side Buttons */}
      <div className="absolute -left-[3px] top-[120px] w-[3px] h-[26px] bg-cream-400 rounded-l-md" />
      <div className="absolute -left-[3px] top-[160px] w-[3px] h-[40px] bg-cream-400 rounded-l-md" />
      <div className="absolute -right-[3px] top-[140px] w-[3px] h-[50px] bg-cream-400 rounded-r-md" />
    </div>
  );
};
