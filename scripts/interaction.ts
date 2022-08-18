import { ethers } from "hardhat";

async function main() {
  //interact with uniswap swapTokenforExactToken function
  //swap USDC to dai
  //TO-DO
  //erc20 token interface
  //Approve the uniswap contract
  //check balance of signer before swap
  //swap token caling the function
  //check balance after swap.

  const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const amountOut = 2000e6;

  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  const USDCHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
  await helpers.impersonateAccount(USDCHolder);
  const impersonatedSigner = await ethers.getSigner(USDCHolder);

  const USDC = await ethers.getContractAt(
    "IERC20",
    USDCAddress,
    impersonatedSigner
  );
  const DAI = await ethers.getContractAt("IERC20", DAIAddress);
  const ROUTER = await ethers.getContractAt(
    "IUniswap",
    UNIRouter,
    impersonatedSigner
  );
  await USDC.approve(UNIRouter, amountOut);
    const usdcBal = await USDC.balanceOf(USDCHolder);
    const daiBal = await DAI.balanceOf(USDCHolder);

    console.log("balance before swap", usdcBal);

  await ROUTER.swapTokensForExactTokens(
    amountOut,
    // 3000,
    ethers.utils.parseUnits("2000", "18"),
    [USDCAddress, DAIAddress],
    USDCHolder,
    1670674129
  );

    const usdcBalAfter = await USDC.balanceOf(USDCHolder);
    const daiBalAfter = await DAI.balanceOf(USDCHolder);

    console.log("balance after swap", usdcBalAfter, daiBalAfter);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});