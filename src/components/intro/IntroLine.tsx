"use client";

import { motion } from "motion/react";
import BlurText from "@/components/reactbits/BlurText";

type IntroLineProps = {
  text: string;
  isReceding: boolean;
};

export function IntroLine({ text, isReceding }: IntroLineProps) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6"
      initial={{ opacity: 1 }}
      animate={
        isReceding
          ? { opacity: 0, scale: 0.92, y: -16, filter: "blur(10px)" }
          : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
      }
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
    >
      <BlurText
        text={text}
        autoStart={true}
        animateBy="words"
        direction="bottom"
        delay={120}
        stepDuration={0.4}
        className="text-display text-center justify-center text-foreground font-semibold"
      />
    </motion.div>
  );
}
