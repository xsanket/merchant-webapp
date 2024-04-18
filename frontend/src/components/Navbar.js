import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
    const navigate = useNavigate();






    return (
        <div className='bg-red-400 border-b shadow-sm sticky top-0 z-40'>
            <header className='flex justify-between px-3 max-w-6xl mx-auto'>
                <div className='py-3'>
                    <img src='/logo.png' alt='Img food app'
                        className='h-5 cursor-pointer ' onClick={() => {
                            navigate("/")
                        }} />
                </div>
                <div className='footer-container flex justify-center items-center'>
                    <a
                        href='https://github.com/xsanket?tab=repositories'
                        target='_blank'
                        className='icon text-2xl mr-4 cursor-pointer hover:text-gray-400'
                    >
                        <FaGithub />
                    </a>
                    {/* <a
                        href='https://www.linkedin.com/in/sanket-kamble-9840b6252/'
                        target='_blank'
                        className='icon text-2xl cursor-pointer hover:text-gray-400'
                    >
                        <FaLinkedin />
                    </a> */}
                </div>

                <div>
                    <ul className='flex cursor-pointer space-x-10'>
                        <li className={`py-3 text-sm font-semibold 
                             text-white border-b-[3px]
                             "text-black border-b-red-600"}`} onClick={() => { navigate("/") }}>Home</li>
                        <li className={`py-3 text-sm font-semibold 
                             text-white border-b-[3px]
                             "text-black border-b-red-600"}`} onClick={() => { navigate("/PartnerWithFoodApp") }} >Add Restaurant</li>

                    </ul>
                </div>
            </header>
        </div>
    )
}