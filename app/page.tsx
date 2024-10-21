"use client";

import { useState } from "react";
import { RoomOption, CodeInput } from "./components/Utils";

export default function Home() {
  const [buttonOption, setButtonOption] = useState<string>("");
  const [option, setOption] = useState<boolean>(true);
  const [name, setName] = useState<string>('');

  return (
    <div className="hero bg-base-200 min-h-screen p-16">
      <div className="flex w-full h-full">
      </div>
      <div className="hero-content text-center">
        <div className="max-w-md p-4">
          <h1 className="text-6xl font-extrabold">Mini Chess</h1>
          <p className="py-6 text-4xl font-bold">5 x 5</p>
          <div className="flex flex-col  gap-6 justify-center items-center h-[20vh]">
            {/* option work as a toggle b/w two componets all option and on click redirect to single option */}
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
        </div>
      </div>
    </div>
  );
}
