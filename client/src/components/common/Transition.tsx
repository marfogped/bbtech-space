import { motion } from "framer-motion";

const transitionVariants = {
    initial : {
        x: "100%",
        width: "100%"
    },
    animate: {
        x: "0%",
        width: "0%"
    },
    exit: {
        x: ["0%", "100%"],
        width: ["0%", "100%"],
    }
}

const Transition = () => {
  return (
    <>
        <motion.div 
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit={"exit"}
        onAnimationStart={() => document.body.classList.add("overflow-hidden")}
        onAnimationComplete={() =>
            document.body.classList.remove("overflow-hidden")
        }
        transition={{ delay: 0.2, duration: 0.6, ease: [0.87, 0, 0.13, 1]}}
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-[70] bg-[#040404]'
        />
        <motion.div 
        variants={transitionVariants}
        initial="initial"
        animate="animate"
        exit={"exit"}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.87, 0, 0.13, 1]}}
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-[60] bg-[#9A11D9]'
        />
    </>
  )
}

export default Transition