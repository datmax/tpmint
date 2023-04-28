import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MintButton from './MintButton';

export default function MintSection() {
  const [connected, setConnected] = useState(false);

  //TODO: implement connect either redux stuff or rainbowkit
  const connect = () => {
    setConnected(true);
  };

  return (
    <div className="w-full pt-40">
      {connected && <MintButton></MintButton>}
      {!connected && (
        <div className="w-full flex justify-center">
          <button
            className="w-48 text-center border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition-all ease-in "
            onClick={() => connect()}
          >
            <p className=""> CONNECT YOUR WALLET</p>
          </button>
        </div>
      )}
    </div>
  );
}
