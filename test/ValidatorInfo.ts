import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { MockedSFC, ValidatorInfo } from "../typechain-types";

describe("ValidatorInfo", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployValidatorInfoFixture() {
    const [owner, validator1, validator2, validator3, nonValidator1]: HardhatEthersSigner[] = await ethers.getSigners();

    const sfc = (await ethers.deployContract("MockedSFC")) as unknown as MockedSFC;
    await sfc.waitForDeployment();
    await sfc.updateCurrentSealedEpoch(1);
    await sfc.addValidatorID(validator1.address, 1);
    await sfc.addValidatorID(validator2.address, 2);
    await sfc.addValidatorID(validator3.address, 3);

    const ValidatorInfo = await ethers.getContractFactory("ValidatorInfo");
    const validatorInfo = (await upgrades.deployProxy(ValidatorInfo, [owner.address, await sfc.getAddress()])) as unknown as ValidatorInfo;

    return { validatorInfo, sfc, owner, validator1, validator2, validator3, nonValidator1 };
  }

  it("Should deploy", async function () {
    const { validatorInfo, sfc, owner } = await loadFixture(deployValidatorInfoFixture);
    expect(await validatorInfo.owner()).to.equal(owner.address);
    expect(await validatorInfo.sfcContractAddress()).to.equal(await sfc.getAddress());
  });

  it("Should add validator info", async function () {
    const { validatorInfo, sfc, validator1, validator2, validator3 } = await loadFixture(deployValidatorInfoFixture);
    await validatorInfo.connect(validator1).updateInfo("https://example.com/myinfo1.json");
    await validatorInfo.connect(validator2).updateInfo("https://example.com/myinfo2.json");
    await validatorInfo.connect(validator3).updateInfo("https://example.com/myinfo3.json");

    expect(await validatorInfo.getInfo(1)).to.be.equal("https://example.com/myinfo1.json");
    expect(await validatorInfo.getInfo(2)).to.be.equal("https://example.com/myinfo2.json");
    expect(await validatorInfo.getInfo(3)).to.be.equal("https://example.com/myinfo3.json");
  });

  it("Should not add validator info if not validator", async function () {
    const { validatorInfo, sfc, nonValidator1 } = await loadFixture(deployValidatorInfoFixture);
    await expect(validatorInfo.connect(nonValidator1).updateInfo("https://example.com/myinfo1.json")).to.be.rejectedWith("Address does not belong to a validator!");
  });
});
