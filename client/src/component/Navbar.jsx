import React from 'react'

export default function Navbar() {
  return (
    <div className='w-full flex justify-between h-20 items-center bg-gray-200 shadow px-5' >
      <div className='w-[10%] h-full flex items-center'>
<h1 className='font-bold text-zinc-50'>Logo</h1>
      </div>
      <div className='w-[50%]'>
        <div className='w-full h-full flex gap-6 list-none items-center'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>

        </div>

      </div>

    </div>
  )
}
