import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Phone, PhoneOff, User, Star, Crown, MessageSquare, CheckCheck,
  Calendar, Clock, Users, Cake, MapPin, Send,
} from "lucide-react";
import celebrationImg from "@/assets/celebration.jpg";
import entranceImg from "@/assets/entrance.jpg";
import romanticImg from "@/assets/romantic.jpg";

/* ─────────── SCENE 1 - INCOMING CALL ─────────── */
export function SceneCall() {
  const [answered, setAnswered] = useState(false);
  return (
    <SceneWrap id="call" tag="Scene 01" title="The Call" subtitle="A familiar number lights up the switchboard.">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Softphone */}
        <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gold/10 blur-3xl" />
          <div className="text-xs text-muted-foreground tracking-widest mb-6">SOFTPHONE • LINE 1</div>
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className={`pulse-ring relative h-28 w-28 rounded-full glass-strong flex items-center justify-center ${answered ? "opacity-50" : ""}`}>
                <Phone className="h-10 w-10 text-gold" />
              </div>
            </div>
            <div className="font-display text-3xl mb-1">+1 (555) 247-9981</div>
            <div className="text-sm text-muted-foreground mb-8">{answered ? "Connected • 00:12" : "Incoming call…"}</div>
            <div className="flex gap-4">
              <button
                onClick={() => setAnswered(true)}
                disabled={answered}
                className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 text-sm font-medium shadow-[0_0_40px_-5px_oklch(0.7_0.2_150/0.6)] disabled:opacity-50"
              >
                <Phone className="inline h-4 w-4 mr-2" /> Answer Call
              </button>
              <button
                onClick={() => setAnswered(false)}
                className="rounded-full bg-destructive/80 px-6 py-3 text-sm font-medium"
              >
                <PhoneOff className="inline h-4 w-4 mr-2" /> End
              </button>
            </div>
            {answered && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mt-6 flex items-center gap-1"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: [3, 18 + (i % 5) * 5, 3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.05 }}
                    className="w-1 rounded-full bg-gold"
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* CRM Search */}
        <CrmSearch answered={answered} />
      </div>
    </SceneWrap>
  );
}

function CrmSearch({ answered }: { answered: boolean }) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-muted-foreground tracking-widest">CRM • LIVE LOOKUP</div>
        <div className="text-xs text-gold flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Scanning
        </div>
      </div>
      <div className="space-y-2">
        {["Searching by phone number…", "Matched 1 record in 142 ms", "Loading reservation history…", "Profile ready"].map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 }}
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground"
          >
            <span className="text-gold">›</span> {line}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-6 glass-strong rounded-2xl p-5"
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-gold to-ember flex items-center justify-center font-display text-xl text-primary-foreground">
                EL
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-xl">Étienne Laurent</span>
                  <Crown className="h-4 w-4 text-gold" />
                </div>
                <div className="text-xs text-muted-foreground">VIP • Member since 2019 • 47 visits</div>
                <div className="mt-2 flex gap-3 text-xs">
                  <span className="rounded-full glass px-2.5 py-1">⭐ 4.9 avg rating</span>
                  <span className="rounded-full glass px-2.5 py-1">Allergy: shellfish</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────── SCENE 2 - CUSTOMER PROFILE ─────────── */
