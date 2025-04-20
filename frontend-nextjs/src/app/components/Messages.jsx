'use client';

import React from 'react';
import TypingText from './TypingText'; // Make sure the path is correct

const Messages = ({ messages, isTyping }) => {
  return (
    <div className="bg-transparent p-4 rounded-md overflow-y-auto flex flex-col space-y-2 h-auto overflow-visible w-full">
      {messages.length === 0 ? (
        <p className="text-[#003554] italic text-center">
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
              className={`text-sm text-[#003554] opacity-80 mb-2 ${
                msg.sender === 'bot' ? 'pl-3' : 'pr-3'
              }`}
            >
              {msg.sender === 'bot' ? 'LegalAI' : 'You'}
            </p>
            <div
              className={ `px-6 overflow-auto max-w-[50%] h-auto p-3 rounded-[20px]  shadow-md ${
                msg.sender === 'bot'
                  ? 'bg-[#006494] border-2 border-white text-white'
                  : 'bg-[#003554]/70 text-white'
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
            LegalAI is typing...
          </p>
          <div className="overflow-auto max-w-[50%] h-auto p-3 rounded-[20px] shadow-md bg-transparent border-2 border-white text-white">
            <div className="flex space-x-1 animate-pulse">
              <span className="w-2 h-2 bg-[#003554] rounded-full"></span>
              <span className="w-2 h-2 bg-[#003554] rounded-full"></span>
              <span className="w-2 h-2 bg-[#003554] rounded-full"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Messages);
