import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  PhoneIncoming, UserCheck, CalendarSearch, CheckCircle2,
  BellRing, DoorOpen, Armchair, PartyPopper, Star, Send,
} from "lucide-react";

const STEPS = [
  { icon: PhoneIncoming, title: "Incoming Call", desc: "Caller ID matched against CRM in real time" },
  { icon: UserCheck, title: "Customer Verification", desc: "VIP status, history & preferences surface instantly" },
  { icon: CalendarSearch, title: "Reservation Detection", desc: "Branching logic - existing or new booking" },
  { icon: CheckCircle2, title: "Booking Confirmation", desc: "Table, time and special notes locked in" },
  { icon: BellRing, title: "Reminder Call & SMS", desc: "Automated 24-hour ahead confirmation" },
  { icon: DoorOpen, title: "Customer Arrival", desc: "Front desk pulls full guest profile on arrival" },
  { icon: Armchair, title: "Table & Waiter Assignment", desc: "Interactive floor plan with smart routing" },
  { icon: PartyPopper, title: "Celebration Handling", desc: "Cake, decor & surprise orchestration" },
  { icon: Star, title: "Customer Feedback", desc: "Frictionless rating & sentiment capture" },
  { icon: Send, title: "Thank You SMS", desc: "Personalised follow-up - closing the loop" },
];

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="workflow" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block text-xs tracking-[0.3em] text-gold uppercase mb-4">The Journey</div>
          <h2 className="font-display text-5xl md:text-6xl mb-4">
            Ten moments. <span className="gradient-text italic">One seamless story.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From the first ring to the closing message, every touchpoint is choreographed.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* spine */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <motion.div
            style={{ height: lineH }}
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-gold via-gold to-transparent shadow-[0_0_20px_var(--gold)]"
          />

          <div className="space-y-16">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="relative h-14 w-14 rounded-full glass-strong flex items-center justify-center ring-gold">
                      <Icon className="h-5 w-5 text-gold" />
                      <div className="absolute -inset-1 rounded-full bg-gold/10 blur-md -z-10" />
                    </div>
                  </div>

                  <div className="ml-24 md:ml-0 md:w-[44%]">
                    <div className={`glass rounded-2xl p-6 hover:bg-white/[0.04] transition ${left ? "md:mr-12" : "md:ml-12"}`}>
                      <div className="text-xs text-gold tracking-widest mb-2">STEP {String(i + 1).padStart(2, "0")}</div>
                      <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-[44%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
