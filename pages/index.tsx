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
      duration: 1.5,
      ease: 'easeIn',
    },
  },
};

const h2anim = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 2,
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

  const {
    data: supply,
    isError: supplyError,
    isLoading: supplyLoading,
  } = useContractRead({
    address: nft.address as `0x${string}`,
    abi: nft.abi,
    functionName: 'totalSupply',
  });

  console.log(isWhitelisted);

  useEffect(() => {
    if (
      !isPausedLoading &&
      !isWhitelistedLoading &&
      !wlOnlyLoading &&
      !supplyLoading
    ) {
      setdataReady(true);
    } else {
      setdataReady(false);
    }
  }, [isPausedLoading, isWhitelistedLoading, wlOnlyLoading, supplyLoading]);

  return (
    <main
      className={` min-h-screen  ${lora.className}  text-white  relative  `}
    >
      <div className="absolute z-10 top-1 left-1">
        <Image
          src="/decor.png"
          width={100}
          alt="decorative element"
          height={1000}
        ></Image>
      </div>
      <div className="absolute z-10 top-1 right-1 rotate-90">
        <Image
          src="/decor.png"
          width={100}
          alt="decorative element"
          height={1000}
        ></Image>
      </div>

      <div className="flex min-h-screen w-full flex-col items-center backdrop-blur-sm  p-4 lg:px-24 backdrop-brightness-[0.6] bg-gradient-to-b from-black to-red-950 ">
        <Image
          src="/tplogo.png"
          width={400}
          height={40}
          alt="Token prophet logo"
        />
        <h2>THE</h2>
        <motion.h1
          variants={titleAnim}
          initial="initial"
          animate="animate"
          className="font-light lg:text-7xl text-center"
        >
          TOKEN PROPHET
        </motion.h1>
        <h2 className="text-center">ALPHA PASS</h2>

        <motion.h2
          variants={h2anim}
          initial="initial"
          animate="animate"
          className="text-gray-300 pt-4"
        >
          The eco system that keeps giving.
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 w-full">
          <div className="lg:text-3xl justify-center flex flex-col items-center gap-y-4">
            <div>111 PASSES.</div>
            <div>SPECIAL DISCORD COMMUNITY.</div>
            <div>EXCLUSIVE BENEFITS & ALPHA.</div>
            <div className="pt-10">MINT COST: 0.169 ETH.</div>
            <div>MAX 4 NFTS PER WALLET.</div>
          </div>
          <div className="">
            <Image
              src="/tpcard.png"
              width={800}
              height={500}
              alt=""
              className=""
            />
          </div>
        </div>
      </div>
      <div className="h-screen bg-gradient-to-b from-red-950 to-black">
        <motion.div
          variants={contentAnim}
          initial="initial"
          animate="animate"
          className=" pt-20 lg:pt-20 flex items-center justify-center flex-col  text-[#fff5a9]   font-extralight"
        ></motion.div>
        {dataReady && (
          <div className="pt-20">
            {!isPaused && (
              <>
                {wlOnly && isWhitelisted && (
                  <div className=" text-3xl">Address not in whitelist.</div>
                )}
                {wlOnly && !isWhitelisted && (
                  <>
                    <div className="text-center text-3xl">
                      Passes minted: {(supply as number) / 1}/111
                    </div>
                    <div className="lg:w-1/2 flex  mx-auto">
                      <MintSection />
                    </div>
                  </>
                )}
                {!wlOnly && (
                  <>
                    <div>Passes minted: {(supply as number) / 1}/111</div>
                    <div className="lg:w-1/2">
                      <MintSection />
                    </div>
                  </>
                )}
              </>
            )}
            {(isPaused as boolean) && <div>Minting is paused.</div>}
          </div>
        )}
        {!dataReady && <div className="pt-20 animate-pulse">Loading...</div>}
      </div>
    </main>
  );
}
