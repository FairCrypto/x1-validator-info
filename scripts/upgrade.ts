import { ethers, upgrades } from "hardhat";

require("dotenv").config();

const VALIDATOR_INFO_ADDRESS = process.env.VALIDATOR_INFO_ADDRESS || "";

async function main() {
  const ValidatorInfo = await ethers.getContractFactory("ValidatorInfo");
  const validatorInfo = await upgrades.upgradeProxy(
    VALIDATOR_INFO_ADDRESS,
    ValidatorInfo,
  );
  await validatorInfo.waitForDeployment();
  const validatorInfoAddr = await validatorInfo.getAddress();
  console.log("ValidatorInfo deployed to:", validatorInfoAddr);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
