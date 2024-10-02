import React from 'react';
import NavBar from '@/components/global/navbar';
import SideBar from '@/components/global/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex-col bg-[#1A1F26]">
      <NavBar />
      <div className="flex flex-row items-center justify-center">
        <SideBar /> 
          {children}
      </div>
    </div>
  );
};

export default Layout;