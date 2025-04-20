"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "./Nav";
import SidebarNav from "./SidebarNav";
import { useUserContext } from '../UserContext';
import Image from 'next/image';

const Header = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const { chatbot, login } = useUserContext();

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <>
            {/* Always render SidebarNav when in chatbot mode */}
            {chatbot && (
                <>
                    {console.log('Rendering SidebarNav')}
                    <SidebarNav />
                </>
            )}
            
            {/* Regular header - only show when not in chatbot mode */}
            {!chatbot && (
                <header
                    className={`px-3 fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
                        visible
                            ? "translate-y-0 bg-opacity-20 bg-gradient-to-b from-black to-transparent"
                            : "-translate-y-full bg-transparent"
                    }`}
                >
                    <div className={`pt-6 px-4  text-white transition-all duration-300 ease-in-out ${
                        visible ? "opacity-100" : "opacity-0"
                    }`}>
                        <div className="container mx-auto flex justify-between items-center">
  {/* <Link href="/"> */}
  <h1 className="flex flex-row  font-semibold items-center">
    <Image src="/logo2.png" alt="Logo" width={50} height={50} />
    <div className="text-[22px] font-bold">FinSight</div>
  </h1>
  {/* </Link> */}
  
  <Nav />
  <div></div>
</div>
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;