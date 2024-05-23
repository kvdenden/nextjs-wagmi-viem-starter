'use client'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { ConnectButton as RainbowkitConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from './ui/button'

export function ConnectButton() {
  const { isConnected, isConnecting, isReconnecting } = useAccount()
  const { openConnectModal } = useConnectModal()
  if (isConnected) {
    return <RainbowkitConnectButton />
  }
  if (isConnecting || isReconnecting) {
    return <Button disabled>Connecting...</Button>
  }
  return <Button onClick={openConnectModal}>Connect</Button>
}
