# X1 Validator Info Contract

This project contains the smart contract that stores the validator information for the X1 network.

## Register a Validator

Register a validator name and icon to help X1 delegators find you.

> Testnet contract

```solidity
0x891416e8bDB4437d4D0D303781A3828262220581
```

### Config File

Create a config file in `JSON` format that contains the following parameters (you can also leave parameters empty):

```js
{
  "name": "VALIDATOR_NAME", /* Name of the validator */
  "logoUrl": "LOGO_URL", /* Validator logo (PNG|JPEG|SVG) - 100px x 100px is enough */
  "website": "WEBSITE_URL", /* Website icon on the right */
  "contact": "CONTACT_URL" /* Contact icon on the right */
}
```

> It could look something like this 👇

```json
{
  "name": "xencrypto1",
  "logoUrl": "https://xen.network/XEN-logo-square-dark%20512x512.png",
  "website": "https://xen.network",
  "contact": "https://t.me/XENCryptoTalk"
}
```

Then host the file somewhere, so it is publicly accessible! Ex: https://x1-testnet-genesis.s3.amazonaws.com/xencrypto1.json

### Update your info in the smart contract

#### From the Explorer

Visit the [ValidatorInfo](https://explorer.x1-testnet.xen.network/address/0x891416e8bDB4437d4D0D303781A3828262220581/write-proxy#address-tabs) contract in the explorer and call the `updateInfo` function with your config file URL.

![images/updateInfo.png](images/updateInfo.png)

Click `Write` and use your Validator wallet to sign the transaction.

#### Or from the console

1. Connect to your validator node
2. Open up a x1 console session via `x1 attach`
3. Load the ValidatorInfo contract ABI and instantiate the contract

   ```solidity
   abi = JSON.parse('[{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"error","name":"AddressEmptyCode","inputs":[{"type":"address","name":"target","internalType":"address"}]},{"type":"error","name":"ERC1967InvalidImplementation","inputs":[{"type":"address","name":"implementation","internalType":"address"}]},{"type":"error","name":"ERC1967NonPayable","inputs":[]},{"type":"error","name":"FailedInnerCall","inputs":[]},{"type":"error","name":"InvalidInitialization","inputs":[]},{"type":"error","name":"NotInitializing","inputs":[]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"error","name":"UUPSUnauthorizedCallContext","inputs":[]},{"type":"error","name":"UUPSUnsupportedProxiableUUID","inputs":[{"type":"bytes32","name":"slot","internalType":"bytes32"}]},{"type":"event","name":"InfoUpdated","inputs":[{"type":"uint256","name":"stakerID","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Initialized","inputs":[{"type":"uint64","name":"version","internalType":"uint64","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Upgraded","inputs":[{"type":"address","name":"implementation","internalType":"address","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"UPGRADE_INTERFACE_VERSION","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"getInfo","inputs":[{"type":"uint256","name":"validatorId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialize","inputs":[{"type":"address","name":"initialOwner","internalType":"address"},{"type":"address","name":"sfcContractAddress_","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"proxiableUUID","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"sfcContractAddress","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateInfo","inputs":[{"type":"string","name":"configUrl","internalType":"string"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateSfcContractAddress","inputs":[{"type":"address","name":"sfcContractAddress_","internalType":"address"}]},{"type":"function","stateMutability":"payable","outputs":[],"name":"upgradeToAndCall","inputs":[{"type":"address","name":"newImplementation","internalType":"address"},{"type":"bytes","name":"data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"validatorInfos","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]}]')
   validatorInfoContract = web3.ftm.contract(abi).at("0x891416e8bDB4437d4D0D303781A3828262220581")
   ```

4. Unlock your account

   ```solidity
   web3.personal.unlockAccount("WALLET_ADDRESS")
   ```

5. Call the `updateInfo` function of the ValidatorInfo contract (make sure you have enough XN on your wallet to cover the transaction fee)

   ```solidity
   validatorInfoContract.updateInfo("CONFIG_URL", { from: "WALLET_ADDRESS" })
   // e.g.: validatorInfoContract.updateInfo("https://x1-testnet-genesis.s3.amazonaws.com/xencrypto1.json", { from: "0xa4ddde0afdaea05a3d5a2ec6b5c7f3fc9945020b" })
   ```

## Development

### Deploy Contract

The initial deployment of the contract is done using the `create` script.

```shell
npx hardhat run scripts/create.ts --network x1-testnet
```

The `upgrade` script is used to upgrade the contract.

```shell
export VALIDATOR_INFO_ADDRESS=0x891416e8bDB4437d4D0D303781A3828262220581
npx hardhat run scripts/upgrade.ts --network x1-testnet
```

### Verify Contract

```shell
export VALIDATOR_INFO_ADDRESS=0x891416e8bDB4437d4D0D303781A3828262220581
npx hardhat verify $VALIDATOR_INFO_ADDRESS --network x1-testnet
```
