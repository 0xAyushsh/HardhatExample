const { ethers } = require("hardhat");
const { expect , assert } = require("chai");


describe("SimpleStorage", function (){
    let simpleStorageFactory, simpleStorage;
    beforeEach(async function (){
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    })

    it("Should be equal to 0", async function (){
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";

        assert.equal(currentValue.toString(), expectedValue);
    })

    it("Should be equal to stored value", async function(){
        const transactionResponse = await simpleStorage.store("5");

        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();

        const expectedValue = "5";

        assert.equal(currentValue.toString(), expectedValue);
    })
})