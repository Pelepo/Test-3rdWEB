import Image from "next/image";
import { Inter } from "next/font/google";
import { Web3Button } from '@thirdweb-dev/react';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      hello
      <Web3Button contractAddress="0x4f03afe5efda121b8eaa806febd1427cb2a0a6db"
        action={async (contract) => {
          const nextTokenIdToMint = parseInt(await contract.call("nextTokenIdToMint", []));
          const metadatas = [{ name: "Cool NFT", description: "This is a cool NFT", image: "ciao" }]
          const prepareMint = await contract.erc1155.lazyMint.prepare(metadatas);

          let encodedMint = prepareMint.encode()
          const claimConditions = [{ startTime: new Date(), price: 0.001, maxClaimableSupply: 1 }];
          let preparedClaimCondition = await contract.erc1155.claimConditions.set.prepare(nextTokenIdToMint, claimConditions, true);
          let encodedClaimCondition = preparedClaimCondition.encode()

          const transaction = await contract.call("multicall", [[encodedMint, encodedClaimCondition]]);
          console.log(transaction);

        }}>MINTA</Web3Button>
    </>
  );
}
