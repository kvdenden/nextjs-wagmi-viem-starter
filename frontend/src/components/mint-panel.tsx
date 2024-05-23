'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useReadContracts, useWriteContract } from 'wagmi'
import { signatureMinterAbi, nftAbi } from '@/web3/abi'
import { CardDescription } from '@/components/ui/card'
import { formatEther } from 'viem'

export default function MintPanel() {
  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [quantity, setQuantity] = useState(1)
  const [mintHash, setMintHash] = useState<`0x${string}` | null>(null)
  const {
    data: balanceData,
    isError: balanceError,
    isLoading: balanceLoading,
  } = useBalance({
    address: address,
  })

  const nftContract = {
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: nftAbi,
  }
  const signatureMinterContract = {
    address: process.env.NEXT_PUBLIC_MINTER_CONTRACT_ADDRESS as `0x${string}`,
    abi: signatureMinterAbi,
  }

  const {
    data: mintData,
    isError: mintDataIsError,
    isLoading: mintDataIsLoading,
  } = useReadContracts({
    contracts: [
      { ...signatureMinterContract, functionName: 'getPublicSaleConfig' },
      { ...signatureMinterContract, functionName: 'getMintSupply' },
      { ...nftContract, functionName: 'totalSupply' },
    ],
  })

  const publicSaleConfig = mintData && mintData[0].result
  const mintSupply = mintData && mintData[1].result
  const totalSupply = mintData && mintData[2].result
  const price = publicSaleConfig && BigInt(quantity) * publicSaleConfig.unitPrice

  //mint logic:wip
  const { data: hash, writeContract, error } = useWriteContract()

  const handleMint = async () => {
    if (!publicSaleConfig) return
    console.log('minting')
    writeContract({
      ...nftContract,
      functionName: 'mint',
      args: [address as `0x${string}`, BigInt(quantity)],
    })
    setMintHash(hash as `0x${string}`)
  }

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handlePlus = () => {
    if (!publicSaleConfig) return
    if (quantity < publicSaleConfig.maxPerTransaction) {
      setQuantity(quantity + 1)
    }
  }

  if (mintDataIsLoading) {
    return (
      <Button className='w-full mt-6' disabled>
        Loading...
      </Button>
    )
  }
  if (!isConnected) {
    return (
      <Button className='w-full mt-6' onClick={openConnectModal}>
        Connect to mint
      </Button>
    )
  }

  if (publicSaleConfig && !publicSaleConfig.enabled) {
    return (
      <Button className='w-full mt-6' disabled>
        Public sale is disabled
      </Button>
    )
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between my-2'>
        {/* the first number needs to be updated */}
        <CardDescription className='my-2'>
          {mintSupply ? mintSupply.toString() : '-'}/{mintSupply ? mintSupply.toString() : '-'}
        </CardDescription>
        <CardDescription className='my-2'>
          {publicSaleConfig ? formatEther(publicSaleConfig.unitPrice).toString() : '-'} ETH
        </CardDescription>
      </div>
      <div className='flex'>
        <div className='flex items-center justify-center gap-4 pr-4'>
          <Button size='icon' variant='outline' onClick={handleMinus} disabled={quantity == 1}>
            <MinusIcon className='h-4 w-4' />
          </Button>
          <span className='text-xl font-semibold'>{quantity}</span>
          <Button
            size='icon'
            variant='outline'
            disabled={publicSaleConfig && quantity == publicSaleConfig.maxPerTransaction}
            onClick={handlePlus}
          >
            <PlusIcon className='h-4 w-4' />
          </Button>
        </div>
        <Button
          onClick={handleMint}
          className='w-full'
          disabled={price && balanceData ? price > balanceData?.value : true}
        >
          Mint
        </Button>
      </div>
    </div>
  )
}
