// import Image from 'next/image'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from "framer-motion";
import horseGif from '@/app/assets/dotLottle/horse.lottie'

export const Loading: React.FC = () => {
  return (
    <> 
     <div className='h-screen flex flex-col justify-center items-center h-6/12'>
    <div className='h-3/6'>
    <DotLottieReact src={horseGif} loop autoplay/>
    </div>
    <div className='text-2xl'>
    Setting up Game . . .
    </div>
    </div>
    </>
  );
}

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { error } from '../roomComponents/Alerts';
import { s } from 'motion/react-client';

type OptionProps = {
  setButtonOption: (option: string) => void;
  setOption: (option: boolean) => void;
  setName: (name: string) => void;
  name:string
};

export const RoomOption = ({ setButtonOption, setOption, name, setName }: OptionProps) => {
  const handleOption = (option: string) => {
    if (name === '') {
      error('Please enter your name');
      return;
    }
    setButtonOption(option);
    setOption(false);
  };

  return (
    <>
      <div className="flex gap-6 justify-center flex-wrap w-full pt-16">
        <div className="join input pr-0 w-4/5 gap-4 border-2 border-slate-200 relative">
          <input
            type="text"
            id="funky-input"
            className="
              px-4 py-2 w-full text-white placeholder-transparent 
              border-none rounded-lg outline-none
              transition-all duration-300 ease-in-out
              peer 
            "
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <motion.label
            htmlFor="funky-input"
            className="absolute  px-2 bg-inherit focus:top-1/2 focus:transform focus:-translate-y-1/2 focus:text-gray-400 transition-all duration-300 ease-in-out  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
    peer-placeholder-shown:text-gray-400
    peer-focus:top-0 peer-focus:text-white peer-focus:text-sm"
            animate={{
              top: name !== '' ? 0 : '50%',
              scale: name !== '' ? 0.9 : 1,
              y: name !== '' ? '-80%' : '-50%',
              color: name !== '' ? '#ffffff' : '#a0a0a0',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            Enter Your Name
          </motion.label>
        </div>

        <button
          className="btn btn-secondary w-1/3 hover:shadow-secondary/50 hover:shadow-lg"
          onClick={() => handleOption('Create')}
        >
          Create Room
        </button>
        <button
          className="btn btn-info w-1/3 hover:shadow-info/50 hover:shadow-lg"
          onClick={() => handleOption('Join')}
        >
          Join Room
        </button>
        <button
          className="btn btn-error w-1/3 hover:shadow-error/50 hover:shadow-lg"
          onClick={() => handleOption('Spectate')}
        >
          Spectate
        </button>
        <button className="btn btn-warning w-1/3 hover:shadow-warning/50 hover:shadow-lg">
          Practice Room
        </button>
      </div>
    </>
  );
};

type CodeInputProps = {
  button: string;
  setOption: (option: boolean) => void;
  name: string;
};

export const CodeInput: React.FC<CodeInputProps> = ({ button, setOption, name }) => {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleClick = () => {
    if (button == 'Join') {
      router.push(`/playroom?roomcode=${code}&type=JOIN_ROOM&name=${name ? name : 'P-2'}`);
    } else if (button == 'Create') {
      router.push(`/playroom?roomcode=${code}&type=CREATE_ROOM&name=${name ? name : 'P-1' }`);
    }
    else if (button == 'Spectate') {
      router.push(`/viewroom?roomcode=${code}&type=SPECTATE_ROOM&name=${name ? name : 'Spectator'}`);
    }
  };

  return (
    <div className='flex flex-col gap-4 items-center'>
      <div className="join input pr-0">
        <input
          className="input-bordered join-item w-3/5"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={8}
        />
        <button className="btn btn-accent join-item rounded-r-md w-2/5 h-1/3" onClick={handleClick}>
          {button}
        </button>
      </div>
      <button
        className="btn btn-error join-item rounded-r-md w-3/5"
        onClick={() => setOption(true)}
      >
        Back
      </button>
    </div>
  );
};
