import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const transactions = [
  {
    date: "12/11/2020",
    time: "10:31:20 AM",
    wallet: "Aru",
    amount: "0.5268 BTC",
    result: "RECEIVED",
    status: "SUCCESS",
  },
];

const TransactionTable = () => {
  return (
    <div className="p-8  text-gray-300 rounded-lg">
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
          {transactions.map((transaction, index) => (
            <TableRow key={index} className="border-b border-gray-800">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                    <img
                        src="/btc-icon.svg"
                        className="w-8 h-8"
                        alt="btc"
                        />
                  <div>
                    <div>{transaction.date}</div>
                    <div className="text-xs text-gray-500">
                      {transaction.time}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{transaction.wallet}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell className="text-[#8484F1]">
                <span className="flex items-center">
                <img
                    src="/downwardArrow.svg"
                    className="w-3 h-3 mr-2"
                    alt="btc"
                    />
                  {transaction.result}
                </span>
              </TableCell>
              <TableCell className="text-[#8484F1]">
                {transaction.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
