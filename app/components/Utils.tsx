// import Image from 'next/image'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from "framer-motion";
import horseGif from '@/app/assets/dotLottle/horse.lottie'

export const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 animated-bg">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-64 w-64 mb-8">
          <DotLottieReact src={horseGif} loop autoplay />
        </div>
        <motion.div 
          className="text-2xl md:text-3xl font-semibold text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Setting up Game
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.div>
        <motion.div 
          className="mt-4 text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Please wait while we prepare your chess experience
        </motion.div>
      </motion.div>
    </div>
  );
}

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { error } from '../roomComponents/Alerts';

type OptionProps = {
  setButtonOption: (option: string) => void;
  setOption: (option: boolean) => void;
  setName: (name: string) => void;
  name: string
};

export const RoomOption = ({ setButtonOption, setOption, name, setName }: OptionProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleOption = (option: string) => {
    if (name === '') {
      error('Please enter your name');
      return;
    }
    setButtonOption(option);
    setOption(false);
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const buttons = [
    { 
      text: "Create Room", 
      action: "Create", 
      color: "from-purple-600 to-purple-700",
      hoverColor: "from-purple-500 to-purple-600",
      icon: "🎮"
    },
    { 
      text: "Join Room", 
      action: "Join", 
      color: "from-blue-600 to-blue-700",
      hoverColor: "from-blue-500 to-blue-600",
      icon: "🚪"
    },
    { 
      text: "Spectate", 
      action: "Spectate", 
      color: "from-green-600 to-green-700",
      hoverColor: "from-green-500 to-green-600",
      icon: "👀"
    },
    { 
      text: "Practice Room", 
      action: "Practice", 
      color: "from-orange-600 to-orange-700",
      hoverColor: "from-orange-500 to-orange-600",
      icon: "⚡"
    }
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Name Input */}
      <div className="relative">
        <motion.input
          type="text"
          className="w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-transparent focus:border-purple-500 focus:bg-white/10 transition-all duration-300 outline-none input-enhanced"
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          value={name}
          placeholder="Enter Your Name"
          required
        />
        <motion.label
          className="absolute left-4 px-2 bg-transparent text-gray-400 pointer-events-none transition-all duration-300"
          animate={{
            top: name !== '' || isInputFocused ? -8 : 16,
            fontSize: name !== '' || isInputFocused ? 12 : 16,
            color: name !== '' || isInputFocused ? '#a855f7' : '#9ca3af',
          }}
        >
          Enter Your Name
        </motion.label>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {buttons.map((button, index) => (
          <motion.button
            key={button.action}
            className={`relative overflow-hidden px-6 py-4 bg-gradient-to-r ${button.color} hover:${button.hoverColor} text-white font-semibold rounded-xl shadow-lg btn-enhanced transition-all duration-300 group`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleOption(button.action)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                {button.icon}
              </span>
              <span className="text-sm sm:text-base">{button.text}</span>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 -top-full bg-gradient-to-b from-white/20 to-transparent group-hover:top-full transition-all duration-500" />
          </motion.button>
        ))}
      </div>

      {/* Helpful text */}
      <motion.p 
        className="text-center text-gray-400 text-sm mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Choose an option to start your chess adventure
      </motion.p>
    </motion.div>
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
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!code.trim()) {
      error('Please enter a room code');
      return;
    }

    setIsLoading(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (button === 'Join') {
      router.push(`/playroom?roomcode=${code}&type=JOIN_ROOM&name=${name || 'P-2'}`);
    } else if (button === 'Create') {
      router.push(`/playroom?roomcode=${code}&type=CREATE_ROOM&name=${name || 'P-1'}`);
    } else if (button === 'Spectate') {
      router.push(`/viewroom?roomcode=${code}&type=SPECTATE_ROOM&name=${name || 'Spectator'}`);
    }
    
    setIsLoading(false);
  };

  const getButtonColor = () => {
    switch (button) {
      case 'Create': return 'from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600';
      case 'Join': return 'from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600';
      case 'Spectate': return 'from-green-600 to-green-700 hover:from-green-500 hover:to-green-600';
      default: return 'from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600';
    }
  };

  const getButtonIcon = () => {
    switch (button) {
      case 'Create': return '🎮';
      case 'Join': return '🚪';
      case 'Spectate': return '👀';
      default: return '🎯';
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.h3 
          className="text-2xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {button} Room
        </motion.h3>
        <motion.p 
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {button === 'Create' ? 'Enter a code for your new room' : 'Enter the room code to join'}
        </motion.p>
      </div>

      {/* Code Input */}
      <div className="flex gap-2">
        <motion.input
          className="flex-1 px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:bg-white/10 transition-all duration-300 outline-none input-enhanced"
          placeholder="Enter room code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          maxLength={8}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        />
        <motion.button 
          className={`px-6 py-3 bg-gradient-to-r ${getButtonColor()} text-white font-semibold rounded-xl shadow-lg btn-enhanced transition-all duration-300 flex items-center gap-2 min-w-[120px] justify-center`}
          onClick={handleClick}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? (
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <>
              <span>{getButtonIcon()}</span>
              <span>{button}</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Back Button */}
      <motion.button
        className="w-full px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 font-semibold rounded-xl transition-all duration-300 btn-enhanced"
        onClick={() => setOption(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        ← Back to Options
      </motion.button>

      {/* Info */}
      <motion.div 
        className="text-center text-gray-400 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Room codes are 8 characters long
      </motion.div>
    </motion.div>
  );
};
