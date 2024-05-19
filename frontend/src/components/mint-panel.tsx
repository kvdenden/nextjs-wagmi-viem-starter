"use client";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function MintPanel() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    return (
      <Button className="w-full" onClick={openConnectModal}>
        Connect to mint
      </Button>
    );
  }
  return (
    <>
      <div className="flex items-center justify-center gap-4 pr-4">
        <Button size="icon" variant="outline">
          <MinusIcon className="h-4 w-4" />
        </Button>
        <span className="text-xl font-semibold">1</span>
        <Button size="icon" variant="outline">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <Button className="w-full">Mint</Button>
    </>
  );
}
