"use client"
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import Explore from './Explore'
import Notificitaion from './Notificitaion'
import Login from './Login'
import Writes from './Writes'
import Publish from './Publish'
import { usePathname } from 'next/navigation'


const Navbar = () => {
 
  const pathname = usePathname();

  return (
    <div className='border-b border-[#f2f2f2] flex justify-between p-3'>
       <div className='flex items-center gap-[14px]  '>
        <Link href="/">
          <Logo/> 
        </Link>
        <Explore/>
       </div>
       <div className='flex items-center gap-[28px]  '> 
        {pathname !== "/" &&  (
          <Publish/>
          )}
        {pathname !== "/yazi" && (
          <Writes/>
          )}
        <Notificitaion/>
        <Login/>
       </div>
   </div>
  )
}

export default Navbar