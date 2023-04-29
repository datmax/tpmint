import { motion } from 'framer-motion';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import {
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
  useAccount,
} from 'wagmi';
import nft from '@/contracts/nft';
import MintedModal from './MintedModal';
import { ethers } from 'ethers';

export default function MintButton() {
  const { address } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isMinting, setIsMinting] = useState(false);

  //TODO: CHECK COST DECIMALS(CURRENTLY 14)
  const {
    data: cost,
    isError: costError,
    isLoading: costLoading,
  } = useContractRead({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'cost',
  });

  const mint = async () => {
    setIsMinting(true);
    write?.();
  };

  const { config } = usePrepareContractWrite({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'mint',
    args: [amount],
    overrides: {
      value: ethers.utils.parseEther((0.169 * amount).toString()),
    },
    enabled: false,
    onError(error) {
      console.log('Error while preparing tx: ', error);
      setIsMinting(false);
    },
    onSuccess(data) {
      setShowModal(true);
      setIsMinting(false);
    },
  });
  const {
    data: output,
    isLoading: isMintLoading,
    isSuccess,
    write,
  } = useContractWrite(config);

  return (
    <div>
      <MintedModal open={showModal} setOpen={setShowModal} />
      <div className="grid grid-cols-3 justify-center items-center">
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
            <p className=" text-xs pt-4 text-white/50">
              {(((cost as number) / Math.pow(10, 14)) * amount).toFixed(4)}
            </p>
          )}
        </div>
        <div
          className="flex items-center justify-center"
          onClick={() => setAmount(amount + 1 > 3 ? 3 : amount + 1)}
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

      {!isMinting && (
        <button
          className="mx-auto flex mt-10 items-center justify-center border border-white px-8 w-48 h-10 rounded-lg hover:bg-white hover:text-black transition-all ease-in"
          onClick={() => mint()}
        >
          MINT
        </button>
      )}
      {isMinting && (
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
