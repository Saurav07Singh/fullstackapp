import React from 'react'
import { Navigate,useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate= useNavigate();

  return (
    <section className='px-2= w-full h-screen outline '>
      <div className='pt-20 w-full  flex justify-end'>
      
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{navigate('/')}}>Login</button>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-6' onClick={()=>{navigate('/signup')}}>SignUp</button>
      </div>
      <div className=' w-full h-3/4 flex justify-center items-center flex-col'>
      <h1 className=' text-7xl md:text-9xl font-semibold'>¯\_(ツ)_/¯</h1>
      <p className=' text-xl mt-8'>Uh oh!</p>
      <p className=' text-center md:text-xl mt-5'>Either there’s a tear in the matrix or the page you’re looking for no longer exists</p>
      </div>

    </section>
  )
}

export default Error