import { siderbarTabs } from "@/lib/constant/sidebar";
import { useSidebar } from "@/lib/rtk/store/hooks";
import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: JSX.Element;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `w-full h-[44px] border-b border-[#1E2328] my-3 cursor-pointer flex items-start flex-row ${
        isActive ? "text-[#C0996F] " : "text-white"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <div
          className={`w-[3px] h-[30px]`} 
          style={
            isActive ? {background: "#C0996F", boxShadow:"0px 0px 8px 2px #C0996F"} : {background: "transparent"}
          }
        ></div>
        <div className="flex flex-row justify-center items-center ml-[40px] space-x-4">
          <div className={`w-[23px] h-[21px] rounded-[3px] items-center flex justify-center ${isActive ? " text-[#C0996F] shadow-sm shadow-[#C0996F]" : "text-gray-400"} `} >
           {icon}
          </div>
          <h2>{label}</h2>
        </div>
      </>
    )}
  </NavLink>
);
const SideBar: React.FC = () => {

  const { isOpen} = useSidebar();
  return (
    <div className={`bg-[#161C23] w-[250px] relative rounded-[10px] h-[calc(100vh-110px)] flex flex-col items-start justify-between ${isOpen ? "max-sm:flex fixed left-0 top-[90px]": "max-sm:hidden"} `}>
      <div>
        {siderbarTabs.map((tab) => (
          <NavItem
            key={tab.to}
            to={tab.to}
            icon={tab.icon}
            label={tab.label}
          />
        ))}
      </div>
      <button className="w-full h-[45px] bg-[#4B3C2B] rounded-br-[10px] rounded-bl-[10px]">
        Support
      </button>
    </div>
  );
};

export default SideBar;
