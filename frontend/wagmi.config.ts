import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/web3/abi.ts",
  contracts: [],
  plugins: [
    foundry({
      project: "../contracts",
      include: ["NFT.sol/**", "SignatureMinter.sol/**"],
    }),
  ],
});
