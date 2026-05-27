import { motion } from "framer-motion";
import logoImg from "@/assets/logo.png";

interface Props {
  size?: number;
  className?: string;
}

export function Logo({ size = 120, className = "" }: Props) {
  return (
    <div className={`flex items-center ${className}`}>
      <motion.img
        src={logoImg}
        alt="Logo"
        width={size}
        height={size}
        className="object-contain"
        initial={{ rotate: -8, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/** Full-screen logo intro shown on first paint. */
export function LogoIntro({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.9, duration: 0.6 }}
      onAnimationComplete={onDone}
      className="fixed inset-0 z-100 flex items-center justify-center bg-background pointer-events-none"
    >
      <Logo size={220} />
    </motion.div>
  );
}
