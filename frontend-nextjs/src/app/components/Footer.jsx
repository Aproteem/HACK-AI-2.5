"use client"
import React from 'react'
import { useUserContext } from "../UserContext";

const Footer = () => {
  const { chatbot } = useUserContext();
  return (
    <div>
      {!chatbot&&(
        <div className=" flex items-center justify-center text-white">
          <div className="sm:mr-[20px] mr-0  w-[46%] md:text-[12px] text-[10px] bottom-7 leading-[30px] justify-center items-center  flex flex-row gap-1">
            <div className="text-nowrap">@ Copyright 2025,</div>
            <div className="text-nowrap font-bold">HackAI Team FinSight</div>
            <div className="text-nowrap">- All rights reserved</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Footer