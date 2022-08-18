import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { network } from "hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      forking: {
        url: "https://mainnet.infura.io/v3/e92c38757159497d97aad034c8e59232",
        //@ts-ignore
        // blockGasLimit: 200000000000,
        // gasPrice: 80000000000,
      }
    },
  }
};

export default config;
