import NavBar from "../global/navbar";
import SideBar from "../global/sidebar";
import Transactions from "./transactions";

function TransactionPage() {
  
  return (
    <div className=" w-full min-h-screen bg-[#1A1F26]">
      <NavBar />
      <div className="flex flex-row items-center justify-center ">
        <SideBar />
        <Transactions/>
      </div>
    </div>
  );
}

export default TransactionPage;
