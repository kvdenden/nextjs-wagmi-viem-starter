import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/lib/site_config";
import Image from "next/image";
import MintPanel from "./mint-panel";

export function MintCard() {
  return (
    <Card>
      <CardHeader>
        <Image
          src="/nft-example.webp"
          alt="placeholder"
          width={300}
          height={300}
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{siteConfig.name}</CardTitle>
        <div className="flex justify-between">
          <CardDescription className="my-2">1234/10000</CardDescription>
          <CardDescription className="my-2">0.01 ETH</CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <MintPanel />
      </CardFooter>
    </Card>
  );
}
