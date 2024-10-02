import { useSelector } from "react-redux";
import TransactionTable from "./transactionTable";
import { Wallet } from "@/types/common";

const Transactions = () => {
  const wallets = useSelector(
    (state: { wallets: { wallets: Wallet[] } }) => state.wallets.wallets
  );
  return (
    <div className="w-[calc(100%-350px)] max-sm:w-full h-[calc(100vh-110px)]  flex flex-col items-center  ">
      <div className="  h-[60px] flex justify-start w-10/12 items-start ">
        <h1 className=" text-[#C78D4E] font-bold text-[20px]">Transactions</h1>
      </div>
      {wallets.length > 0 ? (
        <div className="flex flex-col items-center justify-center w-full ">
          <h1 className=" w-10/12 border-b py-3 border-[#1A1F26] pl-7 mt-20 mb-6 text-[12px] ml-4 text-[#ADABAA]">
            Total Transaction - 
          </h1>
          <div className="w-10/12 ">
            <TransactionTable />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[260px]">
          <h1 className="text-[#C78D4E] text-[20px]">No Wallet found</h1>
          <p className="text-center text-gray-600">
            let&apos;s add your first wallet to check transactions{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
