import { motion, useScroll } from "framer-motion";
import Styles from '../styles/ScrollProgress.module.css'

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();

    return (
        <>
            <motion.div
                className='fixed top-0 left-0 right-0 bottom-0 z-50 h-3 bg-light-blue origin-[0%]'
                style={{ scaleX: scrollYProgress }}
            />
        </>
    );
}

export default ScrollProgress