export function SceneProfile() {
  return (
    <SceneWrap tag="Scene 02" title="Recognising the Guest" subtitle="Six years of preferences, surfaced in one second.">
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-strong rounded-3xl p-7">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gold to-ember flex items-center justify-center font-display text-2xl text-primary-foreground">EL</div>
            <div>
              <div className="font-display text-2xl">Étienne Laurent</div>
              <div className="text-xs text-gold flex items-center gap-1"><Crown className="h-3 w-3" /> Platinum VIP</div>
            </div>
          </div>
          <Stat label="Lifetime visits" value="47" />
          <Stat label="Average spend" value="€280" />
          <Stat label="Avg. rating given" value="4.9 ★" />
          <Stat label="Last visit" value="14 days ago" />
          <div className="mt-6 flex gap-2">
            <button className="flex-1 rounded-full bg-gradient-to-r from-gold to-ember px-4 py-2.5 text-xs font-medium text-primary-foreground">View Previous Booking</button>
            <button className="flex-1 rounded-full glass px-4 py-2.5 text-xs">View Feedback</button>
          </div>
        </div>

        <div className="lg:col-span-3 glass rounded-3xl p-7">
          <div className="text-xs text-muted-foreground tracking-widest mb-4">RECENT FEEDBACK</div>
          <div className="space-y-3">
            {[
              { d: "Oct 12", n: "Sole meunière was sublime. Marco's service - impeccable.", r: 5 },
              { d: "Sep 02", n: "The anniversary surprise made my wife cry. Thank you.", r: 5 },
              { d: "Jul 18", n: "Table 14 had a small draft. Otherwise flawless.", r: 4 },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-strong rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex">{Array.from({ length: f.r }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-gold text-gold" />)}</div>
                  <span className="text-xs text-muted-foreground">{f.d}</span>
                </div>
                <p className="text-sm text-muted-foreground italic">"{f.n}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SceneWrap>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-2.5 border-b border-border/40 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-display text-lg text-gold">{value}</span>
    </div>
  );
}

/* ─────────── SCENE 3 - BOOKING DETECTION ─────────── */
export function SceneBooking() {
  return (
    <SceneWrap tag="Scene 03" title="The Reservation" subtitle="Tonight. 8 PM. Anniversary. Cake ordered.">
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="glass-strong rounded-3xl p-7 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 px-3 py-1 m-4 rounded-full bg-gold text-primary-foreground text-xs font-medium">CONFIRMED</div>
          <div className="text-xs text-muted-foreground tracking-widest mb-4">UPCOMING RESERVATION</div>
          <div className="font-display text-3xl mb-6">Anniversary Dinner</div>
          <div className="grid grid-cols-2 gap-4">
            <Info icon={Calendar} label="Date" value="Tonight" />
            <Info icon={Clock} label="Time" value="8:00 PM" />
            <Info icon={Users} label="Guests" value="2 adults" />
            <Info icon={MapPin} label="Table" value="14 - Window" />
            <Info icon={Cake} label="Cake" value="Tiered, gold leaf" />
            <Info icon={Star} label="Vibe" value="Romantic" />
          </div>
          <div className="mt-5 glass rounded-xl p-3 text-sm text-muted-foreground italic">
            Note: rose petals on table, champagne at 8:30.
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {[celebrationImg, romanticImg].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-3xl overflow-hidden ring-gold col-span-2"
            >
              <img src={src} alt="Setup preview" className="w-full h-48 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs text-gold tracking-widest">
                {i === 0 ? "CAKE DESIGN - APPROVED" : "TABLE SETUP - APPROVED"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneWrap>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="font-medium text-sm">{value}</div>
    </div>
  );
}

/* ─────────── SCENE 4+5 - SMS / REMINDER ─────────── */
export function SceneSms() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 2200);
    return () => clearInterval(id);
  }, []);
  const msg = "Your table for 2 is confirmed for tonight at 8 PM. The anniversary cake is ready. - Maître";
  const typed = msg.slice(0, Math.min(msg.length, Math.floor((step / 3) * msg.length) + (step >= 2 ? msg.length : 0)));

  return (
    <SceneWrap tag="Scene 04 & 05" title="Confirmation & Reminder" subtitle="Frictionless SMS, before the guest even thinks of it.">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* phone mockup */}
        <div className="flex justify-center">
          <div className="relative w-[280px] h-[560px] rounded-[44px] glass-strong p-3 ring-gold">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-28 rounded-full bg-background z-10" />
            <div className="h-full w-full rounded-[36px] bg-gradient-to-b from-[oklch(0.18_0.02_60)] to-[oklch(0.12_0.01_60)] overflow-hidden p-4 pt-12">
              <div className="text-center text-xs text-muted-foreground mb-4">Today • 6:42 PM</div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
                <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs">M</div>
                <div>
                  <div className="text-sm font-medium">Maître</div>
                  <div className="text-[10px] text-muted-foreground">SMS</div>
                </div>
              </div>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-gold/10 border border-gold/30 rounded-2xl rounded-bl-sm p-3 text-sm min-h-[120px]"
              >
                {typed}<span className="caret" />
              </motion.div>
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center gap-1 mt-2 text-[10px] text-gold justify-end"
                >
                  <CheckCheck className="h-3 w-3" /> Delivered
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* timeline */}
        <div className="space-y-4">
          {[
            { icon: MessageSquare, t: "Booking confirmation", d: "Sent at 14:12 - delivered in 4s" },
            { icon: Clock, t: "24h reminder", d: "Auto-scheduled for 18:00 today" },
            { icon: Phone, t: "Reminder call", d: "Optional - fires only for VIPs" },
            { icon: Send, t: "Day-of nudge", d: "Touchless. Sent two hours before." },
          ].map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center"><it.icon className="h-4 w-4 text-gold" /></div>
              <div>
                <div className="font-medium text-sm">{it.t}</div>
                <div className="text-xs text-muted-foreground">{it.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneWrap>
  );
}

