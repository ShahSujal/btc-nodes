import { TSideBarTab } from "@/types/common";

export const siderbarTabs:TSideBarTab[] = [
  {
    to: "/",
    iconSrc: "/wallet.svg",
    label: "Wallets",
  },
  {
    to: "/transactions",
    iconSrc: "/arrows.svg",
    label: "Last Transaction",
  },
];
