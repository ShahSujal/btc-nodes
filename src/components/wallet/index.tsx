import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WalletTable from "./walletTable";

const Wallet = () => {
  return (
    <div className="w-[calc(100%-350px)] h-[calc(100vh-110px)]  flex flex-col items-center  ">
      <div className=" w-full h-[60px] flex justify-end items-end ">
        <Button
          variant={"default"}
          className="bg-[#191E26] hover:bg-[#191E26] uppercase border-[0.5px] border-[#242830]"
        >
          <img src="/addWallet.svg" className=" w-3 h-3 mr-1" alt="" /> import
          wallet
        </Button>
      </div>

      <h1
        className=" w-10/12 border-b py-3 border-[#1A1F26] pl-7 mt-20 mb-6 text-[12px] ml-4 text-[#ADABAA]
"
      >
        Total Coins - 7
      </h1>
      {/* <WalletTable/> */}
      <div className=" w-10/12">
        <Table className="">
          <TableHeader>
            <TableRow className=" flex justify-around items-center flex-row bg-[#161c2300] hover:bg-[#161C23] border-none">
              <TableHead className="ml-5">Coin</TableHead>
              <TableHead className="ml-16">Holding</TableHead>
              <TableHead className="ml-5">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className=" flex text-[#ADABAA] py-3 items-center justify-around flex-row bg-[#161C23] hover:bg-[#161C23]">
              <TableCell className="font-medium flex flex-row uppercase justify-center items-center">
                <img src="/btc-icon.svg" className=" w-8 h-8 " alt="btc" />{" "}
                Bitcoin
              </TableCell>
              <TableCell>BTC 0.00454</TableCell>
              <TableCell>
                <button className=" bg-transparent outline-none">
                  {" "}
                  <img src="/trash.svg" className=" w-4 h-4 " alt="" />
                </button>{" "}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Wallet;
