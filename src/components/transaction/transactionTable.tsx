import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLazyGetWalletTransactionsQuery } from "@/lib/rtk/query/getAllTransactions";
import { useAppDispatch } from "@/lib/rtk/store/hooks";
import { updateWalletTransactions } from "@/lib/rtk/slice/transactionSlice";
import { TRootLayout, Txref, Wallet } from "@/types/common";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const TransactionTable = () => {
  const dispatch = useAppDispatch();
  const wallets = useSelector(
    (state: { wallets: { wallets: Wallet[] } }) => state.wallets.wallets
  );
  const walletTransactions = useSelector(
    (state: TRootLayout) => state
  );
  const [triggerGetWalletTransactions] = useLazyGetWalletTransactionsQuery();

  useEffect(() => {
    const intervalId = setInterval(() => {
    //  wallets.forEach(async (address: Wallet) => {
      [ // Exxample for reference
        {
          address: "tb1qzv6g0kat7frr50vqgh75y68q8l0mxfvp4ugphl",
          walletName: "Satoshi Nakamoto",
        },
      ].forEach(async (address: Wallet) => {
        const result = await triggerGetWalletTransactions(
          address.address,
          true
        ); 

        if (result.data) {
          dispatch(
            updateWalletTransactions({
              address: address.address,
              transactions: result.data,
            })
          );
        }
      });
    }, 2000); // 2 seconds interval

    return () => clearInterval(intervalId); 
  }, [walletTransactions, dispatch, triggerGetWalletTransactions]);

  const sortedTransactions = useMemo(() => {
    const allTransactions = Object.keys(walletTransactions).reduce(
      (acc: Txref[], address: string) => {
        return acc.concat(walletTransactions[address] || []);
      },
      []
    );

    return allTransactions.sort(
      (a: Txref, b: Txref) =>
        new Date(b.confirmed).getTime() - new Date(a.confirmed).getTime()
    );
  }, [walletTransactions]);

  return (
    <div className="p-8 text-gray-300 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-800">
            <TableHead className="text-gray-400">Coin</TableHead>
            <TableHead className="text-gray-400">Wallet</TableHead>
            <TableHead className="text-gray-400">Amount</TableHead>
            <TableHead className="text-gray-400">Result</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
           {sortedTransactions.length > 0 ? sortedTransactions.map((transaction, index) => (
            <TableRow key={index} className="border-b border-gray-800">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <img src="/btc-icon.svg" className="w-8 h-8" alt="btc" />
                  <div>
                    <div>{transaction.confirmed.toDateString()}</div>
                    <div className="text-xs text-gray-500">
                      {transaction.confirmed.getTime()}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{transaction.spent}</TableCell>
              <TableCell>{transaction.value}</TableCell>
              <TableCell className="text-[#8484F1]">
                <span className="flex items-center">
                  <img
                    src="/downwardArrow.svg"
                    className={`w-3 h-3 mr-2 ${transaction.spent ? "transform rotate-180" : ""}`}
                    alt="btc"
                  />
                  {transaction.spent ? "Sent" : "Received"}
                </span>
              </TableCell>
              <TableCell className="text-[#8484F1]">
                {transaction.confirmed.toTimeString()}
              </TableCell>
            </TableRow>
          )): (
            <div className="flex flex-col items-center justify-center w-full h-[260px]">
              <h1 className="text-[#C78D4E] text-[20px]">No Transaction</h1>
              <p className="text-gray-600">let&apos;s pay your first friend </p>
            </div>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
