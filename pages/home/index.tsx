import React, { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import Layout from 'components/layout'

import Styles from "@styles/HeroHome.module.css"

//Ease
const transition = { duration: 1.4, easing: [0.6, 0.01, -0.05, 0.9] };

const firstName = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const lastName = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    if (canScroll === false) {
      document.querySelector("body").classList.add("no-scroll");
    } else {
      document.querySelector("body").classList.remove("no-scroll");
    }
  }, [canScroll]);

  return (
    <Layout>
      <motion.div
        onAnimationComplete={() => setCanScroll(true)}
        className={Styles.single}
        initial='initial'
        animate='animate'
        exit='exit'>
        <div className='mx-auto'>
          <div className='flex flex-row justify-center items-center'>
            <div className={Styles.top}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.2, ...transition },
                }}
                className={Styles.details}>
                <div className={Styles.location}>
                  <span>28.538336</span>
                  <span>-81.379234</span>
                </div>
                <div className={Styles.mua}>MUA: @mylifeascrystall</div>
              </motion.div>
              <motion.div className={`${Styles.model}`}>
                <motion.span className={Styles.first} variants={firstName}>
                  <motion.span variants={letter}>H</motion.span>
                  <motion.span variants={letter}>e</motion.span>
                  <motion.span variants={letter}>y</motion.span>
                  <motion.span variants={letter}>,</motion.span>
                  <motion.span variants={letter}>I</motion.span>
                  <motion.span variants={letter}>'</motion.span>
                  <motion.span variants={letter}>m</motion.span>
                </motion.span>
                <motion.span className={Styles.last} variants={lastName}>
                  <motion.span variants={letter}>B</motion.span>
                  <motion.span variants={letter}>l</motion.span>
                  <motion.span variants={letter}>o</motion.span>
                  <motion.span variants={letter}>g</motion.span>
                  <motion.span variants={letter}>g</motion.span>
                  <motion.span variants={letter}>y</motion.span>
                  <motion.span variants={letter}>.</motion.span>
                </motion.span>
              </motion.div>
            </div>
          </div>
          <div className={`${Styles.row} ${Styles.bottom_row}`}>
            <div className={Styles.bottom}>
              <div className={Styles.image_container_single}>
                <motion.div
                  initial={{
                    y: "-50%",
                    width: "524px",
                    height: "650px",
                  }}
                  animate={{
                    y: 0,
                    width: "100%",
                    height: typeof window !== "undefined" && window.innerWidth > 2400 ? 800 : 600,
                    transition: { delay: 0.2, ...transition },
                  }}
                  className={Styles.thumbnail_single}>
                  <div className={`${Styles.frame_single}`}>
                    <motion.img
                      src={"/assets/blog/authors/full.jpg"}
                      style={{ scale: scale }}
                      initial={{ scale: 1.0 }}
                      animate={{
                        transition: { delay: 0.2, ...transition },
                        y: typeof window !== "undefined" && window.innerWidth > 2400 ? -1200 : -600,
                      }}
                      whileHover='hover'
                      transition={transition}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Home;