"use client";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ConnectButton as RainbowkitConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";

export function ConnectButton() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected) {
    return <RainbowkitConnectButton />;
  }
  return <Button onClick={openConnectModal}>Connect</Button>;
}
