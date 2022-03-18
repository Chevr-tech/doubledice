import networkConfig from "config/networkConfig";
import { BigNumber, Signer } from "ethers";
import { ERC20PresetMinterPauser__factory } from "lib/contracts";

export const getAllowance = async (signer: Signer, tokenAddress: string): Promise<BigNumber> => {
  const tokenContract = ERC20PresetMinterPauser__factory.connect(
    tokenAddress,
    signer
  );

  const account = await signer.getAddress();

  return await tokenContract
    .connect(signer)
    .allowance(account, networkConfig.platformContractAddress);
};

export const getUserBalance = async (signer: Signer, tokenAddress: string, user: string): Promise<BigNumber> => {
  const tokenContract = ERC20PresetMinterPauser__factory.connect(
    tokenAddress,
    signer
  );

  return await tokenContract
    .connect(signer)
    .balanceOf(user);
};

export const increaseAllowance = async (signer: Signer, amount: BigNumber, tokenAddress: string, spender?: string): Promise<void> => {
  const currentAllowance = await getAllowance(signer, tokenAddress);

  if (amount.gt(currentAllowance)) {
    const tokenContract = ERC20PresetMinterPauser__factory.connect(
      tokenAddress,
      signer
    );
    const spenderAddress = spender ? spender : networkConfig.platformContractAddress;
    await (
      await tokenContract
        .connect(signer)
        .increaseAllowance(spenderAddress, amount)
    ).wait();
  }
};

