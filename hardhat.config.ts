import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@openzeppelin/hardhat-upgrades";

const x1Accounts = [];
if (process.env.PRIVATE_KEY) {
  x1Accounts.push(process.env.PRIVATE_KEY);
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      evmVersion: "london",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "x1-testnet": {
      url: "https://x1-testnet.xen.network",
      accounts: x1Accounts,
      gasMultiplier: 2,
    },
  },
  etherscan: {
    apiKey: {
      "x1-testnet": "anything here",
    },

    customChains: [
      {
        network: "x1-testnet",
        chainId: 204005,
        urls: {
          apiURL: "https://explorer.x1-testnet.infrafc.org/api",
          browserURL: "https://explorer.x1-testnet.infrafc.org/",
        },
      },
    ],
  },
};

export default config;
