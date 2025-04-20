"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserContext } from '../UserContext';  // Import context hook
import { useRouter } from "next/navigation"; 

const links = [
    {
        name: "home",
        path: "/",
    },
    {
        name: "chatbot",
        path: "/chatbot",
    },
    {
        name: "Documentation",
        path: "/documentation",
    },
    {
        name: "About Us",
        path: "/about",
    },
];

const Nav = () => {
  const router = useRouter(); 
    const { login, setLogin } = useUserContext();  // Access login state from context
    const pathname = usePathname();
    const logout = () => {
        setLogin(false);
        router.push("/");
    }
    return (
        <nav className="flex flex-row justify-center items-center gap-8">
            {login && 
            links.map((link, index) => {  // Only render links if logged in
                return (
                    <Link
                        href={link.path}
                        key={index}
                        className={`${link.path === pathname &&
                            "text-[#0000ff]  border-[#0000ff]"
                            } capitalize font-medium rounded-xl  px-3 py-2  hover:bg-blue-600 transition-all duration-200`}
                    >
                        {link.name}
                    </Link>
                );
            })      
            }
            {login && (<button onClick={logout}  className="font-bold transition-all duration-200 p-2 rounded-xl text-lg border-white border-1 hover:border-transparent  text-white bg-transparent hover:scale-110 hover:bg-[#db3f3f] hover:text-white active:bg-[#0000ff] focus:outline-none focus:text-white active:text-black focus:ring focus:ring-[#ffffff]">
                                Logout
                            </button>
                        )
            }
        </nav>
    );
};

export default Nav;
