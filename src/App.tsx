import { Button } from "@/components/ui/button";

import WalletTable from "@/components/wallet/walletTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addWallet } from "@/lib/rtk/slice/walletsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Wallet } from "@/types/common";
import { btcImportWallet } from "@/lib/actions";
import { EStatus } from "@/types/enum";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  walletname: z.string().min(4, {
    message: "Wallet Name must be at least 4 characters.",
  }),
  mnemonic: z.string().min(20, {
    message: "Mnemonic Name must be at least 20 characters.",
  }),
});

const App = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletname: "",
      mnemonic: "",
    },
  });
  const wallets = useSelector(
    (state: { wallets: { wallets: Wallet[] } }) => state.wallets.wallets
  );
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const checkMenonic = btcImportWallet(values.mnemonic);
      if (checkMenonic.status === EStatus.Error) {
        toast({
          title: "Error",
          description: checkMenonic.message,
        });
      }
      dispatch(
        addWallet({ mnemonic: values.mnemonic, walletName: values.walletname })
      );
      form.reset();
      toast({
        title: "Success",
        description: `Wallet address ${checkMenonic.message.slice(
          0,
          10
        )}.. added successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Something went wrong`,
      });
    }
  }

  return (
    <div className="relative flex flex-col items-center w-full h-full ">
      <div className=" w-full h-[60px] flex justify-end items-end ">
        <Dialog>
          <DialogTrigger>
            <Button
              variant={"default"}
              className="bg-[#191E26] hover:bg-[#191E26] uppercase border-[0.5px] border-[#242830] text-white"
            >
              <img src="/addWallet.svg" className="w-3 h-3 mr-1 " alt="" />{" "}
              import wallet
            </Button>
          </DialogTrigger>
          <DialogContent className=" bg-[#171C23] w-[750px] max-sm:w-full h-[450px] flex justify-evenly items-center flex-col">
            <DialogHeader>
              <DialogTitle>Import Wallet</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center w-full justify-evenly"
              >
                <FormField
                  control={form.control}
                  name="walletname"
                  render={({ field }) => (
                    <FormItem className="text-[#A6A2A2] w-2/3 max-sm:w-full">
                      <FormLabel>Enter your wallet name:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          className=" max-w-lg bg-[#20242B]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mnemonic"
                  render={({ field }) => (
                    <FormItem className="text-[#A6A2A2] my-3 w-2/3 max-sm:w-full">
                      <FormLabel>Enter your Mnemonic:</FormLabel>
                      <FormControl>
                        <Textarea
                          className=" max-w-lg bg-[#20242B] min-h-[90px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-[#DB953C] hover:bg-[#f4a845]"
                  variant={"ghost"}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {wallets.length > 0 ? (
        <div className="w-full ">
          <h1 className=" w-10/12 border-b py-3 border-[#1A1F26] pl-7 mt-20 mb-6 text-[12px] ml-4 text-[#ADABAA]">
            Total Wallets - {wallets.length}
          </h1>
          <div className="w-10/12 ">
            <WalletTable />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[360px]">
          <h1 className="text-[#C78D4E] text-[20px]">No Wallets Added</h1>
          <p className="text-gray-600">Add your first wallet to get started</p>
        </div>
      )}
    </div>
  );
};

export default App;
