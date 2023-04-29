import { motion } from 'framer-motion';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import {
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
  useAccount,
  useBalance,
  useWaitForTransaction,
} from 'wagmi';
import nft from '@/contracts/nft';
import MintedModal from './MintedModal';
import { ethers } from 'ethers';

export default function MintButton() {
  const { address } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });

  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [parsedCost, setParsedCost] = useState(0);

  const {
    data: cost,
    isError: costError,
    isLoading: costLoading,
  } = useContractRead({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'cost',
  });

  useEffect(() => {
    if (costLoading) {
      return;
    }
    if (costError) {
      return;
    }
    if (!cost) {
      return;
    }
    setParsedCost((cost as number) / Math.pow(10, 18));
  }, [costLoading, costError, cost]);

  const { config } = usePrepareContractWrite({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'mint',
    args: [amount],
    overrides: {
      value: ethers.utils.parseEther(parsedCost * amount + ''),
    },
    enabled: true,
    onSuccess(data) {
      setShowModal(true);
    },
  });
  const {
    data: output,
    isLoading: isMintLoading,
    isSuccess,
    write,
  } = useContractWrite(config);
  const {
    data: txData,
    isError,
    isLoading,
  } = useWaitForTransaction({
    hash: output?.hash,
  });

  return (
    <div>
      <MintedModal open={txData ? true : false} setOpen={setShowModal} />
      <div className="grid grid-cols-3 justify-center items-center gap-x-10">
        <div
          className="flex items-center justify-center"
          onClick={() => setAmount(amount > 1 ? amount - 1 : 0)}
        >
          <button className="flex justify-end items-center w-full">
            <AiOutlineMinus
              size={24}
              color="white"
              className="hover:scale-150 transition-transform ease-in"
            ></AiOutlineMinus>
          </button>
        </div>

        <div className="font-black justify-center flex flex-col items-center">
          <h1>{amount}</h1>
          {!costLoading && (
            <p className=" text-xs pt-4 text-white/50 text-center">
              {parsedCost * amount} ETH + fees
            </p>
          )}
        </div>
        <div
          className="flex items-center justify-center"
          onClick={() => setAmount(amount + 1 > 4 ? 4 : amount + 1)}
        >
          <button className="flex justify-start items-start w-full">
            <AiOutlinePlus
              size={24}
              color="white"
              className="hover:scale-150 transition-transform ease-in"
            ></AiOutlinePlus>
          </button>
        </div>
      </div>

      {!isLoading && !isBalanceLoading && (
        <button
          disabled={
            (balance?.formatted as unknown as number) < amount * parsedCost ||
            amount === 0
          }
          className="mx-auto flex mt-10 items-center justify-center border border-white px-8 w-48 h-10 rounded-lg hover:bg-white hover:text-black transition-all ease-in"
          onClick={() => write?.()}
        >
          MINT
        </button>
      )}
      {isLoading && (
        <button
          disabled
          className="mx-auto flex mt-10 items-center  justify-center border border-white bg-black text-white px-8 w-48 h-10 rounded-lg"
        >
          <span>
            <ImSpinner9 className=" animate-spin transition-all ease-in-out"></ImSpinner9>
          </span>{' '}
          <span className="px-2">MINTING</span>
        </button>
      )}
    </div>
  );
}
