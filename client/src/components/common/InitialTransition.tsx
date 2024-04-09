import { motion } from "framer-motion";
import { useEnhancerMode } from "../../lib/useEnhancerMode";
import SplineModel from "./SplineModel";

const InitialTransition = () => {
  const { enhancedMode, internetSpeed } = useEnhancerMode();

  const showSplineModel =
    (internetSpeed === "4G" || internetSpeed === "unknown") && !enhancedMode;

  const darkBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      height: 0,
      transition: {
        when: "afterChildren",
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  const modelContainer = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
      transition: {
        duration: 5,
      },
    },
  };

  const textContainer = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
      transition: {
        duration: 0.25,
        when: "afterChildren",
      },
    },
  };

  const text = {
    initial: {
      y: 20,
    },
    animate: {
      y: 100,
      transition: {
        duration: 4,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  return (
    <motion.div
      className="absolute z-[60] flex items-center justify-center w-full bg-[#040404] pointer-events-none"
      initial="initial"
      animate="animate"
      variants={darkBox}
      onAnimationStart={() => document.body.classList.add("overflow-hidden")}
      onAnimationComplete={() =>
        document.body.classList.remove("overflow-hidden")
      }
    >
      {showSplineModel ? (
        <motion.div variants={modelContainer}>
          <SplineModel
            delay={0}
            splineModelUrl={
              "https://prod.spline.design/jbbME-z8f2ozAgpR/scene.splinecode"
            }
          />
        </motion.div>
      ) : (
        <motion.svg variants={textContainer} className="absolute z-[60] flex">
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width={800}
            height={800}
            className="text-purplePrimary "
          >
            <rect className="w-full h-full fill-current" />
            <motion.rect
              variants={text}
              className="w-full h-full text-white fill-current"
            />
          </pattern>
          <text
            className="text-4xl font-bold font-zenKaku"
            textAnchor="middle"
            x="50%"
            y="50%"
            style={{ fill: "url(#pattern)" }}
          >
            BBTECH Space
          </text>
        </motion.svg>
      )}
    </motion.div>
  );
};

export default InitialTransition;
