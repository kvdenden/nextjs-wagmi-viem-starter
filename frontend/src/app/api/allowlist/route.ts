import { NextRequest, NextResponse } from 'next/server'
import { encodePacked, keccak256, toBytes } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const account = searchParams.get('account')

  if (!account) return NextResponse.json({ error: 'Account not provided!' }, { status: 400 })

  const signer = privateKeyToAccount(process.env.ALLOWLIST_SIGNER_PRIVATE_KEY)

  const presaleIds = process.env.PRESALE_IDS ? process.env.PRESALE_IDS.split(',') : []

  for (const saleId of presaleIds) {
    try {
      const { allowlist } = await import(`./data/${saleId}.json`)

      const nonce = allowlist.map((address: string) => address.toLowerCase()).indexOf(account.toLowerCase())

      if (nonce !== -1) {
        const dataHash = keccak256(
          encodePacked(['uint256', 'uint256', 'address'], [BigInt(saleId), BigInt(nonce), account as `0x${string}`])
        )
        const signature = await signer.signMessage({
          message: { raw: toBytes(dataHash) },
        })

        return NextResponse.json({ saleId, nonce, signature })
      }
    } catch (e) {
      console.error(e)
    }
  }

  return NextResponse.json({ error: 'Account not allowlisted!' }, { status: 404 })
}
