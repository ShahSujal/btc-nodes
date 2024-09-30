import { siderbarTabs } from "@/lib/constant/sidebar";
import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  to: string;
  iconSrc: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, iconSrc, label }) => (
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
          className={`w-[3px] h-[30px] ${
            isActive ? "bg-[#C0996F] shadow-md" : "bg-transparent"
          }`}
        ></div>
        <div className="flex flex-row justify-center items-center ml-[40px] space-x-4">
          <div className="bg-[#1E2328] w-[23px] h-[21px] rounded-[3px] items-center flex justify-center">
            <img src={iconSrc} alt={label} className="h-[11px] w-[14.5px]" />
          </div>
          <h2>{label}</h2>
        </div>
      </>
    )}
  </NavLink>
);
const SideBar: React.FC = () => {
  return (
    <div className="bg-[#161C23] w-[250px] rounded-[10px] h-[calc(100vh-110px)] flex flex-col items-start justify-between">
      <div>
        {siderbarTabs.map((tab) => (
          <NavItem
            key={tab.to}
            to={tab.to}
            iconSrc={tab.iconSrc}
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
