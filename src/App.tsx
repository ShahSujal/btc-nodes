import NavBar from "./components/global/navbar";
import SideBar from "./components/global/sidebar";
import Transaction from "./components/transaction";
import Wallet from "./components/wallet";

function App() {
  return (
    <div className=" w-full min-h-screen bg-[#1A1F26]">
      <NavBar />
      <div className="flex flex-row items-center justify-center ">
        <SideBar />
        {/* <Wallet /> */}

        {/* <button>click</button> */}
        {/* <Transaction/> */}
        <Wallet/>
      </div>
    </div>
  );
}

export default App;
