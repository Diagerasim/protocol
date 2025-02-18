/* eslint-disable no-unused-expressions */
const { ethers } = require('hardhat')
const BigNumber = require('bignumber.js')
const { helper, deployer, key } = require('../../../../util')
const composer = require('../../../../util/composer')
const { deployDependencies } = require('./deps')
const cache = null
const DAYS = 86400

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

describe('Resolution: configureCoolDownPeriod', () => {
  let deployed, coverKey

  before(async () => {
    const [owner] = await ethers.getSigners()
    deployed = await deployDependencies()

    deployed.policy = await deployer.deployWithLibraries(cache, 'Policy', {
      AccessControlLibV1: deployed.accessControlLibV1.address,
      BaseLibV1: deployed.baseLibV1.address,
      CoverUtilV1: deployed.coverUtilV1.address,
      PolicyHelperV1: deployed.policyHelperV1.address,
      StrategyLibV1: deployed.strategyLibV1.address,
      ValidationLibV1: deployed.validationLibV1.address
    }, deployed.store.address, '0')

    await deployed.protocol.addContract(key.PROTOCOL.CNS.COVER_POLICY, deployed.policy.address)

    coverKey = key.toBytes32('foo-bar')
    const stakeWithFee = helper.ether(10_000)
    const initialReassuranceAmount = helper.ether(1_000_000)
    const initialLiquidity = helper.ether(4_000_000)
    const minReportingStake = helper.ether(250)
    const reportingPeriod = 7 * DAYS
    const cooldownPeriod = 1 * DAYS
    const claimPeriod = 7 * DAYS
    const floor = helper.percentage(7)
    const ceiling = helper.percentage(45)

    const requiresWhitelist = false
    const values = [stakeWithFee, initialReassuranceAmount, minReportingStake, reportingPeriod, cooldownPeriod, claimPeriod, floor, ceiling]

    const info = key.toBytes32('info')

    deployed.cover.updateCoverCreatorWhitelist(owner.address, true)

    await deployed.npm.approve(deployed.stakingContract.address, stakeWithFee)
    await deployed.dai.approve(deployed.reassuranceContract.address, initialReassuranceAmount)

    await deployed.cover.addCover(coverKey, info, deployed.dai.address, requiresWhitelist, values)
    await deployed.cover.deployVault(coverKey)

    deployed.vault = await composer.vault.getVault({
      store: deployed.store,
      libs: {
        accessControlLibV1: deployed.accessControlLibV1,
        baseLibV1: deployed.baseLibV1,
        transferLib: deployed.transferLib,
        protoUtilV1: deployed.protoUtilV1,
        registryLibV1: deployed.registryLibV1,
        validationLib: deployed.validationLibV1
      }
    }, coverKey)

    await deployed.dai.approve(deployed.vault.address, initialLiquidity)
    await deployed.npm.approve(deployed.vault.address, minReportingStake)
    await deployed.vault.addLiquidity(coverKey, initialLiquidity, minReportingStake, key.toBytes32(''))
  })

  it('must configure cooldown period correctly when accessed without key', async () => {
    const tx = await deployed.resolution.configureCoolDownPeriod(key.toBytes32(''), 2.5 * DAYS)
    const { events } = await tx.wait()

    const event = events.find(x => x.event === 'CooldownPeriodConfigured')
    event.args.coverKey.should.equal(key.toBytes32(''))
    event.args.period.should.equal(2.5 * DAYS)

    // Reset
    await deployed.resolution.configureCoolDownPeriod(key.toBytes32(''), 1 * DAYS)
  })

  it('must configure cooldown period correctly', async () => {
    const tx = await deployed.resolution.configureCoolDownPeriod(coverKey, 2.5 * DAYS)
    const { events } = await tx.wait()

    const event = events.find(x => x.event === 'CooldownPeriodConfigured')
    event.args.coverKey.should.equal(coverKey)
    event.args.period.should.equal(2.5 * DAYS)

    const result = await deployed.resolution.getCoolDownPeriod(coverKey)
    result.should.equal(2.5 * DAYS)

    // Reset
    await deployed.resolution.configureCoolDownPeriod(coverKey, 1 * DAYS)
  })

  it('reverts when invalid value is passed as cooldown period', async () => {
    await deployed.resolution.configureCoolDownPeriod(coverKey, 0)
      .should.be.rejectedWith('Please specify period')
  })

  it('reverts when protocol is paused', async () => {
    await deployed.protocol.pause()
    await deployed.resolution.configureCoolDownPeriod(coverKey, 0)
      .should.be.rejectedWith('Protocol is paused')
    await deployed.protocol.unpause()
  })

  it('reverts when not accessed by `GOVERNANCE_ADMIN`', async () => {
    const [, bob] = await ethers.getSigners()

    await deployed.resolution.connect(bob).configureCoolDownPeriod(coverKey, 2.5 * DAYS)
      .should.be.rejectedWith('Forbidden')
  })
})
