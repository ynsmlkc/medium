import Link from 'next/link'
import React from 'react'

const Notificitaion = () => {
  return (
    <Link href="/notifications">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className='text-[#6b6b6b]'>
            <path stroke="currentColor" strokeLinecap="round" d="M15 18.5a3 3 0 1 1-6 0">
            </path>
            <path stroke="currentColor" strokeLinejoin="round" d="M5.5 10.532V9a6.5 6.5 0 0 1 13 0v1.532c0 1.42.564 2.782 1.568 3.786l.032.032c.256.256.4.604.4.966v2.934a.25.25 0 0 1-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.934c0-.363.144-.71.4-.966l.032-.032A5.35 5.35 0 0 0 5.5 10.532Z">
            </path>
        </svg>
    </Link>
  )
}

export default Notificitaion