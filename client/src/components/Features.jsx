import React from 'react'
import { motion } from 'framer-motion'


export default function Features() {
  return (
    <motion.section variants={{ hidden: { y: 150, opacity: 0, scale: .5 }, visible: { y: 0, opacity: 1, scale: 1 } }} initial="hidden" whileInView="visible" transition={{ duration: .5 }} className='min-h-screen my-20 flex justify-evenly items-center text-center relative flex-col'>
      <div class="gradiant-3"></div>
      <h1 className='text-3xl my-10'>Unlock a world of financial freedom with <span className='gradient-text'>Clink</span>. Our secure and user-friendly platform empowers you to manage your money effortlessly.</h1>
      <h1 className='text-7xl my-10'>Features</h1>
      <div className='flex justify-center items-center mt-5 flex-wrap gap-3'>
        <div className='flex justify-center p-5  flex-col mx-2 hover:scale-105 ease-in duration-300 w-96 max-w-screen bg-zinc-900 rounded-xl h-56'>
          <h1 className='text-3xl mb-5 text-left text-slate-50'>Send Money Instantly</h1>
          <p className='text-xl text-justify text-slate-300'>Seamlessly transfer funds to friends and family with just a few clicks. Experience the speed of Clink. No more waiting, just instant transactions.</p>
        </div>
        <div className='flex justify-center p-5  flex-col mx-2 hover:scale-105 ease-in duration-300 w-96 max-w-screen bg-zinc-900 rounded-xl h-56'>
          <h1 className='text-3xl mb-5 text-left text-slate-50'>Secure and Private</h1>
          <p className='text-xl text-justify text-slate-300'>Your security is our priority. With state-of-the-art encryption, Clink ensures your transactions and personal information are always safe.</p>
        </div>
        <div className='flex justify-center p-5  flex-col mx-2 hover:scale-105 ease-in duration-300 w-96 max-w-screen bg-zinc-900 rounded-xl h-56'>
          <h1 className='text-3xl mb-5 text-left text-slate-50'>Social Integration</h1>
          <p className='text-xl text-justify text-slate-300'> Connect with friends, split bills, and easily manage shared expenses. Clink makes financial collaboration a breeze.</p>
        </div>
      </div>
    </motion.section>
  )
}
