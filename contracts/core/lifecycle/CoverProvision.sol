// Neptune Mutual Protocol (https://neptunemutual.com)
// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.0;
import "../../interfaces/IStore.sol";
import "../../interfaces/ICoverProvision.sol";
import "../../libraries/CoverLibV1.sol";
import "../../libraries/StoreKeyUtil.sol";
import "../../libraries/ValidationLibV1.sol";
import "../../libraries/RoutineInvokerLibV1.sol";
import "../Recoverable.sol";

/**
 * @title NPM Cover Provision
 * @dev Through governance, NPM tokens can be allocated as provision or `Reward Pool Support`
 * for any given cover. This not only fosters community participation but also incentivizes
 * the liquidity providers or acts as a defense/support during cover incidents.
 *
 * Along with the NPM provisions, the liquidity providers also have `[Reassurance Token Support](CoverReassurance.md)`
 * for the rainy day.
 */
contract CoverProvision is ICoverProvision, Recoverable {
  using CoverLibV1 for IStore;
  using StoreKeyUtil for IStore;
  using RoutineInvokerLibV1 for IStore;
  using ValidationLibV1 for IStore;

  /**
   * @dev Constructs this contract
   * @param store Provide the store contract instance
   */
  constructor(IStore store) Recoverable(store) {} // solhint-disable-line

  /**
   * @dev Increases NPM provision for the given cover key.
   * This feature is accessible only to the contract owner (governance).
   * @param coverKey Provide the cover key you wish to increase the provision of
   * @param amount Specify the amount of NPM tokens you would like to add
   */
  function increaseProvision(bytes32 coverKey, uint256 amount) external override nonReentrant {
    require(amount > 0, "Please specify amount");

    s.mustNotBePaused();
    AccessControlLibV1.mustBeLiquidityManager(s);

    s.mustHaveNormalCoverStatus(coverKey);

    uint256 provision = s.increaseProvisionInternal(coverKey, amount);
    emit ProvisionIncreased(coverKey, provision, provision + amount);
  }

  /**
   * @dev Decreases NPM provision for the given cover key
   * This feature is accessible only to the contract owner (governance).
   * @param coverKey Provide the cover key you wish to decrease the provision from
   * @param amount Specify the amount of NPM tokens you would like to decrease
   */
  function decreaseProvision(bytes32 coverKey, uint256 amount) external override nonReentrant {
    require(amount > 0, "Please specify amount");

    s.mustNotBePaused();
    AccessControlLibV1.mustBeLiquidityManager(s);
    s.mustHaveNormalCoverStatus(coverKey);

    uint256 provision = s.decreaseProvisionInternal(coverKey, amount);

    // @suppress-subtraction Checked usage. The amount is
    // always less than provision if we reach this line.
    emit ProvisionDecreased(coverKey, provision, provision - amount);
  }

  /**
   * @dev Gets the NPM provision amount for the given cover key
   * @param coverKey Enter the cover key to get the provision
   */
  function getProvision(bytes32 coverKey) external view override returns (uint256) {
    return s.getUintByKeys(ProtoUtilV1.NS_COVER_PROVISION, coverKey);
  }

  /**
   * @dev Version number of this contract
   */
  function version() external pure override returns (bytes32) {
    return "v0.1";
  }

  /**
   * @dev Name of this contract
   */
  function getName() external pure override returns (bytes32) {
    return ProtoUtilV1.CNAME_COVER_PROVISION;
  }
}
