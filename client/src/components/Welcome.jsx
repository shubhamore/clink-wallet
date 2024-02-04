import React from 'react'
import Down from '../assets/down.png'
import { motion } from 'framer-motion'


export default function Welcome() {
  return (
    <section className='w-full h-screen flex justify-center items-center text-center relative'>
      <div class="gradiant-1"></div>
      <div>
        <motion.h1 initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: .15 }} className='text-7xl'>Welcome to <span className='gradient-text'>Clink</span> Wallet</motion.h1>
        <motion.h1 initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: .15 }} className='text-xl mt-5'>Your All-in-One Financial Companion!</motion.h1>
      </div>
      <motion.img initial={{ y: -25 }} animate={{ y: [0, -25, 0] }} transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }} src={Down} alt="down" className='absolute bottom-14' />
    </section>
  )
}
