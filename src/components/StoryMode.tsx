import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  PhoneIncoming, UserCheck, CalendarCheck2, MessageSquare,
  DoorOpen, Armchair, PartyPopper, Utensils, Star, Send,
  Cake, Crown, MapPin, Check, Sparkles as Spark,
} from "lucide-react";
import { Logo } from "./Logo";
import heroImg from "@/assets/hero-light.jpg";
import entranceImg from "@/assets/entrance.jpg";
import celebrationImg from "@/assets/celebration.jpg";
import romanticImg from "@/assets/romantic.jpg";
import charSarah from "@/assets/char-sarah.jpg";
import charNimal from "@/assets/char-nimal.jpg";
import charDaniel from "@/assets/char-daniel.jpg";
import charKevin from "@/assets/char-kevin.jpg";

/* ──────────────────────────────────────────────────────────────
   STEP DEFINITIONS
   ────────────────────────────────────────────────────────────── */

type Step = {
  id: string;
  label: string;
  icon: typeof PhoneIncoming;
  title: string;
  kicker: string;
};

const STEPS: Step[] = [
  { id: "call",        label: "Incoming Call",         icon: PhoneIncoming,  title: "The Call Begins",            kicker: "Scene 01" },
  { id: "verify",      label: "Customer Verification", icon: UserCheck,      title: "Recognising the Guest",       kicker: "Scene 02" },
  { id: "reservation", label: "Reservation",           icon: CalendarCheck2, title: "Finding the Booking",         kicker: "Scene 03" },
  { id: "confirm",     label: "Confirmation",          icon: MessageSquare,  title: "Confirmation & SMS",          kicker: "Scene 04" },
  { id: "reminder",    label: "Reminder",              icon: Spark,          title: "One Day Later",               kicker: "Scene 05" },
  { id: "arrival",     label: "Arrival",               icon: DoorOpen,       title: "Welcome to Harbour Court",           kicker: "Scene 06" },
  { id: "table",       label: "Table Assignment",      icon: Armchair,       title: "Seating the Guest",           kicker: "Scene 07" },
  { id: "celebration", label: "Celebration",           icon: PartyPopper,    title: "The Birthday Surprise",       kicker: "Scene 08" },
  { id: "feedback",    label: "Feedback",              icon: Star,           title: "Capturing the Moment",        kicker: "Scene 09" },
  { id: "thanks",      label: "Thank You",             icon: Send,           title: "Closing the Loop",            kicker: "Scene 10" },
];

/* ──────────────────────────────────────────────────────────────
   STORY MODE - sticky top nav + horizontal scroll panels
   ────────────────────────────────────────────────────────────── */

