import { ethers } from 'hardhat';

async function main() {
  const MyERC20TokenFactory = await ethers.getContractFactory('MyERC20Token');
  const myERC20Token = await MyERC20TokenFactory.deploy(1000000);
  // await myERC20Token.deploymentTransaction();

  console.log('MyERC20Token deployed to:', myERC20Token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
