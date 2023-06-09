import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MintButton from './MintButton';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useAccount, useNetwork, useSwitchNetwork, useBalance } from 'wagmi';

export default function MintSection() {
  //leaving all the things wagmi offers as hooks here just to let you see
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });
  console.log(address);
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { chain } = useNetwork();

  return (
    <div className="w-full">
      {address && (
        <>
          {chain?.id == 1 && (
            <div className="flex flex-col items-center gap-y-4 pt-10">
              <MintButton></MintButton>
            </div>
          )}
          {chain?.id != 1 && (
            <button
              className=" w-full text-center border border-white rounded-lg hover:text-black hover:bg-white px-2 py-4 transition-all ease-in"
              onClick={() => switchNetwork?.(1)} //? after stuff is to check if they are undefined/null
            >
              switch to eth mainnet
            </button>
          )}
        </>
      )}
      {!address && (
        <div className="w-full flex justify-center pt-20">
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
