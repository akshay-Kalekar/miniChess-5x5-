"use client";

import { useEffect, useState } from "react";
import { RoomOption, CodeInput } from "./components/Utils";
import { motion } from "framer-motion";
import { message } from 'antd';
import { initMessageApi } from "./roomComponents/Alerts";
import { ChessModel } from "./components/ChessModels";

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const [buttonOption, setButtonOption] = useState<string>("");
  const [option, setOption] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  
  useEffect(() => {
    initMessageApi(messageApi);
  }, [messageApi]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 animated-bg bg-grid">
      {/* Alert Container */}
      <div className='absolute top-4 right-4 z-10'>
        {contextHolder}
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 lg:px-16 gap-8 lg:gap-16">
        
        {/* Left Chess Model - Hidden on mobile */}
        <motion.div 
          className="hidden lg:block w-[30vw] h-[60vh]"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <ChessModel color="black" />
        </motion.div>

        {/* Center Content */}
        <motion.div 
          className="flex flex-col items-center text-center max-w-2xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Hero Section */}
          <div className="mb-12">
            <motion.div
              className="mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            >
              <h1 className="text-6xl md:text-8xl font-extrabold text-heading gradient-text mb-4">
                Mini Chess
              </h1>
              <motion.div
                className="text-4xl md:text-6xl font-bold text-white/90 mb-2"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                5 × 5
              </motion.div>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Experience chess in a compact 5x5 format. Quick games, strategic depth.
              </motion.p>
            </motion.div>

            {/* Decorative Elements */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <motion.div 
                className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
              <motion.div 
                className="w-2 h-2 bg-purple-500 rounded-full pulse-glow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              />
              <motion.div 
                className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </div>
          </div>

          {/* Interactive Section */}
          <motion.div
            className="w-full max-w-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass p-8 rounded-2xl">
              {option ? (
                <RoomOption 
                  setButtonOption={setButtonOption} 
                  setOption={setOption} 
                  name={name}
                  setName={setName} 
                />
              ) : (
                <CodeInput
                  button={buttonOption}
                  setOption={setOption}
                  name={name}
                />
              )}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {[
              { icon: "⚡", title: "Quick Games", desc: "5-10 minute matches" },
              { icon: "🎯", title: "Strategic", desc: "Every move matters" },
              { icon: "🌐", title: "Multiplayer", desc: "Play with friends" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Chess Model - Hidden on mobile */}
        <motion.div 
          className="hidden lg:block w-[30vw] h-[60vh]"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <ChessModel color="white" />
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}
