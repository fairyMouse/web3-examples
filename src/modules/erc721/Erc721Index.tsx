import { useErc721Context } from "@/src/provider/Erc721Provider";
import { useWalletContext } from "@/src/provider/WalletProvider";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import NFTCard from "./components/NFTCard";
import { toast } from "react-toastify";

const Erc721Index = () => {
  const { account } = useWalletContext();
  const { erc721ProviderContract, erc721SignerContract } = useErc721Context();
  const [list, setList] = useState<any[]>([]);
  const [minting, setMinting] = useState(false);

  useEffect(() => {
    updateNFTList();
  }, [erc721ProviderContract]);

  const updateNFTList = async () => {
    if (erc721ProviderContract) {
      const res = await erc721ProviderContract.getDonkeys(account);
      const list = res.toArray().map((item: any) => item.toObject());

      console.log("setList:", list);
      setList(list);
    }
  };

  const mintNFT = async () => {
    console.log("mintNFT");
    if (account && erc721SignerContract) {
      try {
        setMinting(true);

        const res = await erc721SignerContract.safeMint(account);
        console.log("结果信息:", res);
        const receipt = await res.wait();
        console.log("收据信息:", receipt);

        updateNFTList();
        toast.success("successfully minted!");
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
      } finally {
        setMinting(false);
      }
    }
  };
  return (
    <Container>
      <Stack flexDirection={"row"} justifyContent={"center"} sx={{ mt: 4 }}>
        <LoadingButton
          sx={{ width: 120 }}
          onClick={mintNFT}
          loading={minting}
          loadingIndicator={"minting..."}
        >
          Mint NFT
        </LoadingButton>
      </Stack>
      <Box
        sx={{ mt: 5 }}
        display="grid"
        gridTemplateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {list.map(item => (
          <NFTCard key={item.uri} data={item} />
        ))}
      </Box>
    </Container>
  );
};

export default Erc721Index;
