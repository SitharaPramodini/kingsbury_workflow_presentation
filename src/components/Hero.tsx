import { motion } from "framer-motion";
import { Phone, MessageSquare, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-light.jpg";
import { Logo } from "./Logo";

const TYPED = "Transforming customer calls into personalized dining experiences.";

export function Hero({ onEnter }: { onEnter: () => void }) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++; setTyped(TYPED.slice(0, i));
      if (i >= TYPED.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          src={heroImg}
          alt="Bright luxury restaurant interior"
          className="h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      {/* Top nav */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5">
        <Logo />
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <button onClick={onEnter} className="hover:text-foreground transition-colors">Story Mode</button>
          <a href="#about" className="hover:text-foreground transition-colors">Platform</a>
          <a href="#about" className="hover:text-foreground transition-colors">Experience</a>
        </div>
        <button
          onClick={onEnter}
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground/90 px-5 py-2 text-xs text-background hover:bg-foreground transition"
        >
          <Sparkles className="h-3.5 w-3.5" /> Begin Demo
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] tracking-[0.25em] text-foreground/70 uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Live Interactive Showcase
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] mb-6 text-foreground"
        >
          Smart Reservation &
          <br />
          <span className="gradient-text italic">Customer Experience</span>
          <br />
          Management
        </motion.h1>

        <p className="caret mx-auto max-w-2xl text-base md:text-lg text-muted-foreground min-h-[3rem]">
          {typed}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onEnter}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[oklch(0.82_0.13_75)] to-[oklch(0.68_0.14_55)] px-8 py-3.5 text-sm font-medium text-white glow-gold transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Enter Story Mode →</span>
          </button>
          <a
            href="#about"
            className="rounded-full glass px-8 py-3.5 text-sm text-foreground hover:bg-white transition-colors"
          >
            About the Platform
          </a>
        </motion.div>

      </div>

      <FloatingCallCard />
      <FloatingSmsCard />

      <motion.button
        onClick={onEnter}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-gold z-10"
        aria-label="Enter story mode"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}

function FloatingCallCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60, y: 30 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.9, duration: 0.8, ease: "easeOut" }}
      className="hidden xl:block absolute left-2 bottom-40 glass-strong rounded-2xl p-4 w-64 z-10"
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="pulse-ring relative h-10 w-10 rounded-full bg-gold/15 flex items-center justify-center">
            <Phone className="h-4 w-4 text-gold" />
          </div>
        </div>
        <div className="text-left">
          <div className="text-[11px] text-muted-foreground">Incoming call</div>
          <div className="text-sm font-medium text-foreground">+94 77 456 7821</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ height: [4, 12 + (i % 4) * 4, 4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.08 }}
            className="w-1 rounded-full bg-gold"
            style={{ height: 4 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function FloatingSmsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 30 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      className="hidden xl:block absolute right-2 bottom-44 glass-strong rounded-2xl p-4 w-72 z-10"
    >
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="h-4 w-4 text-gold" />
        <span className="text-[11px] text-muted-foreground">Delivered · now</span>
      </div>
      <p className="text-sm leading-relaxed text-left text-foreground/80">
        Dear Mr. Nimal - your birthday celebration for 5 is confirmed for tomorrow at 7:30 PM.
        <span className="text-gold"> - Harbour Court</span>
      </p>
    </motion.div>
  );
}
