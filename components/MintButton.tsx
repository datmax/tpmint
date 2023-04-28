import { motion } from 'framer-motion';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { ImSpinner9 } from 'react-icons/im';
export default function MintButton() {
  const [amount, setAmount] = useState(0);
  const [isMinting, setIsMinting] = useState(false);

  //TODO: CHANGE STUFF HERE
  const mint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
    }, 3000);
  };

  return (
    <div>
      <div className="grid grid-cols-3 justify-center items-center">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="flex items-center justify-center"
          onClick={() => setAmount(amount > 1 ? amount - 1 : 0)}
        >
          <AiOutlineMinus
            size={24}
            color="white"
            className="flex justify-center items-center hover:cursor-pointer"
          ></AiOutlineMinus>
        </motion.div>

        <div className="font-black justify-center flex flex-col items-center">
          <h1>{amount}</h1>
          <p className=" text-xs pt-4 text-white/50">AMOUNT</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="flex items-center justify-center"
          onClick={() => setAmount(amount + 1 > 3 ? 3 : amount + 1)}
        >
          <AiOutlinePlus
            size={24}
            color="white"
            className="flex justify-center items-center hover:cursor-pointer"
          ></AiOutlinePlus>
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