/* ─────────── SCENE 6 - ARRIVAL ─────────── */
export function SceneArrival() {
  return (
    <SceneWrap tag="Scene 06" title="The Arrival" subtitle="They walk in. We already know everything.">
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 relative rounded-3xl overflow-hidden ring-gold">
          <img src={entranceImg} alt="Restaurant entrance" loading="lazy" className="w-full h-[420px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4"
          >
            <div className="text-xs text-gold tracking-widest mb-1">FRONT DESK - LIVE</div>
            <div className="text-sm">Étienne &amp; Marie Laurent have arrived. Table 14 is ready.</div>
          </motion.div>
        </div>
        <div className="lg:col-span-2 glass-strong rounded-3xl p-6 space-y-3">
          <Badge>VIP Platinum</Badge>
          <Badge>🥂 Anniversary</Badge>
          <Badge>Party of 2</Badge>
          <div className="pt-2 text-xs text-muted-foreground space-y-1">
            <div>• Wife allergic to shellfish</div>
            <div>• Prefers still water - sparkling on request</div>
            <div>• Cake reveal at 21:00</div>
            <div>• Bring petits fours with the bill</div>
          </div>
          <button className="w-full mt-4 rounded-full bg-gradient-to-r from-gold to-ember py-3 text-sm font-medium text-primary-foreground">
            Seat Guests →
          </button>
        </div>
      </div>
    </SceneWrap>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <div className="rounded-full glass px-3 py-1.5 text-xs inline-block mr-2">{children}</div>;
}

/* ─────────── SCENE 7 - FLOOR MAP ─────────── */
const TABLES = [
  { id: 1, x: 12, y: 18, seats: 2, status: "available" },
  { id: 2, x: 30, y: 14, seats: 4, status: "occupied" },
  { id: 3, x: 48, y: 16, seats: 4, status: "available" },
  { id: 4, x: 68, y: 14, seats: 6, status: "occupied" },
  { id: 5, x: 86, y: 22, seats: 2, status: "available" },
  { id: 6, x: 18, y: 50, seats: 4, status: "available" },
  { id: 7, x: 42, y: 48, seats: 6, status: "occupied" },
  { id: 8, x: 64, y: 52, seats: 2, status: "available" },
  { id: 9, x: 84, y: 54, seats: 4, status: "available" },
  { id: 10, x: 22, y: 80, seats: 4, status: "occupied" },
  { id: 14, x: 56, y: 78, seats: 2, status: "vip" },
  { id: 12, x: 80, y: 82, seats: 4, status: "available" },
] as const;

export function SceneFloor() {
  const [sel, setSel] = useState<number | null>(14);
  const selected = TABLES.find((t) => t.id === sel);
  return (
    <SceneWrap tag="Scene 07" title="Floor & Service" subtitle="Tap a table. Assign a waiter. Done.">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-strong rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-muted-foreground tracking-widest">MAIN HALL</div>
            <div className="flex gap-3 text-[10px]">
              <Legend color="oklch(0.7 0.18 150)" label="Available" />
              <Legend color="oklch(0.6 0.18 25)" label="Occupied" />
              <Legend color="var(--gold)" label="VIP" />
            </div>
          </div>
          <div className="relative aspect-[16/10] rounded-2xl bg-gradient-to-br from-[oklch(0.18_0.015_60)] to-[oklch(0.13_0.01_60)] overflow-hidden border border-border/30">
            {/* grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(oklch(1 0 0 / 0.03) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.03) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }} />
            {TABLES.map((t) => {
              const color =
                t.status === "vip" ? "var(--gold)" : t.status === "occupied" ? "oklch(0.6 0.18 25)" : "oklch(0.7 0.18 150)";
              const isSel = sel === t.id;
              return (
                <motion.button
                  key={t.id}
                  onClick={() => setSel(t.id)}
                  whileHover={{ scale: 1.1 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl flex items-center justify-center text-xs font-mono"
                  style={{
                    left: `${t.x}%`, top: `${t.y}%`,
                    width: t.seats >= 6 ? 60 : t.seats >= 4 ? 50 : 40,
                    height: t.seats >= 6 ? 60 : t.seats >= 4 ? 50 : 40,
                    backgroundColor: `color-mix(in oklab, ${color} 20%, transparent)`,
                    border: `1.5px solid ${color}`,
                    boxShadow: isSel ? `0 0 32px ${color}` : `0 0 12px color-mix(in oklab, ${color} 40%, transparent)`,
                  }}
                >
                  {t.id}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="text-xs text-muted-foreground tracking-widest mb-4">
            {selected ? `TABLE ${selected.id}` : "SELECT A TABLE"}
          </div>
          {selected && (
            <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="font-display text-3xl mb-2 capitalize">{selected.status}</div>
              <div className="text-sm text-muted-foreground mb-6">Seats: {selected.seats}</div>

              <div className="text-xs text-muted-foreground tracking-widest mb-3">ASSIGN WAITER</div>
              <div className="space-y-2">
                {[
                  { name: "Marco D.", rating: 4.9, fit: "Best for VIP" },
                  { name: "Léa B.", rating: 4.8, fit: "Multilingual" },
                  { name: "Yuki T.", rating: 4.7, fit: "Wine expert" },
                ].map((w, i) => (
                  <motion.button
                    key={w.name}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="w-full glass rounded-xl p-3 flex items-center gap-3 hover:bg-white/[0.05] transition"
                  >
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold to-ember flex items-center justify-center text-xs font-medium text-primary-foreground">
                      {w.name[0]}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{w.name}</div>
                      <div className="text-[10px] text-muted-foreground">{w.fit}</div>
                    </div>
                    <div className="text-xs text-gold">★ {w.rating}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </SceneWrap>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} /> {label}
    </span>
  );
}

/* ─────────── SCENE 8 - CELEBRATION ─────────── */
export function SceneCelebration() {
  return (
    <SceneWrap tag="Scene 08" title="The Moment" subtitle="Cake. Petals. Lights dim. Everyone remembers.">
      <div className="grid lg:grid-cols-2 gap-6 items-center">
        <div className="relative rounded-3xl overflow-hidden ring-gold">
          <img src={celebrationImg} alt="Celebration cake" loading="lazy" className="w-full h-[520px] object-cover" />
          <ConfettiOverlay />
        </div>
        <div className="space-y-4">
          {[
            { t: "Cake Design", d: "Tiered • dark fondant • gold leaf" },
            { t: "Decoration", d: "Rose petals, candles, soft jazz" },
            { t: "Package", d: "Signature Anniversary" },
            { t: "Surprise", d: "Personal note from chef" },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong rounded-2xl p-5 flex items-center justify-between"
            >
              <div>
                <div className="text-xs text-gold tracking-widest mb-1">{c.t.toUpperCase()}</div>
                <div className="text-sm">{c.d}</div>
              </div>
              <Cake className="h-5 w-5 text-gold" />
            </motion.div>
          ))}
        </div>
      </div>
    </SceneWrap>
  );
}

function ConfettiOverlay() {
  const bits = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bits.map((i) => (
        <motion.span
          key={i}
          initial={{ y: -20, x: `${Math.random() * 100}%`, opacity: 0, rotate: 0 }}
          animate={{ y: "120%", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
          className="absolute w-2 h-3 rounded-sm"
          style={{ background: i % 2 ? "var(--gold)" : "var(--ember)" }}
        />
      ))}
    </div>
  );
}

/* ─────────── SCENE 9 - FEEDBACK ─────────── */
export function SceneFeedback() {
  const [r, setR] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <SceneWrap id="feedback" tag="Scene 09" title="The Feedback" subtitle="One tap. Honest signal. Closed loop.">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-strong rounded-3xl p-8">
          <div className="text-xs text-gold tracking-widest mb-2">CHECKOUT - TABLE 14</div>
          <h3 className="font-display text-3xl mb-6">How was tonight?</h3>
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
                onClick={() => setR(n)}
                className="transition-transform hover:scale-110"
              >
                <Star className={`h-12 w-12 transition-colors ${ (hover || r) >= n ? "fill-gold text-gold" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <textarea
            placeholder="Tell us in a few words…"
            className="w-full glass rounded-xl p-3 text-sm bg-transparent outline-none focus:ring-1 focus:ring-gold/40 min-h-[80px] resize-none"
          />
          <button className="mt-4 w-full rounded-full bg-gradient-to-r from-gold to-ember py-3 text-sm font-medium text-primary-foreground">
            Submit
          </button>
          <AnimatePresence>
            {r > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="mt-4 text-center text-sm text-gold"
              >
                Thank you - your feedback is in the kitchen already. 🎉
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* satisfaction chart */}
        <div className="glass rounded-3xl p-7">
          <div className="text-xs text-muted-foreground tracking-widest mb-4">SATISFACTION - LAST 7 DAYS</div>
          <div className="flex items-end gap-3 h-56">
            {[4.6, 4.7, 4.8, 4.6, 4.9, 4.8, 4.95].map((v, i) => {
              const h = ((v - 4) / 1) * 100;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                  className="flex-1 rounded-t-xl bg-gradient-to-t from-ember/60 to-gold relative"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gold">{v}</div>
                </motion.div>
              );
            })}
          </div>
          <div className="grid grid-cols-7 gap-3 mt-2 text-[10px] text-muted-foreground text-center">
            {["M","T","W","T","F","S","S"].map((d, i) => <div key={i}>{d}</div>)}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <MiniStat label="NPS" value="+72" />
            <MiniStat label="5★ rate" value="86%" />
            <MiniStat label="Repeat" value="3.4x" />
          </div>
        </div>
      </div>
    </SceneWrap>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-strong rounded-xl p-3 text-center">
      <div className="font-display text-xl text-gold">{value}</div>
      <div className="text-[10px] text-muted-foreground tracking-widest">{label}</div>
    </div>
  );
}

/* ─────────── SCENE 10 - THANK YOU ─────────── */
export function SceneThankYou() {
  return (
    <section className="relative py-32 px-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="mx-auto max-w-3xl"
      >
        <div className="text-xs text-gold tracking-[0.3em] mb-6">SCENE 10</div>
        <h2 className="font-display text-5xl md:text-7xl mb-8">
          Customer Experience
          <br />
          <span className="gradient-text italic">Successfully Completed</span>
        </h2>
        <div className="mx-auto max-w-md glass-strong rounded-2xl p-5 text-left">
          <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5" /> SMS • now
          </div>
          <p className="text-sm">
            Thank you for tonight, Étienne. Wishing you and Marie another wonderful year.
            We hope to welcome you back soon. <span className="text-gold">- Maître</span>
          </p>
          <div className="flex items-center gap-1 mt-2 text-[10px] text-gold justify-end">
            <CheckCheck className="h-3 w-3" /> Delivered
          </div>
        </div>
        <div className="mt-12 text-xs text-muted-foreground tracking-[0.3em]">
          MAÎTRE • SMART RESERVATION & CUSTOMER EXPERIENCE MANAGEMENT
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────── WRAPPER ─────────── */
function SceneWrap({
  id, tag, title, subtitle, children,
}: { id?: string; tag: string; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <div className="text-xs text-gold tracking-[0.3em] mb-3">{tag}</div>
          <h2 className="font-display text-4xl md:text-5xl mb-3">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
