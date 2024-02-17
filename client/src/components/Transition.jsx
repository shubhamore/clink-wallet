import React,{useEffect, useRef} from 'react'
import {motion,useInView,useAnimation} from 'framer-motion'

export default function Transition({children}) {

  return (
    <div style={{position:'relative',width:'fit-content'}}>
        <motion.div variants={{ hidden: {y:150, opacity:0,scale:.5},visible:{y:0,opacity:1,scale:1}}} initial="hidden" whileInView="visible" viewport={{once:true}} transition={{duration:.25}}>
            {children}
        </motion.div>
    </div>
  )
}
