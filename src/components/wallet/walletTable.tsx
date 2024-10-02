import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { TBalanceLayout, Wallet } from "@/types/common";
import { useLazyGetWalletBalanaceQuery } from "@/lib/rtk/query/walletDetailsSlice";
import { updateWalletBalance } from "@/lib/rtk/slice/walletBalanceSlice";
import { useEffect } from "react";
import { deleteWallet } from "@/lib/rtk/slice/walletsSlice";

const WalletTable = () => {
  const dispatch = useDispatch();
  const wallets = useSelector(
    (state: { wallets: { wallets: Wallet[] } }) => state.wallets.wallets
  );
  const walletBalances = useSelector(
    (state: { walletBalances: TBalanceLayout }) => state.walletBalances
  );

  const [triggerGetBalance] = useLazyGetWalletBalanaceQuery();

  useEffect(() => {
    const intervalId = setInterval(() => {
      // [
      //   // Exxample for reference
      //   {
      //     address: "tb1qzv6g0kat7frr50vqgh75y68q8l0mxfvp4ugphl",
      //     walletName: "Satoshi Nakamoto",
      //   },
      // ].forEach(async (wallet: Wallet) => {
     wallets.forEach(async (wallet: Wallet) => {
        const result = await triggerGetBalance(wallet.address, true);
        if (result.data) {
          dispatch(
            updateWalletBalance({
              address: wallet.address,
              balance: result.data,
            })
          );
        }
      });
    }, 2000); // 2 seconds interval

    return () => clearInterval(intervalId);
  }, [dispatch, triggerGetBalance, wallets]);
  const handleDelete = (address: string) => {
    dispatch(deleteWallet(address));
  };

  return (
    <Table className="w-full ">
      <TableHeader>
        <TableRow className="flex justify-around items-center flex-row bg-[#161c2300] hover:bg-[#161C23] border-none">
          <TableHead className="ml-5">Coin</TableHead>
          <TableHead className="ml-16">Holding</TableHead>
          <TableHead className="ml-5">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ScrollArea>
          {/* {[
            // Exxample for reference
            {
              address: "tb1qzv6g0kat7frr50vqgh75y68q8l0mxfvp4ugphl",
              walletName: "Satoshi Nakamoto",
            },
          ].map((wallet: Wallet) => { */}
          {wallets.map((wallet: Wallet) => {
            const balance = walletBalances[wallet.address];
            console.log(balance);

            return (
              <TableRow
                key={wallet.address}
                className="flex justify-around items-center flex-row border-b border-[#1A1F26] hover:bg-[#161C23]"
              >
                <TableCell className="ml-5">{wallet.walletName}</TableCell>
                <TableCell className="ml-16">{balance?.balance}</TableCell>
                <TableCell className="ml-5">
                  <button
                    className=""
                    onClick={() => handleDelete(wallet.address)}
                  >
                    <img src="/trash.svg" className="w-5 h-5 " />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </ScrollArea>
      </TableBody>
    </Table>
  );
};

export default WalletTable;
