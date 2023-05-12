require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
// require("solidity-coverage");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers:[{0.6.0, 0.8.0, ^0.8.0}],
    },
    networks: {
        hardhat: {},
        sepolia: {
            url: process.env.S_RPC_URL,
            accounts: [process.env.S_P_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
};
