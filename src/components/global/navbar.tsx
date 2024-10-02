import { useToast } from "@/hooks/use-toast";
import { useLazyGetWalletTransactionsQuery } from "@/lib/rtk/query/getAllTransactions";
import { useLazyGetWalletBalanaceQuery } from "@/lib/rtk/query/walletDetailsSlice";
import { updateWalletTransactions } from "@/lib/rtk/slice/transactionSlice";
import { updateWalletBalance } from "@/lib/rtk/slice/walletBalanceSlice";
import { useSidebar } from "@/lib/rtk/store/hooks";
import { Wallet } from "@/types/common";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const { toggle, isOpen } = useSidebar();
  const { toast } = useToast();
  const location = useLocation();
  const wallets = useSelector(
    (state: { wallets: { wallets: Wallet[] } }) => state.wallets.wallets
  );
  const [triggerGetBalance] = useLazyGetWalletBalanaceQuery();
  const [triggerGetWalletTransactions] = useLazyGetWalletTransactionsQuery();
  const dispatch = useDispatch();
  const synced = async () => {
    try {
      if (location.pathname === "/transactions") {
        wallets.forEach(async (wallet: Wallet) => {
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

        toast({
          title: "Success",
          description: `Synced successfully transactions`,
        });

      } else if (location.pathname === "/") {
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

        toast({
          title: "Success",
          description: `Synced successfully balance`,
        }); 
      } else {
        toast({
          title: "Error",
          description: `Error in syncing`,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `Error in syncing`,
      });
    }
  };

  return (
    <nav className=" flex justify-between px-[80px] max-sm:px-2 items-center flex-row w-full h-[90px]">
      <div className=" flex flex-row text-white justify-between w-[77px] font-extrabold text-[15px] font-Avenir items-center space-x-3">
        <img
          src="/cySync.svg"
          alt="CySync Logo"
          className="h-[23px] w-[18px]"
        />
        <h3>cySync</h3>
      </div>
      {/* sync button */}
      <div className="flex flex-row items-center justify-center ">
        <button className="text-[#E0B36A]  bg-transparent text-[17px] w-[74px] flex flex-row justify-center items-center" onClick={()=>{
          synced()
        }}>
          <h2>Synced</h2>
          <img
            src="/synced.svg"
            alt="CySync Logo"
            className="h-[15.74px] mx-[8px] w-[11.08px]"
          />
        </button>
        <button
          className="text-[#E0B36A] ml-3 max-sm:flex bg-transparent text-[22px] hidden flex-row justify-center items-center"
          onClick={() => {
            toggle();
          }}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
