'use client';

import { FaArrowUp } from "react-icons/fa";

const InputField = ({ input, onInputChange, onSend }) => {
  return (
    <form
      onSubmit={onSend}
      className="mt-4 flex w-full justify-center items-center"
    >
      <div className="bg-zinc-500/70 border-zinc-500/70 h-[65px] md:w-[700px] w-full rounded-xl border-2  justify-between flex">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message..."
          className="border-none outline-none bg-transparent pl-4 w-full text-white"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white scale-55 px-4  rounded-xl"
        >
          <FaArrowUp />
        </button>
      </div>
    </form>
  );
};

export default InputField;
// #051923
// #003554
// #006494
// #0582CA
// #00A6FB