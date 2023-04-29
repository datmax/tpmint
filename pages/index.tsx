import Image from 'next/image';
import { Lora } from 'next/font/google';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import MintSection from '@/components/MintSection';
import { useAccount, useContractRead } from 'wagmi';
import nft from '@/contracts/nft';
const titleAnim = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeIn',
    },
  },
};

const contentAnim = {
  initial: {
    opacity: 0,
    y: 1000,
  },
  animate: {
    opacity: [0, 1],
    y: [10, 0],
    transition: {
      duration: 1,
    },
  },
};

const lora = Lora({
  subsets: ['latin'],
});

export default function Home() {
  const { address } = useAccount();
  const [dataReady, setdataReady] = useState(false);
  const {
    data: isWhitelisted,
    isError: isWhitelistedError,
    isLoading: isWhitelistedLoading,
  } = useContractRead({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'isWhitelisted',
    args: [address],
  });

  const {
    data: wlOnly,
    isError: wlOnlyError,
    isLoading: wlOnlyLoading,
  } = useContractRead({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'onlyWhitelisted',
    args: [address],
  });

  const {
    data: isPaused,
    isError: isErrorPaused,
    isLoading: isPausedLoading,
  } = useContractRead({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'paused',
  });

  useEffect(() => {
    if (!isPausedLoading && !isWhitelistedLoading && !wlOnlyLoading) {
      setdataReady(true);
    } else {
      setdataReady(false);
    }
  }, [isPausedLoading, isWhitelistedLoading, wlOnlyLoading]);

  return (
    <main
      className={` min-h-screen  ${lora.className}  text-white bg-main bg-cover bg-black`}
    >
      <div className="flex min-h-screen flex-col items-center backdrop-blur-sm  p-4 lg:p-24 backdrop-brightness-[0.4] ">
        <motion.h1
          variants={titleAnim}
          initial="initial"
          animate="animate"
          className="font-light lg:text-5xl text-center"
        >
          TOKEN PROPHET ALPHA PASS
        </motion.h1>

        <motion.div
          variants={contentAnim}
          initial="initial"
          animate="animate"
          className=" pt-20 lg:pt-40 flex items-center justify-center flex-col  text-[#fff5a9]   font-extralight"
        >
          <div className="lg:text-3xl justify-center flex flex-col items-center gap-y-2">
            <h2>111 PASSES.</h2>
            <h2>SPECIAL DISCORD COMMUNITY.</h2>
            <h2>EXCLUSIVE BENEFITS & ALPHA.</h2>
            <h2 className="pt-2">MINT OPEN NOW.</h2>
          </div>
        </motion.div>
        {dataReady && (
          <>
            {!isPaused && (
              <>
                {wlOnly && !isWhitelisted && (
                  <div>Address not in whitelist.</div>
                )}
                {wlOnly && isWhitelisted && <MintSection />}
                {!wlOnly && <MintSection />}
              </>
            )}
            {isPaused && <div>Minting is paused.</div>}
          </>
        )}
        {!dataReady && <div className="pt-20 animate-pulse">Loading...</div>}
      </div>
    </main>
  );
}
