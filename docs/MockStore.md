# MockStore.sol

View Source: [contracts/mock/base/MockStore.sol](../contracts/mock/base/MockStore.sol)

**↗ Extends: [FakeStore](FakeStore.md)**
**↘ Derived Contracts: [MockCxTokenStore](MockCxTokenStore.md), [MockProcessorStore](MockProcessorStore.md)**

**MockStore**

## Functions

- [setBool(bytes32 prefix, address a)](#setbool)
- [unsetBool(bytes32 prefix, address a)](#unsetbool)
- [setAddress(bytes32 k1, bytes32 k2, address v)](#setaddress)
- [setAddress(bytes32 k1, bytes32 k2, bytes32 k3, address v)](#setaddress)
- [setUint(bytes32 k1, bytes32 k2, uint256 v)](#setuint)

### setBool

```solidity
function setBool(bytes32 prefix, address a) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| prefix | bytes32 |  | 
| a | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setBool(bytes32 prefix, address a) public {
    bytes32 k = keccak256(abi.encodePacked(prefix, a));
    this.setBool(k, true);
  }
```
</details>

### unsetBool

```solidity
function unsetBool(bytes32 prefix, address a) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| prefix | bytes32 |  | 
| a | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function unsetBool(bytes32 prefix, address a) public {
    bytes32 k = keccak256(abi.encodePacked(prefix, a));
    this.deleteBool(k);
  }
```
</details>

### setAddress

```solidity
function setAddress(bytes32 k1, bytes32 k2, address v) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| k1 | bytes32 |  | 
| k2 | bytes32 |  | 
| v | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setAddress(
    bytes32 k1,
    bytes32 k2,
    address v
  ) public {
    this.setAddress(keccak256(abi.encodePacked(k1, k2)), v);
  }
```
</details>

### setAddress

```solidity
function setAddress(bytes32 k1, bytes32 k2, bytes32 k3, address v) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| k1 | bytes32 |  | 
| k2 | bytes32 |  | 
| k3 | bytes32 |  | 
| v | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setAddress(
    bytes32 k1,
    bytes32 k2,
    bytes32 k3,
    address v
  ) public {
    this.setAddress(keccak256(abi.encodePacked(k1, k2, k3)), v);
  }
```
</details>

### setUint

```solidity
function setUint(bytes32 k1, bytes32 k2, uint256 v) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| k1 | bytes32 |  | 
| k2 | bytes32 |  | 
| v | uint256 |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function setUint(
    bytes32 k1,
    bytes32 k2,
    uint256 v
  ) public {
    this.setUint(keccak256(abi.encodePacked(k1, k2)), v);
  }
```
</details>

## Contracts

* [AccessControl](AccessControl.md)
* [AccessControlLibV1](AccessControlLibV1.md)
* [Address](Address.md)
* [BaseLibV1](BaseLibV1.md)
* [BokkyPooBahsDateTimeLibrary](BokkyPooBahsDateTimeLibrary.md)
* [BondPool](BondPool.md)
* [BondPoolBase](BondPoolBase.md)
* [BondPoolLibV1](BondPoolLibV1.md)
* [Context](Context.md)
* [Controller](Controller.md)
* [Cover](Cover.md)
* [CoverBase](CoverBase.md)
* [CoverProvision](CoverProvision.md)
* [CoverReassurance](CoverReassurance.md)
* [CoverStake](CoverStake.md)
* [CoverUtilV1](CoverUtilV1.md)
* [cxToken](cxToken.md)
* [cxTokenFactory](cxTokenFactory.md)
* [cxTokenFactoryLibV1](cxTokenFactoryLibV1.md)
* [Destroyable](Destroyable.md)
* [ERC165](ERC165.md)
* [ERC20](ERC20.md)
* [FakeRecoverable](FakeRecoverable.md)
* [FakeStore](FakeStore.md)
* [FakeToken](FakeToken.md)
* [FakeUniswapPair](FakeUniswapPair.md)
* [FakeUniswapV2RouterLike](FakeUniswapV2RouterLike.md)
* [Finalization](Finalization.md)
* [Governance](Governance.md)
* [GovernanceUtilV1](GovernanceUtilV1.md)
* [IAccessControl](IAccessControl.md)
* [IBondPool](IBondPool.md)
* [IClaimsProcessor](IClaimsProcessor.md)
* [ICommission](ICommission.md)
* [ICover](ICover.md)
* [ICoverProvision](ICoverProvision.md)
* [ICoverReassurance](ICoverReassurance.md)
* [ICoverStake](ICoverStake.md)
* [ICxToken](ICxToken.md)
* [ICxTokenFactory](ICxTokenFactory.md)
* [IERC165](IERC165.md)
* [IERC20](IERC20.md)
* [IERC20Metadata](IERC20Metadata.md)
* [IERC3156FlashBorrower](IERC3156FlashBorrower.md)
* [IERC3156FlashLender](IERC3156FlashLender.md)
* [IFinalization](IFinalization.md)
* [IGovernance](IGovernance.md)
* [IMember](IMember.md)
* [IPausable](IPausable.md)
* [IPolicy](IPolicy.md)
* [IPolicyAdmin](IPolicyAdmin.md)
* [IPriceDiscovery](IPriceDiscovery.md)
* [IProtocol](IProtocol.md)
* [IReporter](IReporter.md)
* [IResolution](IResolution.md)
* [IResolvable](IResolvable.md)
* [IStakingPools](IStakingPools.md)
* [IStore](IStore.md)
* [IUniswapV2FactoryLike](IUniswapV2FactoryLike.md)
* [IUniswapV2PairLike](IUniswapV2PairLike.md)
* [IUniswapV2RouterLike](IUniswapV2RouterLike.md)
* [IUnstakable](IUnstakable.md)
* [IVault](IVault.md)
* [IVaultFactory](IVaultFactory.md)
* [IWitness](IWitness.md)
* [MaliciousToken](MaliciousToken.md)
* [Migrations](Migrations.md)
* [MockCxToken](MockCxToken.md)
* [MockCxTokenPolicy](MockCxTokenPolicy.md)
* [MockCxTokenStore](MockCxTokenStore.md)
* [MockProcessorStore](MockProcessorStore.md)
* [MockProtocol](MockProtocol.md)
* [MockStore](MockStore.md)
* [MockVault](MockVault.md)
* [NTransferUtilV2](NTransferUtilV2.md)
* [NTransferUtilV2Intermediate](NTransferUtilV2Intermediate.md)
* [Ownable](Ownable.md)
* [Pausable](Pausable.md)
* [Policy](Policy.md)
* [PolicyAdmin](PolicyAdmin.md)
* [PolicyManager](PolicyManager.md)
* [PriceDiscovery](PriceDiscovery.md)
* [Processor](Processor.md)
* [ProtoBase](ProtoBase.md)
* [Protocol](Protocol.md)
* [ProtoUtilV1](ProtoUtilV1.md)
* [Recoverable](Recoverable.md)
* [ReentrancyGuard](ReentrancyGuard.md)
* [RegistryLibV1](RegistryLibV1.md)
* [Reporter](Reporter.md)
* [Resolution](Resolution.md)
* [Resolvable](Resolvable.md)
* [SafeERC20](SafeERC20.md)
* [StakingPoolBase](StakingPoolBase.md)
* [StakingPoolCoreLibV1](StakingPoolCoreLibV1.md)
* [StakingPoolInfo](StakingPoolInfo.md)
* [StakingPoolLibV1](StakingPoolLibV1.md)
* [StakingPoolReward](StakingPoolReward.md)
* [StakingPools](StakingPools.md)
* [Store](Store.md)
* [StoreBase](StoreBase.md)
* [StoreKeyUtil](StoreKeyUtil.md)
* [Strings](Strings.md)
* [Unstakable](Unstakable.md)
* [ValidationLibV1](ValidationLibV1.md)
* [Vault](Vault.md)
* [VaultBase](VaultBase.md)
* [VaultFactory](VaultFactory.md)
* [VaultFactoryLibV1](VaultFactoryLibV1.md)
* [VaultLibV1](VaultLibV1.md)
* [WithFlashLoan](WithFlashLoan.md)
* [Witness](Witness.md)