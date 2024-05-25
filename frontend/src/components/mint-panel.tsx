'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { signatureMinterAbi, nftAbi } from '@/web3/abi'
import { CardDescription } from '@/components/ui/card'
import { formatEther } from 'viem'

export default function MintPanel() {
  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [quantity, setQuantity] = useState(BigInt(1))
  const [mintHash, setMintHash] = useState<`0x${string}` | null>(null)
  const [buttonText, setButtonText] = useState('Mint')
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
    refetch: refetchMintData,
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
  const price = publicSaleConfig && quantity * publicSaleConfig.unitPrice

  const { data: hash, writeContract, isPending, isError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: mintHash as `0x${string}`,
  })

  const handleMint = async () => {
    if (!publicSaleConfig) return
    if (price && balanceData) {
      if (price > balanceData.value) {
        console.log('Insufficient balance', price > balanceData.value)
        return
      }
    }
    setButtonText('Sign in wallet')
    writeContract({
      ...signatureMinterContract,
      functionName: 'publicMint',
      args: [quantity],
      value: price as bigint,
    })
    setMintHash(hash as `0x${string}`)
  }

  useEffect(() => {
    if (isPending) {
      setButtonText('Confirm in wallet')
    } else if (isConfirming) {
      setButtonText('Confirming transaction')
    } else {
      setButtonText('Mint')
      setQuantity(BigInt(1))
      refetchMintData()
    }
  }, [isConfirmed, isConfirming, isPending, isError])

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - BigInt(1))
    }
  }

  const handlePlus = () => {
    if (!publicSaleConfig) return
    if (quantity < publicSaleConfig.maxPerTransaction) {
      setQuantity(quantity + BigInt(1))
    }
  }

  if (mintDataIsLoading || isConfirming) {
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
        <CardDescription className='my-2'>
          {mintSupply && totalSupply ? totalSupply.toString() : '-'}/{mintSupply ? mintSupply.toString() : '-'}
        </CardDescription>
        <CardDescription className='my-2'>
          {publicSaleConfig ? formatEther(publicSaleConfig.unitPrice).toString() : '-'} ETH
        </CardDescription>
      </div>
      <div className='flex'>
        <div className='flex items-center justify-center gap-4 pr-4'>
          <Button size='icon' variant='outline' onClick={handleMinus} disabled={quantity == BigInt(1)}>
            <MinusIcon className='h-4 w-4' />
          </Button>
          <span className='text-xl font-semibold'>{quantity.toString()}</span>
          <Button
            size='icon'
            variant='outline'
            disabled={publicSaleConfig && quantity == BigInt(publicSaleConfig.maxPerTransaction)}
            onClick={handlePlus}
          >
            <PlusIcon className='h-4 w-4' />
          </Button>
        </div>
        <Button
          onClick={handleMint}
          className='w-full'
          disabled={price && balanceData ? price > balanceData?.value || isConfirming : true}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
