import TransactionTable from "./transactionTable";

const Transaction = () => {
  return (
    <div className="w-[calc(100%-350px)] h-[calc(100vh-110px)]  flex flex-col items-center  ">
      <div className="  h-[60px] flex justify-start w-10/12 items-start ">
      <h1 className=" text-[#C78D4E] font-bold text-[20px]">Transactions</h1>      
      </div>

      <h1
        className=" w-10/12 border-b py-3 border-[#1A1F26] pl-7 mt-20 mb-6 text-[12px] ml-4 text-[#ADABAA]
"
      >
        Total Transaction - 7
      </h1>
      {/* <WalletTable/> */}
      <div className=" w-10/12">
        <TransactionTable/>
      </div>
    </div>
  );
};

export default Transaction;
