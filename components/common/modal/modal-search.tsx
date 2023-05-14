import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { AnimatePresence, motion } from "framer-motion"

import { searchBar, overlay } from "@core/utilities/MotionVariants"

import Styles from "@styles/Header.module.css"

function Modal({ show, onClose, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <AnimatePresence>
      <div className={Styles.search_section}>
        <motion.div
          className={Styles.search_wrap}
          variants={searchBar}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", bounce: 0, duration: .45 }}
        >
          <span className={Styles.search_close} onClick={(e) => handleCloseClick(e)}>
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.997 10.846L1.369.219 1.363.214A.814.814 0 00.818.005.821.821 0 000 .822c0 .201.074.395.208.545l.006.006L10.842 12 .214 22.626l-.006.006a.822.822 0 00-.208.546c0 .447.37.817.818.817a.814.814 0 00.551-.215l10.628-10.627 10.628 10.628.005.005a.816.816 0 001.368-.603.816.816 0 00-.213-.552l-.006-.005L13.151 12l10.63-10.627c.003 0 .004-.003.006-.005A.82.82 0 0024 .817a.817.817 0 00-1.37-.602l-.004.004-10.63 10.627z"></path></svg>
          </span>
          {children}
        </motion.div>
        <motion.div
          className={Styles.search_overlay}
          variants={overlay}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", bounce: 0, duration: .25 }}
        />
      </div>
    </AnimatePresence>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }

}

export default Modal;