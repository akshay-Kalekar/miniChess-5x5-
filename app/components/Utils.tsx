export const Loading: React.FC = () => {
  return (
    <> Loading . . .</>
  );
}

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

type OptionProps = {
  setButtonOption: (option: string) => void;
  setOption: (option: boolean) => void;
  setName: (name: string) => void;
  name:string
};

export const RoomOption = ({ setButtonOption, setOption, name, setName }: OptionProps) => {

  return (
    <>
      <div className="flex gap-6 justify-center flex-wrap w-full pt-16">
        <div className="join input pr-0 w-4/5 gap-4 border-2 border-slate-200">
          
          <input
            className="input-bordered join-item w-full "
            placeholder="What's your name ?"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

        </div>
       
        
        <button
        className="btn btn-secondary w-1/3"
        onClick={() => {
          setButtonOption("Create");
          setOption(false);
        }}
        >
          Create Room
        </button>
        <button
          className="btn btn-info w-1/3"
          onClick={() => {
            setButtonOption("Join");
            setOption(false);
          }}
          >
          Join Room
        </button>
        <button className="btn btn-error w-1/3 "
          onClick={() => {
            setButtonOption("Spectate");
            setOption(false);
          }}
        > Spectate </button>
        <button className="btn btn-warning w-1/3"> Practice Room </button>
    

      </div>
    </>
  )
}

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
