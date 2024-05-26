import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { siteConfig } from '@/lib/site_config'
import Image from 'next/image'
import MintPanel from './mint-panel'

export function MintCard() {
  return (
    <Card>
      <CardHeader className='px-0 pt-0'>
        <Image src='/nft-example.webp' alt='placeholder' width={400} height={400} />
      </CardHeader>
      <CardContent className='py-0'>
        <CardTitle>{siteConfig.name}</CardTitle>
      </CardContent>
      <CardFooter>
        <MintPanel />
      </CardFooter>
    </Card>
  )
}
