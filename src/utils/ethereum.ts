export async function switchToEthereum(chainId?: string) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: chainId || "0x5",
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
}
