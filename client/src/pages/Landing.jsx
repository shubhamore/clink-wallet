import React from 'react'
import { Link } from "react-router-dom"
import Down from '../assets/down.png'
import { motion } from 'framer-motion'
import Transition from '../components/Transition'
import HorizontalScroll from '../components/HorizontalScroll'
import HomeNav from '../components/HomeNav'
import Welcome from '../components/Welcome'
import Features from '../components/Features'
import Cta from '../components/Cta'
import Steps from '../components/Steps'

export default function Landing() {
  return (<>
    <HomeNav/>
    <Welcome/>
    <div class="gradiant-2"></div>
    <Features/>
    <Steps/>
    <Transition>
      <Cta/>
    </Transition>
    <HorizontalScroll/>

    
  </>
  )
}
