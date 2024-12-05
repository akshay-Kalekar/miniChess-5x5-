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
  useEffect(()=>{
    initMessageApi(messageApi);
  })
  return (
    <div className="hero bg-base-200 min-h-screen p-16">
      <div className=' absolute top-4 right-4  z-10'>
        {contextHolder}
      </div>
      <div className="flex w-full h-full justify-center gap-16">
        <div className="absoulte w-[30vw] hidden lg:block">

      <ChessModel color={"black"}/>
        </div>
       
     
      <motion.div 
        className="hero-content text-center  "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        
        <div className="max-w-md p-4">
          <motion.h1
            className="text-6xl font-extrabold  "
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Mini Chess
          </motion.h1>
          <motion.p
            className="py-6 text-7xl font-bold  "
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            5 x 5
          </motion.p>
          <motion.div
            className="flex flex-col gap-6 justify-center items-center h-[20vh]"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* option work as a toggle b/w two components all option and on click redirect to single option */}
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
          </motion.div>
        </div>
      </motion.div>
      <div className="absoulte w-[30vw] hidden md:block">

<ChessModel color={"white"}/>
  </div>
    </div>
  </div>
  );
}
