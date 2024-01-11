pragma solidity ^0.8.20;

// SPDX-License-Identifier: mit

// for testing purposes only

contract MockedSFC {
    mapping(address => uint256) public getValidatorID;
    mapping(uint256 => EpochSnapshot) public getEpochSnapshot;
    uint256 public currentSealedEpoch;

    struct EpochSnapshot {
        mapping(uint256 => uint256) receivedStake;
        mapping(uint256 => uint256) accumulatedRewardPerToken;
        mapping(uint256 => uint256) accumulatedUptime;
        mapping(uint256 => uint256) accumulatedOriginatedTxsFee;
        mapping(uint256 => uint256) offlineTime;
        mapping(uint256 => uint256) offlineBlocks;
        uint256[] validatorIDs;
        uint256 endTime;
        uint256 epochFee;
        uint256 totalBaseRewardWeight;
        uint256 totalTxRewardWeight;
        uint256 baseRewardPerSecond;
        uint256 totalStake;
        uint256 totalSupply;
    }

    function getEpochValidatorIDs(
        uint256 epoch
    ) public view returns (uint256[] memory) {
        return getEpochSnapshot[epoch].validatorIDs;
    }

    function updateCurrentSealedEpoch(uint256 epoch) public {
        currentSealedEpoch = epoch;
    }

    function addValidatorID(address addr, uint256 id) public {
        getValidatorID[addr] = id;
        getEpochSnapshot[currentSealedEpoch].validatorIDs.push(id);
    }
}
