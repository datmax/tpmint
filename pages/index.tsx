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
      duration: 3,
    },
  },
};

const lora = Lora({
  subsets: ['latin'],
});

export default function Home() {
  const [bodyOp, setBodyOp] = useState(0);
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
    args: [address as `0x${string}`],
  });

  const {
    data: wlOnly,
    isError: wlOnlyError,
    isLoading: wlOnlyLoading,
    refetch: wlOnlyRefetch,
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

  //set body opacity to 1 after 0.2s
  useEffect(() => {
    setTimeout(() => {
      setBodyOp(100);
    }, 400);
  }, []);

  return (
    <main
      className={` min-h-screen  ${lora.className}  text-white  relative  opacity-${bodyOp} transition-all ease-in  `}
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
      <div className="absolute z-10 bottom-1 left-1 -rotate-90">
        <Image
          src="/decor.png"
          width={100}
          alt="decorative element"
          height={1000}
        ></Image>
      </div>
      <div className="absolute z-10 bottom-1 right-1 -rotate-180">
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
          className="text-yellow-500 pt-4"
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
        <Image
          src="/separator.png"
          width={200}
          height={200}
          alt="separator"
          className="lg:mt-20"
        ></Image>
      </div>

      <div className="pb-40 bg-gradient-to-b from-red-950 to-black">
        <motion.div
          variants={contentAnim}
          initial="initial"
          animate="animate"
          className=" flex items-center justify-center flex-col  text-[#fff5a9]   font-extralight"
        ></motion.div>
        {!address && <MintSection />}

        {address && dataReady && (
          <div className="">
            <h1 className="lg:text-6xl text-center lg:py-20 py-10">MINT</h1>
            {!isPaused && (
              <>
                {wlOnly && !isWhitelisted && (
                  <div className=" lg:text-2xl text-xl text-center">
                    Address not in whitelist.
                  </div>
                )}
                {wlOnly && isWhitelisted && (
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
                    <div className="lg:w-1/2 mx-auto">
                      <MintSection />
                    </div>
                  </>
                )}
              </>
            )}
            {(isPaused as boolean) && <div>Minting is paused.</div>}
          </div>
        )}
        {!dataReady && (
          <div className=" animate-pulse text-center">Loading...</div>
        )}
        <div className=" text-center w-full mt-20 text-xs px-4 lg:px-20 text-gray-500">
          DISCLAIMER: ALL materials in this course are not to be taken as
          financial advice and should not be regarded as investment advice. We
          are not financial or investment advisors or professionals. We are not
          liable for any losses incurred from your trading as you are fully
          responsible for your own trades. This is an educational program
          teaching you about Cryptocurrency. We NEVER guarantee profits and past
          performance and returns have are no indication of future performance
          and returns. Cryptocurrency Investing involves substantial risk and is
          not suitable for every investor. The valuation of the market may
          fluctuate, and, as a result, clients may lose more than their original
          investment. We make no determination of the appropriateness of this
          investment for your individual financial situation. Before we get
          started: This course is still UNDER CONSTRUCTION! New content and
          materials will be added in the coming weeks and we encourage you to
          periodically review the site for new material. You are 100%
          responsible for your own financial decisions and actions and we assume
          no liability for any losses or changes in value.
        </div>
      </div>
    </main>
  );
}
