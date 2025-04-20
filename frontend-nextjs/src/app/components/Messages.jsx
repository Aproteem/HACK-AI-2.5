'use client';

import React from 'react';
import TypingText from './TypingText'; // Make sure the path is correct

const Messages = ({ messages, isTyping }) => {
  return (
    <div className="bg-transparent p-4 rounded-md overflow-y-auto flex flex-col space-y-2 h-auto overflow-visible w-full">
      {messages.length === 0 ? (
        <p className="text-[#ffffff]/70 italic text-center">
          Hello! I am your personal assistant, feel free to ask anything related to the uploaded document!
        </p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.sender === 'bot' ? 'items-start' : 'items-end'
            }`}
          >
            <p
              className={`text-sm text-[#ffffff] opacity-80 mb-2 ${
                msg.sender === 'bot' ? 'pl-3' : 'pr-3'
              }`}
            >
              {msg.sender === 'bot' ? 'AI Agent' : 'You'}
            </p>
            <div
              className={ `px-6 overflow-auto max-w-[50%] h-auto p-3 rounded-[20px]  shadow-md ${
                msg.sender === 'bot'
                  ? 'bg-[#000000]/50 border-2 border-black text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <TypingText text={msg.text} />
            </div>
          </div>
        ))
      )}

      {isTyping && (
        <div className="flex flex-col items-start">
          <p className="text-sm text-white opacity-80 mb-2 pl-3">
            AI Agent is typing...
          </p>
          <div className="overflow-auto max-w-[50%] h-auto p-3 rounded-[20px] bg-[#000000]/50 border-2 border-black text-white
          ">
            <div className="flex space-x-1 animate-pulse">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Messages);
