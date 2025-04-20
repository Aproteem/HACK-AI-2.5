"use client"
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Messages from './Messages';
import InputField from './InputField';
import { useUserContext } from "../UserContext";

const Chat = () => {
  const { chatbot, setChatbot,login} = useUserContext();  // Get setLogin and setUser from context
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  

  useEffect(() => {
    setChatbot(true);
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = useCallback(
  async (e) => {
    e.preventDefault();
    const userMessageText = input.trim();
    if (!userMessageText) return;

    const userMessage = { text: userMessageText, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessageText }),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        setMessages((prev) => [...prev, { text: data.message, sender: 'bot' }]);
      } else {
        throw new Error(data.error || 'API Error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: ${error.message}`,
          sender: 'bot',
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  },
  [input]
  );

  return (
    <section className="mb-14 flex justify-center items-center w-full h-full" 
      style={{ marginLeft: login && chatbot ? '60px' : '0' }}>
      <div className="bg-transparent shadow-lg rounded-lg w-full flex flex-col justify-between items-center h-full">
        {/* Header */}
        <div className="flex items-center justify-center flex-col py-4">
          <p className="text-black text-xl font-semibold">ChatBot</p>
          <p className="text-black opacity-70 text-[12px]">Version 1.0.0</p>
        </div>

        {/* Messages (scrollable) */}
        <div className="flex-1 w-[80vw] overflow-y-auto px-4 py-2" id="scrollableContainer">
          <Messages messages={messages} isTyping={isTyping} />
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center justify-center mt-4 w-full px-4 pb-4">
          <InputField input={input} onInputChange={setInput} onSend={handleSend} />
        </div>
      </div>
    </section>
  );
}

export default Chat