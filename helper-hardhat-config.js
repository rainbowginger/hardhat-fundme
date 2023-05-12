const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    1: {
        name: "Ethereum mainnet",
        ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    137: {
        name: "Polygon",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
    42161: {
        name: "Arbitrum",
        ethUsdPriceFeed: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    },
    43114: {
        name: "Avax",
        ethUsdPriceFeed: "0x976B3D034E162d8bD72D6b9C989d545b839003b0",
    },
    // 324: {
    //     name: "ZkSync",
    //     ethUsdPriceFeed: "comimg zoon",
    // },
};

module.exports = { networkConfig };
