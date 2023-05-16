const { network } = require("hardhat");
const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config");
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
    const fundME = await deploy("fundMe", {
        from: deployer,
        args: [priceFeedAddress],
        log: true,
    });
};
module.exports.tags = ["all", "funds"];
