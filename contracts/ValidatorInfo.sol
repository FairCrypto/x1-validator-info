// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface SFC {
    function getValidatorID(address addr) external view returns (uint256);
}

/// @dev The ValidatorInfo contract.
/// @author The Faircrypto team.
contract ValidatorInfo is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address initialOwner,
        address sfcContractAddress_
    ) public initializer {
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        sfcContractAddress = sfcContractAddress_;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    address public sfcContractAddress;
    mapping(uint => string) public validatorInfos;

    event InfoUpdated(uint256 stakerID);

    /// @dev Update the SFC contract address.
    function updateSfcContractAddress(
        address sfcContractAddress_
    ) external onlyOwner {
        sfcContractAddress = sfcContractAddress_;
    }

    /// @dev Update the config url of a validator.
    function updateInfo(string calldata configUrl) external {
        SFC sfc = SFC(sfcContractAddress);

        // Get Validator ID from the SFC contract
        uint256 validatorID = sfc.getValidatorID(msg.sender);

        // Check if address belongs to a validator
        require(validatorID != 0, "Address does not belong to a validator!");

        // Update config url
        validatorInfos[validatorID] = configUrl;

        emit InfoUpdated(validatorID);
    }

    /// @dev Get the config url of a validator.
    function getInfo(
        uint256 validatorId
    ) external view returns (string memory) {
        return validatorInfos[validatorId];
    }
}
