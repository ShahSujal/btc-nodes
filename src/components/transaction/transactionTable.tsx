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
import { updateTotalTransactions } from "@/lib/rtk/slice/totalTransactions";
const TransactionTable = () => {
  const dispatch = useAppDispatch();
  const wallets = useSelector(
    (state: { wallets: { wallets: Wallet[] } }) => state.wallets.wallets
  );
  const walletTransactions = useSelector(
    (state: TRootLayout) => state.transactions
  );
  const [triggerGetWalletTransactions] = useLazyGetWalletTransactionsQuery();

  useEffect(() => {
    const intervalId = setInterval(() => {
     wallets.forEach(async (wallet: Wallet) => {
      // [ // Exxample for reference
      //   {
      //     address: "tb1qzv6g0kat7frr50vqgh75y68q8l0mxfvp4ugphl",
      //     walletName: "Sujal shah",
      //   },
      // ].forEach(async (wallet: Wallet) => {
        const result = await triggerGetWalletTransactions(
          wallet.address,
          true
        ); 
        if (result.data) {
          dispatch(
            updateWalletTransactions({
              address: wallet.address,
              transactions: result.data,
              walletName: wallet.walletName,
            })
          );
        }
      });
    }, 2000); // 2 seconds interval

    return () => clearInterval(intervalId); 
  }, [wallets, dispatch, triggerGetWalletTransactions]);

  const sortedTransactions = useMemo(() => {
    const allTransactions = Object.values(walletTransactions).flat();
    const sorted = allTransactions.sort(
      (a: Txref, b: Txref) =>
        new Date(b.confirmed).getTime() - new Date(a.confirmed).getTime()
    );
    dispatch(updateTotalTransactions({
      transactions: sorted.length
    }));
    return sorted;
  }, [walletTransactions]);



  return (
    <div className="p-8 text-gray-300 rounded-lg">

  
       <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-gray-800">
            <TableHead className="text-gray-400">Coin</TableHead>
            <TableHead className="text-gray-400">Wallet</TableHead>
            <TableHead className="text-gray-400">Amount</TableHead>
            <TableHead className="text-gray-400">Result</TableHead>
            <TableHead className="text-gray-400">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {sortedTransactions.length > 0 ? sortedTransactions.map((transaction, index) => {
            const confirmedDate = transaction.confirmed ? new Date(transaction.confirmed) : null;
            return (
              <TableRow key={index} className="border-b border-gray-800">
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <img src="/btc-icon.svg" className="w-8 h-8" alt="btc" />
                    <div>
                      <div>{confirmedDate ? confirmedDate.toDateString() : 'N/A'}</div>
                      <div className="text-xs text-gray-500">
                        {confirmedDate ? confirmedDate.getTime() : 'N/A'}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{transaction.walletName}</TableCell>
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
                  {transaction.confirmations > 10 ? "Success" : 'Pending'}
                </TableCell>
              </TableRow>
            );
          }) : (
            <TableRow className="flex flex-col items-center justify-center w-full h-[260px]">
              <h1 className="text-[#C78D4E] text-[20px]">No Transaction</h1>
              <p className="text-gray-600">Let's pay your first friend</p>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;