export function StoryMode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // The total scrollable height = panels * 100vh, but the inner rail is horizontal.
  const { scrollYProgress } = useScroll({ target: containerRef });
  // Move horizontally from 0 to -(n-1)/n of the rail width
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(100 * (STEPS.length - 1)) / STEPS.length}%`]);
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Track active panel from scroll position
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(STEPS.length - 1, Math.max(0, Math.round(v * (STEPS.length - 1))));
      setActive(idx);
    });
  }, [scrollYProgress]);

  const jumpTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const totalScrollable = el.offsetHeight - window.innerHeight;
    const targetTop = el.offsetTop + (index / (STEPS.length - 1)) * totalScrollable;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  return (
    <section
      id="story"
      ref={containerRef}
      style={{ height: `${STEPS.length * 100}vh` }}
      className="relative bg-gradient-to-b from-ivory via-background to-sand"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Top sticky nav */}
        <StickyTopNav steps={STEPS} active={active} onJump={jumpTo} progressW={progressW} />

        {/* Horizontal rail */}
        <motion.div
          style={{ x, width: `${STEPS.length * 100}%` }}
          className="flex h-full pt-[88px]"
        >
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ width: `${100 / STEPS.length}%` }} className="h-full shrink-0">
              <PanelFrame step={s} index={i} isActive={i === active}>
                {renderPanel(s.id, i === active)}
              </PanelFrame>
            </div>
          ))}
        </motion.div>

        {/* Floating step indicator (bottom-right) */}
        <div className="absolute bottom-6 right-6 z-30 glass rounded-full px-4 py-2 text-xs text-foreground/70">
          <span className="text-gold font-medium">{String(active + 1).padStart(2, "0")}</span>
          <span className="mx-1 text-muted-foreground">/</span>
          <span>{String(STEPS.length).padStart(2, "0")}</span>
          <span className="ml-2 text-muted-foreground">· scroll to advance</span>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   STICKY TOP NAV TIMELINE
   ────────────────────────────────────────────────────────────── */

function StickyTopNav({
  steps, active, onJump, progressW,
}: {
  steps: Step[];
  active: number;
  onJump: (i: number) => void;
  progressW: any;
}) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30">
      <div className="glass-strong border-b border-border/60">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8 py-3 flex items-center gap-4">
          <Logo size={88} />
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 min-w-max">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => onJump(i)}
                    className={`group relative flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] tracking-wide transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                    }`}
                  >
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-medium ${
                      isActive ? "bg-gold text-white" : "bg-muted text-muted-foreground"
                    }`}>{i + 1}</span>
                    <Icon className="h-3 w-3" />
                    <span className="hidden md:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-[2px] bg-border/40 overflow-hidden">
          <motion.div style={{ width: progressW }} className="h-full bg-gradient-to-r from-gold to-[oklch(0.68_0.14_55)]" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PANEL FRAME
   ────────────────────────────────────────────────────────────── */

function PanelFrame({
  step, index, isActive, children,
}: { step: Step; index: number; isActive: boolean; children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Soft background art */}
      <div className="absolute inset-0 -z-10 opacity-[0.45]">
        <div className="absolute inset-0" style={{
          background:
            index % 2 === 0
              ? "radial-gradient(ellipse at 15% 20%, oklch(0.92 0.07 75 / 0.7), transparent 55%)"
              : "radial-gradient(ellipse at 85% 80%, oklch(0.9 0.08 55 / 0.6), transparent 55%)",
        }} />
      </div>

      <div className="mx-auto h-full max-w-[1400px] px-6 md:px-12 py-8 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between gap-6 mb-6"
        >
          <div>
            <div className="text-[10px] tracking-[0.4em] text-gold uppercase mb-2">{step.kicker}</div>
            <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[1.05]">
              {step.title}
            </h2>
          </div>
          <div className="hidden md:block text-right text-xs text-muted-foreground">
            <div>Step {index + 1} of {STEPS.length}</div>
            <div className="font-medium text-foreground/80">{step.label}</div>
          </div>
        </motion.div>

        <div className="flex-1 min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PANEL CONTENT - comic-style scenes
   ────────────────────────────────────────────────────────────── */

function renderPanel(id: string, isActive: boolean) {
  switch (id) {
    case "call":        return <PanelCall isActive={isActive} />;
    case "verify":      return <PanelVerify isActive={isActive} />;
    case "reservation": return <PanelReservation isActive={isActive} />;
    case "confirm":     return <PanelConfirm isActive={isActive} />;
    case "reminder":    return <PanelReminder isActive={isActive} />;
    case "arrival":     return <PanelArrival isActive={isActive} />;
    case "table":       return <PanelTable isActive={isActive} />;
    case "celebration": return <PanelCelebration isActive={isActive} />;
    case "feedback":    return <PanelFeedback isActive={isActive} />;
    case "thanks":      return <PanelThanks isActive={isActive} />;
  }
  return null;
}

/* Helpers */
function Bubble({ side = "left", who, color = "ivory", children, delay = 0 }:
  { side?: "left" | "right"; who: string; color?: "ivory" | "gold"; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`relative max-w-sm rounded-2xl px-4 py-3 elegant-shadow ${
        color === "gold" ? "bg-gradient-to-br from-[oklch(0.95_0.06_75)] to-[oklch(0.9_0.08_60)]" : "bg-white"
      } ${side === "right" ? "ml-auto" : ""}`}
    >
      <div className="text-[10px] uppercase tracking-widest text-gold mb-1">{who}</div>
      <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
      <span className={`absolute bottom-3 ${side === "left" ? "-left-1.5" : "-right-1.5"} h-3 w-3 rotate-45 ${
        color === "gold" ? "bg-[oklch(0.93_0.07_70)]" : "bg-white"
      }`} />
    </motion.div>
  );
}

