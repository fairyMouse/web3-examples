import { goerli } from "@wagmi/core/chains";

console.log("goerli:", goerli);
export const blockExplorerUrl = goerli.blockExplorers.default.url;
