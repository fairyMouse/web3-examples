import { useErc721Context } from "@/src/provider/Erc721Provider";
import { useWalletContext } from "@/src/provider/WalletProvider";
import { LoadingButton } from "@mui/lab";
import { Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import NFTCard from "./components/NFTCard";
import { ethers } from "ethers";

const Erc721Index = () => {
  const { account } = useWalletContext();
  const { erc721ProviderContract } = useErc721Context();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    init();
  }, [erc721ProviderContract]);

  const init = async () => {
    if (erc721ProviderContract) {
      const res = await erc721ProviderContract.getDonkeys(account);
      const list = res.toArray().map((item: any) => item.toObject());

      setList(list);
    }
  };

  const mintNFT = () => {
    console.log("mintNFT");
  };
  return (
    <Container>
      <Stack flexDirection={"row"} justifyContent={"center"} sx={{ mt: 4 }}>
        <LoadingButton sx={{ width: 120 }} onClick={mintNFT}>
          Mint NFT
        </LoadingButton>
      </Stack>
      <Stack flexDirection={"row"}>
        {list.map(item => {
          return <NFTCard key={item.uri} data={item} />;
        })}
      </Stack>
    </Container>
  );
};

export default Erc721Index;
