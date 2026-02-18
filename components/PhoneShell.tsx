import React from 'react';

interface PhoneShellProps {
  children: React.ReactNode;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({ children }) => {
  return (
    <div className="relative w-[380px] h-[800px] bg-[#FEFCFB] rounded-[48px] shadow-[0_0_0_8px_#F5F0EB,0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden ring-1 ring-black/5">
      {/* Soft Frame Border */}
      <div className="absolute inset-0 rounded-[48px] border-[6px] border-white/50 pointer-events-none z-[100]" />
      
      {/* Screen Content */}
      <div className="w-full h-full rounded-[42px] overflow-hidden bg-[#FEFCFB] relative">
        {children}
      </div>

      {/* Buttons */}
      <div className="absolute -left-[3px] top-[120px] w-[3px] h-[26px] bg-[#E8E0D8] rounded-l-md" />
      <div className="absolute -left-[3px] top-[160px] w-[3px] h-[40px] bg-[#E8E0D8] rounded-l-md" />
      <div className="absolute -right-[3px] top-[140px] w-[3px] h-[50px] bg-[#E8E0D8] rounded-r-md" />
    </div>
  );
};