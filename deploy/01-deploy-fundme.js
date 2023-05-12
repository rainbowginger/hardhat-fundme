const { network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
module.exports = async ({ getNamedAccounds, deployments }) => {
    const chainId = network.config.chainId;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounds();
    let priceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    const fundME = await deploy("fundMe", {
        from: deployer,
        args: [priceFeedAddress],
        log: true,
    });
};
