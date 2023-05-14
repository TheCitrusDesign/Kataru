import * as React from "react"
import Link from 'next/link'
import { motion } from "framer-motion"

import { CoverImage } from "@features/Posts/components";

import Styles from "@styles/HeroHome.module.css"

const transition = { duration: 0.6, easing: [0.43, 0.13, 0.23, 0.96] };

const HeroHome = () => (
  <div className='flex flex-row justify-center items-center'>
    <div className={Styles.image_container}>
      <div
        className={Styles.thumbnail}
        style={{
          top: "-69px",
          width: "524px",
          height: "650px",
        }}
      >
        <div className={Styles.frame}>
          <Link href={{ pathname: `${process.env.NEXT_PUBLIC_URL}/home` }}>
            <motion.div
              transition={transition}
            >
              <img src={"/assets/blog/authors/full.jpg"} />
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default HeroHome;