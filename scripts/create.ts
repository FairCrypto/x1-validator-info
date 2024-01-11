import { ethers, upgrades } from "hardhat";
import type { Contract } from "ethers";

require("dotenv").config();

const SFC_ADDRESS =
  process.env.SFC_ADDRESS || "0xFC00FACE00000000000000000000000000000000";

export async function main(): Promise<Contract> {
  const [deployerAccount] = await ethers.getSigners();

  const ValidatorInfo = await ethers.getContractFactory("ValidatorInfo");
  const validatorInfo = await upgrades.deployProxy(ValidatorInfo, [
    deployerAccount.address,
    SFC_ADDRESS,
  ]);
  await validatorInfo.waitForDeployment();
  const validatorInfoAddress = await validatorInfo.getAddress();
  console.log("validatorInfo deployed to:", validatorInfoAddress);

  return validatorInfo;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