function CharacterCard({ src, name, role, side = "left", delay = 0 }:
  { src: string; name: string; role: string; side?: "left" | "right"; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="flex items-center gap-3"
    >
      <div className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-white elegant-shadow">
        <img src={src} alt={name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div>
        <div className="font-medium text-foreground">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 1 - Incoming Call
   ────────────────────────────────────────────────────────────── */
function PanelCall({ isActive }: { isActive: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 h-full items-center">
      {/* Left - Nimal calling */}
      <div className="space-y-6">
        <CharacterCard src={charNimal} name="Nimal Perera" role="Customer · planning a birthday" delay={0.1} />
        <Bubble side="left" who="Nimal" delay={0.4}>
          “Hi, I'd like to check my reservation for tomorrow evening.”
        </Bubble>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="glass-strong rounded-3xl p-5 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="pulse-ring relative h-12 w-12 rounded-full bg-gold/15 flex items-center justify-center">
                <PhoneIncoming className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Incoming call</div>
                <div className="font-medium text-foreground">+94 77 456 7821</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.span key={i}
                  animate={isActive ? { height: [4, 8 + (i % 5) * 3, 4] } : {}}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.06 }}
                  className="w-1 rounded-full bg-gold" style={{ height: 4 }} />
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <motion.button
                animate={isActive ? { boxShadow: ["0 0 0 0 rgba(212,160,86,0.5)", "0 0 0 14px rgba(212,160,86,0)"] } : {}}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="flex-1 rounded-full bg-emerald-500 text-white text-sm py-2 font-medium">
                Answer Call
              </motion.button>
              <button className="flex-1 rounded-full bg-muted text-foreground/70 text-sm py-2">Decline</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right - Sarah answering */}
      <div className="space-y-6">
        <div className="flex justify-end">
          <CharacterCard src={charSarah} name="Sarah" role="Call Center Agent" side="right" delay={0.3} />
        </div>
        <Bubble side="right" who="Sarah · Harbour Court" color="gold" delay={0.7}>
          “Good evening, welcome to Harbour Court Dining. How may I help you today?”
        </Bubble>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass rounded-2xl p-4 text-sm"
        >
          <div className="flex items-center gap-2 text-gold mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs tracking-wider uppercase">CRM Lookup</span>
          </div>
          <div className="space-y-1.5 text-foreground/80">
            <LookupLine text="Matching caller ID +94 77 456 7821…" delay={1.1} />
            <LookupLine text="Searching customer database…" delay={1.6} />
            <LookupLine text="Profile found · Nimal Perera · VIP" delay={2.2} highlight />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LookupLine({ text, delay, highlight }: { text: string; delay: number; highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`flex items-center gap-2 ${highlight ? "text-foreground font-medium" : ""}`}
    >
      <Check className={`h-3.5 w-3.5 ${highlight ? "text-emerald-500" : "text-gold"}`} />
      {text}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 2 - Customer Recognition
   ────────────────────────────────────────────────────────────── */
function PanelVerify({ isActive: _isActive }: { isActive: boolean }) {
  return (
    <div className="grid md:grid-cols-5 gap-8 h-full items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:col-span-3 glass-strong rounded-3xl p-6"
      >
        <div className="flex items-start gap-4 mb-5">
          <div className="relative">
            <img src={charNimal} alt="Nimal" className="h-20 w-20 rounded-2xl object-cover" loading="lazy" />
            <div className="absolute -top-2 -right-2 rounded-full bg-gradient-to-br from-[oklch(0.85_0.13_75)] to-[oklch(0.7_0.14_55)] p-1.5">
              <Crown className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-2xl text-foreground">Nimal Perera</h3>
              <span className="rounded-full bg-gold/15 text-gold text-[10px] px-2 py-0.5 tracking-wider uppercase">VIP</span>
            </div>
            <div className="text-sm text-muted-foreground">Member since Dec 2022 · 14 visits</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="Previous visit" value="Dec 2024 - Anniversary" />
          <Stat label="Favourite table" value="Table 08 · Window" />
          <Stat label="Last rating" value="★★★★★" />
          <Stat label="Spend tier" value="Premium" />
        </div>
      </motion.div>

      <div className="md:col-span-2 space-y-4">
        <CharacterCard src={charSarah} name="Sarah" role="Agent" delay={0.2} />
        <Bubble side="left" who="Sarah" color="gold" delay={0.5}>
          “Welcome back Mr. Nimal. I can see your previous anniversary reservation with us last December.”
        </Bubble>
        <Bubble side="right" who="Nimal" delay={0.9}>
          “Yes! That was a lovely evening. We'd love to come back tomorrow.”
        </Bubble>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/70 border border-border/60 p-3">
      <div className="text-[10px] tracking-widest uppercase text-muted-foreground mb-0.5">{label}</div>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 3 - Reservation Found
   ────────────────────────────────────────────────────────────── */
function PanelReservation({ isActive: _ }: { isActive: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-10 h-full items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl p-7 relative overflow-hidden"
      >
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-[oklch(0.9_0.1_75)] to-transparent" />
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Upcoming reservation</div>
        <h3 className="font-display text-3xl mb-4">Birthday Celebration</h3>
        <div className="space-y-3 text-sm">
          <Row icon={CalendarCheck2} label="Tomorrow · 7:30 PM" />
          <Row icon={UserCheck} label="5 guests" />
          <Row icon={Cake} label="Chocolate Truffle cake" />
          <Row icon={MapPin} label="Window-side seating preferred" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {["Gold theme", "Candles", "Surprise reveal"].map((t, i) => (
            <motion.div key={t}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-lg bg-gold/10 border border-gold/20 text-gold text-[11px] py-2 text-center">
              {t}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="space-y-5">
        <Bubble side="left" who="Sarah" color="gold" delay={0.3}>
          “We have your birthday celebration reservation confirmed for tomorrow at 7:30 PM.”
        </Bubble>
        <Bubble side="right" who="Nimal" delay={0.7}>
          “Yes, that's correct. Thank you!”
        </Bubble>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-white px-4 py-2 text-sm font-medium">
          <Check className="h-4 w-4" /> Reservation confirmed
        </motion.div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label }: { icon: typeof Cake; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-foreground/85">{label}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 4 - Confirmation SMS
   ────────────────────────────────────────────────────────────── */
function PanelConfirm({ isActive }: { isActive: boolean }) {
  const [typed, setTyped] = useState("");
  const FULL = "Dear Mr. Nimal,\nYour reservation at Harbour Court Dining has been confirmed for tomorrow at 7:30 PM.\n\nThank you.";
  useEffect(() => {
    if (!isActive) return;
    setTyped(""); let i = 0;
    const id = setInterval(() => {
      i++; setTyped(FULL.slice(0, i));
      if (i >= FULL.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [isActive]);

  return (
    <div className="grid md:grid-cols-2 gap-10 h-full items-center">
      <div className="space-y-5">
        <h3 className="font-display text-3xl">Automated SMS delivery</h3>
        <p className="text-muted-foreground max-w-md">
          The moment Sarah confirms, the platform composes and dispatches a personalised confirmation to the guest's mobile.
        </p>
        <div className="space-y-2">
          <Step done text="Reservation locked into CRM" />
          <Step done text="SMS template merged with guest data" />
          <Step pulsing text="Delivering to +94 77 456 7821…" />
        </div>
      </div>

      {/* Phone mockup */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-[280px] h-[560px] rounded-[3rem] bg-foreground p-3 elegant-shadow"
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-28 bg-foreground rounded-b-2xl z-10" />
          <div className="h-full w-full rounded-[2.4rem] bg-gradient-to-b from-ivory to-sand overflow-hidden p-5 flex flex-col">
            <div className="text-center text-[10px] text-muted-foreground mb-3">Harbour Court Dining · now</div>
            <div className="rounded-2xl bg-white p-4 elegant-shadow text-sm whitespace-pre-line text-foreground/90 min-h-[160px]">
              {typed}
              <span className="inline-block w-[2px] h-4 bg-gold align-middle ml-0.5 animate-pulse" />
            </div>
            {typed === FULL && (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center justify-end gap-1 text-[10px] text-emerald-600"
              >
                <Check className="h-3 w-3" /> Delivered
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Step({ text, done, pulsing }: { text: string; done?: boolean; pulsing?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${
        done ? "bg-emerald-500 text-white" : "bg-gold/20 text-gold"
      } ${pulsing ? "animate-pulse" : ""}`}>
        {done ? <Check className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
      </span>
      <span className="text-foreground/80">{text}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 5 - One Day Later
   ────────────────────────────────────────────────────────────── */
function PanelReminder({ isActive: _ }: { isActive: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-10 h-full items-center">
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }} whileInView={{ rotateY: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="glass-strong rounded-3xl p-8 text-center"
      >
        <div className="text-[10px] tracking-[0.4em] text-gold uppercase mb-3">24 hours later</div>
        <div className="font-display text-7xl gradient-text">1 Day</div>
        <div className="font-display text-2xl text-foreground/70 mt-1">Reminder triggered automatically</div>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-sm">
          <Spark className="h-4 w-4 text-gold" />
          Calendar event reached
        </div>
      </motion.div>

      <div className="space-y-5">
        <CharacterCard src={charSarah} name="Sarah" role="Reminder call" delay={0.2} />
        <Bubble side="left" who="Sarah" color="gold" delay={0.5}>
          “Good evening Mr. Nimal - this is a friendly reminder for your reservation tomorrow.”
        </Bubble>
        <Bubble side="right" who="Nimal" delay={0.9}>
          “Yes, we'll definitely be there. Thank you for the call!”
        </Bubble>
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
          className="glass rounded-2xl p-4 text-sm"
        >
          <div className="flex items-center gap-2 text-foreground/70">
            <MessageSquare className="h-4 w-4 text-gold" />
            <span>“We look forward to welcoming you tomorrow. - Harbour Court Dining Team.”</span>
          </div>
          <div className="mt-2 text-[10px] text-emerald-600 flex items-center gap-1">
            <Check className="h-3 w-3" /> Reminder SMS delivered
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 6 - Arrival
   ────────────────────────────────────────────────────────────── */
function PanelArrival({ isActive: _ }: { isActive: boolean }) {
  return (
    <div className="grid md:grid-cols-5 gap-8 h-full">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="md:col-span-3 relative rounded-3xl overflow-hidden elegant-shadow"
      >
        <img src={entranceImg} alt="Restaurant entrance" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4 flex items-center gap-3"
        >
          <DoorOpen className="h-6 w-6 text-gold" />
          <div>
            <div className="text-sm font-medium">Nimal & family have arrived</div>
            <div className="text-xs text-muted-foreground">7:28 PM · 2 minutes early</div>
          </div>
        </motion.div>
      </motion.div>

      <div className="md:col-span-2 space-y-4">
        <CharacterCard src={charDaniel} name="Daniel" role="Front Desk Host" delay={0.2} />
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass-strong rounded-2xl p-4"
        >
          <div className="text-[10px] uppercase tracking-widest text-gold mb-2">Front desk lookup</div>
          <div className="flex items-center gap-2 rounded-lg bg-white/70 border px-3 py-2 text-sm">
            <span className="text-muted-foreground">📱</span>
            <span className="font-mono text-foreground">+94 77 456 7821</span>
          </div>
          <div className="mt-3 rounded-xl bg-gold/5 border border-gold/20 p-3 text-sm">
            <div className="font-medium text-foreground mb-1">Birthday Celebration · 5 guests</div>
            <div className="text-xs text-muted-foreground">Cake: Chocolate Truffle · Gold theme · Window side</div>
          </div>
        </motion.div>
        <Bubble side="left" who="Daniel" color="gold" delay={1}>
          “Welcome Mr. Nimal! Your table is ready - Kevin will assist you tonight.”
        </Bubble>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 7 - Table Assignment (interactive floor map)
   ────────────────────────────────────────────────────────────── */
const TABLES = [
  { id: 1, x: 12, y: 22, seats: 2 },
  { id: 2, x: 30, y: 18, seats: 4 },
  { id: 3, x: 50, y: 20, seats: 2 },
  { id: 4, x: 70, y: 22, seats: 6 },
  { id: 5, x: 18, y: 55, seats: 4 },
  { id: 6, x: 38, y: 58, seats: 2 },
  { id: 7, x: 58, y: 55, seats: 4 },
  { id: 8, x: 80, y: 58, seats: 6, window: true, recommended: true },
];

function PanelTable({ isActive: _ }: { isActive: boolean }) {
  const [selected, setSelected] = useState<number | null>(8);
  return (
    <div className="grid md:grid-cols-5 gap-8 h-full items-center">
      <div className="md:col-span-3 relative rounded-3xl glass-strong p-5 h-[420px]">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Floor plan · Harbour Court Main Hall</div>
        <div className="absolute inset-5 mt-7 rounded-2xl bg-gradient-to-br from-[oklch(0.97_0.01_80)] to-[oklch(0.93_0.02_70)] border border-border/60 overflow-hidden">
          {/* window strip */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[oklch(0.85_0.06_220)] to-transparent opacity-50" />
          {TABLES.map((t) => {
            const isSel = selected === t.id;
            return (
              <motion.button
                key={t.id}
                onClick={() => setSelected(t.id)}
                whileHover={{ scale: 1.08 }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-xs font-medium rounded-full transition-all ${
                  isSel
                    ? "bg-gold text-white ring-4 ring-gold/30"
                    : t.recommended
                    ? "bg-white text-gold ring-2 ring-gold/40 animate-pulse"
                    : "bg-white text-foreground/70 ring-1 ring-border"
                }`}
                style={{ left: `${t.x}%`, top: `${t.y}%`, height: 44 + t.seats * 2, width: 44 + t.seats * 2 }}
              >
                T{t.id}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="glass-strong rounded-2xl p-5"
          >
            <div className="text-[10px] uppercase tracking-widest text-gold mb-2">Table assignment</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-white font-display text-xl">
                T{selected}
              </div>
              <div>
                <div className="font-medium text-foreground">
                  {selected === 8 ? "Window-side · 6 seats" : `Table ${selected}`}
                </div>
                <div className="text-xs text-emerald-600">Available → Reserved</div>
              </div>
            </div>
            <div className="rounded-xl bg-white/80 p-3 flex items-center gap-3">
              <img src={charKevin} className="h-10 w-10 rounded-full object-cover" loading="lazy" alt="Kevin" />
              <div>
                <div className="text-sm font-medium">Waiter Kevin assigned</div>
                <div className="text-xs text-muted-foreground">Senior · 4.9★ guest rating</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <Bubble side="left" who="Daniel" color="gold" delay={0.2}>
          “Right this way - Kevin will look after you all evening.”
        </Bubble>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 8 - Celebration
   ────────────────────────────────────────────────────────────── */
function PanelCelebration({ isActive }: { isActive: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 h-full items-center">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl overflow-hidden elegant-shadow h-[420px]"
      >
        <img src={celebrationImg} alt="Celebration cake" className="h-full w-full object-cover" loading="lazy" />
        {isActive && <ConfettiOverlay />}
        <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-2xl p-3 flex items-center gap-3">
          <Cake className="h-5 w-5 text-gold" />
          <div className="text-xs">
            <div className="font-medium">Chocolate Truffle · Gold theme</div>
            <div className="text-muted-foreground">Ready for reveal at 8:15 PM</div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <CharacterCard src={charKevin} name="Kevin" role="Waiter" delay={0.2} />
        <Bubble side="left" who="Kevin" color="gold" delay={0.5}>
          “We have prepared your birthday arrangement exactly as requested.”
        </Bubble>
        <div className="grid grid-cols-2 gap-3">
          {[
            { t: "Cake reveal", v: "8:15 PM" },
            { t: "Lighting", v: "Dim · candles" },
            { t: "Music cue", v: "Soft jazz" },
            { t: "Surprise", v: "Photo board" },
          ].map((x, i) => (
            <motion.div key={x.t}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1 }}
              className="glass rounded-2xl p-3"
            >
              <div className="text-[10px] tracking-widest uppercase text-gold">{x.t}</div>
              <div className="text-sm font-medium mt-1">{x.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConfettiOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -20, x: Math.random() * 400, rotate: 0, opacity: 0 }}
          animate={{ y: 460, rotate: 360, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
          className="absolute h-2 w-2 rounded-sm"
          style={{ left: `${Math.random() * 100}%`, background: ["#D4A056", "#F0D198", "#E8B872", "#fff"][i % 4] }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 9 - Feedback
   ────────────────────────────────────────────────────────────── */
function PanelFeedback({ isActive: _ }: { isActive: boolean }) {
  const [rating, setRating] = useState(5);
  return (
    <div className="grid md:grid-cols-2 gap-10 h-full items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        className="relative rounded-3xl overflow-hidden h-[380px] elegant-shadow"
      >
        <img src={romanticImg} alt="Dining experience" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 space-y-3">
          <Bubble side="left" who="Daniel" color="gold">
            “How was your experience today, Mr. Nimal?”
          </Bubble>
          <Bubble side="right" who="Nimal">
            “Everything was excellent. The birthday setup was amazing!”
          </Bubble>
        </div>
      </motion.div>

      <div className="space-y-5">
        <div className="text-[10px] tracking-[0.3em] uppercase text-gold">Capture feedback</div>
        <h3 className="font-display text-3xl">Rate your evening at the front desk</h3>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.button key={n}
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
              onClick={() => setRating(n)}
              className={`text-4xl transition-all ${n <= rating ? "text-gold" : "text-muted-foreground/40"}`}
            >
              ★
            </motion.button>
          ))}
        </div>
        <motion.div
          key={rating} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-4"
        >
          <div className="text-sm font-medium text-foreground">
            {rating === 5 ? "Outstanding evening" : rating >= 3 ? "Memorable evening" : "Thanks - we'll do better"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Sentiment captured · saved to guest profile</div>
        </motion.div>
        <div className="flex items-center gap-2 text-xs text-emerald-600">
          <Check className="h-3.5 w-3.5" /> Feedback recorded · CRM updated
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   SCENE 10 - Thank You
   ────────────────────────────────────────────────────────────── */
function PanelThanks({ isActive: _ }: { isActive: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-12 h-full items-center">
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-[280px] h-[520px] rounded-[3rem] bg-foreground p-3 elegant-shadow"
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-28 bg-foreground rounded-b-2xl z-10" />
          <div className="h-full w-full rounded-[2.4rem] bg-gradient-to-b from-ivory to-sand p-5 flex flex-col">
            <div className="text-center text-[10px] text-muted-foreground mb-3">Harbour Court Dining · now</div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl bg-white p-4 elegant-shadow text-sm text-foreground/90 space-y-2"
            >
              <div>Thank you for celebrating with Harbour Court Dining.</div>
              <div>We hope to see you again soon.</div>
              <div className="text-gold text-xs">- Harbour Court Dining Team</div>
              <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-600">
                <Check className="h-3 w-3" /> Delivered
              </div>
            </motion.div>
            <div className="flex-1" />
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              className="text-center text-xs text-muted-foreground"
            >
              Journey complete · 10 / 10
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Loop closed</div>
          <h3 className="font-display text-4xl md:text-5xl leading-tight">
            Creating personalised dining experiences through smart automation.
          </h3>
        </motion.div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { v: "10", l: "Touchpoints" },
            { v: "0", l: "Manual SMS" },
            { v: "5★", l: "Guest rating" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-4 text-center">
              <div className="font-display text-3xl gradient-text">{s.v}</div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
        <motion.a
          href="#top"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm hover:opacity-90 cursor-pointer"
        >
          <Utensils className="h-4 w-4" /> Replay the journey
        </motion.a>
      </div>
    </div>
  );
}
