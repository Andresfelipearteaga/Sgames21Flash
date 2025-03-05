import React from 'react'
import logo from "../../assets/logoHorizontalBlanco.png"

const logoSection = () => {
  return (
    <div className='flex justify-center items-center p-2'>
        <img src={logo} alt="logo" className="w-12/13" />
    </div>
  )
}

export default logoSection
