'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
//import TreeMenu from 'react-simple-tree-menu';
import { BsHouse, BsFillSdCardFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
// import { useTranslation } from "react-i18next";
export default function LeftBar() {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleLeftBar = () => {
    setIsVisible(prevState => !prevState);
  };
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  const pathname = usePathname();
  if (!isClient || pathname === '/' || pathname === '/login') {
    return null;
  }

  return (<div className="w-1/8 bg-fortinred h-screen text-white">

    <button onClick={toggleLeftBar} className="bg-white-500 text-black rounded">
      {isVisible ? <><BsFillArrowLeftCircleFill /></> : <><BsFillArrowLeftCircleFill /></>}
    </button>
    {
      !isVisible ? <><table className="table-auto w-100 border-collapse">
        <tbody>
          <tr>
            <td className="px-1 py-1">
              <Link href="/modules" className="block px-4 py-2 rounded hover:bg-white-100">
                <BsHouse size={15} color="black" />
              </Link>
            </td>
          </tr>
          <tr>
            <td className="px-1 py-1">
              <Link href="/serials" className="block px-4 py-2 rounded hover:bg-white-100">
                <BsFillSdCardFill size={15} color="black" />
              </Link>
            </td>
          </tr>
          <tr>
            <td className="px-1 py-1">
              <Link href="/rma" className="block px-4 py-2 rounded hover:bg-white-100">
                <BsFillSdCardFill size={15} color="black" />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      </> : ""
    }
    {
      isVisible && (isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-100 h-3 mb-2 shimmer rounded-lg"
            ></div>
          ))}
        </>
      ) : (
        <table className="table-auto w-100 border-collapse">
          <tbody>
            <tr>
              <td className="px-1 py-1">
                <Link href="/modules" className="block px-4 py-2 rounded hover:bg-white-100">
                  <BsHouse size={15} color="black" />
                </Link>
              </td>
              <td className="px-1 py-1">
                <Link href="/modules" className="block px-4 py-2 rounded hover:bg-white-100"> Modules</Link>
              </td>
            </tr>
            <tr>
              <td className="px-1 py-1">
                <Link href="/serials" className="block px-4 py-2 rounded hover:bg-white-100">
                  <BsFillSdCardFill size={15} color="black" />
                </Link>
              </td>
              <td className="px-1 py-1">
                <Link href="/serials" className="block px-4 py-2 rounded hover:bg-white-100"> Serials</Link>
              </td>
            </tr>

            <tr>
              <td className="px-1 py-1">
                <Link href="/rules" className="block px-4 py-2 rounded hover:bg-white-100">
                  <BsFillSdCardFill size={15} color="black" />
                </Link>
              </td>
              <td className="px-1 py-1">
                <Link href="/rules" className="block px-4 py-2 rounded hover:bg-white-100"> Rules</Link>
              </td>
            </tr>

          </tbody>
        </table>
      ))

    }
  </div >

  );
}
