namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_NFT_CONTRACT_ADDRESS: `0x${string}`
    NEXT_PUBLIC_MINTER_CONTRACT_ADDRESS: `0x${string}`

    ALLOWLIST_SIGNER_PRIVATE_KEY: `0x${string}`
    PRESALE_IDS?: string
  }
}
