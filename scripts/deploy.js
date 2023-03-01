const { ethers, network, run } = require('hardhat');
require("dotenv").config({path : ".env"})

async function main(){

  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying the smart contract");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log(`Smart contract is deployed successfully at the address : ${simpleStorage.address}`);

  if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY){
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address,[])
  }

  let favNumber = await simpleStorage.retrieve();
  console.log(`Fav number is ${favNumber}`);
  let transactionResponse = await simpleStorage.store(6);
  await transactionResponse.wait(2);
  favNumber = await simpleStorage.retrieve();
  console.log(`Fav number is ${favNumber}`);

}

async function verify (contractAddress, args){

  console.log("Verifying the smart contract....");
  try{
    await run("verify:verify",{
      address : contractAddress,
      constuctorArguments : args
    });
  } catch(e){
    if(e.message.toLowerCase().includes("already verified"))
      console.log("Already verified")
    else
      console.log(e.message);
  }

}

main().then(()=>{
  console.log("Success");
  process.exit(0);
}).catch((e)=>{
  console.log(e);
  process.exit(1);
})