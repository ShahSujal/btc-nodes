const NavBar = () => {
  return (
    <nav className=" flex justify-between px-[80px] items-center flex-row w-full h-[90px]">
      <div className=" flex flex-row text-white justify-between w-[77px] font-extrabold text-[15px] items-center space-x-3">
        <img
          src="/cySync.svg"
          alt="CySync Logo"
          className="h-[23px] w-[18px]"
        />
        <h3>cySync</h3>
      </div>
      {/* sync button */}
      <button className="text-[#E0B36A] bg-transparent text-[17px] w-[74px] flex flex-row justify-center items-center">
        <h2>Synced</h2>
        <img
          src="/synced.svg"
          alt="CySync Logo"
          className="h-[15.74px] mx-[8px] w-[11.08px]"
        />
      </button>
    </nav>
  );
};

export default NavBar;
