'use client';

import { FaArrowUp } from "react-icons/fa";

const InputField = ({ input, onInputChange, onSend }) => {
  return (
    <form
      onSubmit={onSend}
      className="mt-4 flex w-full justify-center items-center"
    >
      <div className="bg-[#003554]/70 border-[#003554]/70 h-[65px] md:w-[700px] w-full rounded-full border-2  justify-between flex">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message..."
          className="border-none outline-none bg-transparent pl-4 w-full text-white"
        />
        <button
          type="submit"
          className="ml-2 bg-[#003554] text-white p-5  rounded-full"
        >
          <FaArrowUp />
        </button>
      </div>
    </form>
  );
};

export default InputField;
