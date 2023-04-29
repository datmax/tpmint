import { motion } from 'framer-motion';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import {
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
} from 'wagmi';
import nft from '@/contracts/nft';
import MintedModal from './MintedModal';
import { ethers } from 'ethers';

export default function MintButton() {
  const [showModal, setShowModal] = useState(true);
  const [amount, setAmount] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const {
    data: isPaused,
    isError: isErrorPaused,
    isLoading,
  } = useContractRead({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'paused',
  });

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

  //TODO: CHANGE STUFF HERE
  const mint = () => {
    write?.();
    setIsMinting(true);
  };

  //have to fix this
  const { config } = usePrepareContractWrite({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'mint',
    /*  overrides: {
      value: ethers.utils.parseUnits(
        (amount * (cost as number)).toString(),
        'wei'
      ),
    },*/
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

  return (
    <div>
      <MintedModal open={showModal} setOpen={setShowModal} />
      <div className="grid grid-cols-3 justify-center items-center">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="flex items-center justify-center"
          onClick={() => setAmount(amount > 1 ? amount - 1 : 0)}
        >
          <button className="flex justify-center items-center">
            <AiOutlineMinus size={24} color="white"></AiOutlineMinus>
          </button>
        </motion.div>

        <div className="font-black justify-center flex flex-col items-center">
          <h1>{amount}</h1>
          {!costLoading && (
            <p className=" text-xs pt-4 text-white/50">
              {(((cost as number) / Math.pow(10, 14)) * amount).toFixed(4)}
            </p>
          )}
        </div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="flex items-center justify-center"
          onClick={() => setAmount(amount + 1 > 3 ? 3 : amount + 1)}
        >
          <button className="flex justify-center items-center hover:cursor-pointer">
            <AiOutlinePlus size={24} color="white"></AiOutlinePlus>
          </button>
        </motion.div>
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
          <p className="px-2">MINTING</p>
        </button>
      )}
    </div>
  );
}
