const { network } = require("hardhat");
const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
module.exports = async ({ getNamedAccounts, deployments }) => {
    const chainId = network.config.chainId;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    let priceFeedAddress;
    if (developmentChains.includes(network.name)) {
        const ethUsdPriceFeedAggregator = await deployments.get(
            "MockV3Aggregator"
        );
        priceFeedAddress = ethUsdPriceFeedAggregator.address;
    } else {
        priceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }
    log("deploying Contracts .........");
    const arg = [priceFeedAddress];
    const fundME = await deploy("FundMe", {
        from: deployer,
        args: arg,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log("------------Contracts deployed-----------------------");
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundME.address, arg);
    }
};
module.exports.tags = ["all", "funds"];
