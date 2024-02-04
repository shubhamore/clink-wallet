import { useScroll, motion, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

const cards = [
    { 
      author: 'Alex Rodriguez', 
      description: 'Ever since I started using Clink, managing my expenses has become a joy. The intuitive interface and detailed insights have turned my financial planning into a game-changer. Highly recommended!'
    },
    { 
      author: 'Emily Chang', 
      description: "I was searching for a secure and user-friendly wallet, and I'm so glad I found Clink. The quick transactions and robust security features give me peace of mind, making it my go-to choice for all financial transactions."
    },
    { 
      author: 'Michael Bennett', 
      description: "As a frequent traveler, Clink has become my reliable companion. Sending money internationally is a breeze, and the currency conversion feature has saved me a lot of hassle. It's the perfect travel wallet!"
    },
    { 
      author: 'Sarah Turner', 
      description: "I love how Clink seamlessly integrates with my social life. Splitting bills with friends and keeping track of shared expenses has never been this easy. The social aspect sets it apart from other wallets!"
    },
    { 
      author: 'Robert Garcia', 
      description: "Security is paramount for me, and Clink exceeds my expectations. The multi-layered security measures and real-time alerts make me feel confident in every transaction. Trust is everything, and Clink has earned mine."
    },
    { 
      author: 'Olivia Martinez', 
      description: "The budgeting tools in Clink have transformed the way I manage my finances. Setting goals and tracking my spending has never been this straightforward. It's like having a personal financial advisor in my pocket!"
    },
  ];

const Card = ({ description,author }) => {
    return (
        <div
            className="group relative px-7 py-4 h-[350px] w-[250px] overflow-hidden backdrop-blur-lg rounded-xl shadow-lg bg-gradient-to-br from-white/20 to-white/0"
        >
            <h1>{description}</h1>
            <h2>{author}</h2>
        </div>
    );
};

export default function HorizontalScroll() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-45%"]);
    return (
        <div ref={targetRef} className='relative w-full h-[300vh] '>
            <h1 className='text-7xl text-center'>Testimonials</h1>
            <div className='w-screen sticky top-0 h-screen flex items-center'>
                <div class='gradiant-1'></div>
                <div class='gradiant-2'></div>
                <div class='gradiant-3'></div>
                <motion.div style={{ x }} className='flex gap-10'>
                    {cards.map((card, index) => (
                        <Card key={index} description={card.description} author={card.author} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
