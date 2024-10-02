import React from 'react';
import NavBar from '@/components/global/navbar';
import SideBar from '@/components/global/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#1A1F26]">
      <NavBar />
      <div className="flex flex-row h-[calc(100vh-110px)] justify-center items-center w-full">
        <SideBar /> 
          <div className='w-[calc(100%-350px)] max-sm:w-full relative h-full'>
            {children}
          </div>
      </div>
    </div>
  );
};

export default Layout;