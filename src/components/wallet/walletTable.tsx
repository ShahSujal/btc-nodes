import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type Props = {}

const WalletTable = (props: Props) => {
    
  return (
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
      )
}

export default WalletTable