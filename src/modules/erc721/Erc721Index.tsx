import { LoadingButton } from "@mui/lab";
import { Box, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import NFTCard from "./components/NFTCard";
import { toast } from "react-toastify";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {
  CONNECT_WALLET_TEXT,
  ERC721_CONTRACT_ADDR,
} from "@/src/constants/wallet";
import RandomNFT_ABI from "src/constants/abi/RandomNFT.abi.json";
import { IContractParams } from "../erc20/types";

const Erc721Index = () => {
  const { address } = useAccount();

  const ERC721ContractParams: IContractParams = {
    address: ERC721_CONTRACT_ADDR,
    abi: RandomNFT_ABI,
  };

  const { data: nftList, refetch } = useContractRead({
    ...ERC721ContractParams,
    functionName: "getDonkeys",
    args: [address || "0x"],
    enabled: !!address,
  }) as any;

  console.log("nftList:", nftList);

  const { data, error, isError, isLoading, write } = useContractWrite({
    ...ERC721ContractParams,
    functionName: "safeMint",
  });

  const { isSuccess, isLoading: isTxLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("successfully minted!");
      refetch();
    }
  }, [isSuccess, refetch]);

  const mintNFT = async () => {
    write &&
      write({
        args: [address],
      });
  };
  return (
    <Container>
      <Stack flexDirection={"row"} justifyContent={"center"} sx={{ mt: 4 }}>
        <LoadingButton
          sx={{ minWidth: 120 }}
          disabled={!address}
          onClick={mintNFT}
          loading={isLoading || isTxLoading}
          loadingIndicator={"minting..."}
        >
          {address ? "Mint NFT" : CONNECT_WALLET_TEXT}
        </LoadingButton>
      </Stack>
      <Box
        gap={2}
        sx={{ mt: 5 }}
        display="grid"
        gridTemplateColumns={{
          sm: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {nftList?.map((nft: any) => (
          <NFTCard key={nft.uri} data={nft} />
        ))}
      </Box>
    </Container>
  );
};

export default Erc721Index;
