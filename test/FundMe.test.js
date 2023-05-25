const { network, ethers, deployments, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("FundMe", function () {
    let fundMe;
    let MockV3Aggregator;
    let sendValue = ethers.utils.parseEther("1");
    let lowValue = ethers.utils.parseEther("0.0001");
    let deployer;
    let accounts;
    beforeEach(async function () {
        deployer = await getNamedAccounts().deployer;
        await deployments.fixture(["all"]);
        fundMe = await ethers.getContract("FundMe", deployer);
        MockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        );
    });

    describe("fund", function () {
        it("Check if minimum usd amount is send", async () => {
            await expect(fundMe.fund({ value: lowValue })).to.be.revertedWith(
                "You need to spend more ETH!"
            );
        });
    });
    describe("constructor pricefeed", function () {
        it("checks if mock pricefeed is used", async () => {
            const responce = await fundMe.getPricefeed();
            assert.equal(MockV3Aggregator.address, responce);
        });
    });
    describe("withdraw", function () {
        it("signer check", async () => {
            accounts = await ethers.getSigners();
            const owner = await fundMe.getOwner();

            assert.equal(await accounts[0].getAddress(), owner);
        });
        it("funding changes balance correctly", async () => {
            // const startingBalance = await fundMe.provider.getbalance();
            let startingBalance = await fundMe.getBalance();
            await fundMe.fund({ value: sendValue });
            let updatedValue = await fundMe.getBalance();
            assert.equal(
                updatedValue.toString(),
                startingBalance.add(sendValue).toString()
            );
        });
        it("of only owner cud withdraw", async () => {
            // assert.equal(deployer, owner);
            const someConnectedAccount = await fundMe.connect(accounts[1]);
            await expect(
                someConnectedAccount.withdraw()
            ).to.be.revertedWithCustomError(fundMe, "Fundme_NotOwner");
        });
    });
});
