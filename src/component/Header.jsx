import React from 'react'
import icon from "./logo/i.png"
export const Header = () => {
    return (
        <div className='bg-fuchsia-700  text-white p-2 text-2xl flex justify-center items-center'><div className="logo flex-1 ml-6 ">
            <img src={icon} className='w-16 bg-white p-2 border-2 rounded-3xl cursor-pointer' alt='noimg' />
            </div>
           
        </div>
    )
}
