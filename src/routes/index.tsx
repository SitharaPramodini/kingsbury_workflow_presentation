import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { StoryMode } from "@/components/StoryMode";
import { LogoIntro } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harbour Court - Smart Reservation & Customer Experience" },
      { name: "description", content: "A cinematic interactive showcase of an end-to-end restaurant reservation and customer experience platform." },
      { property: "og:title", content: "Harbour Court - Smart Reservation & CXM" },
      { property: "og:description", content: "From incoming call to thank-you SMS - a complete guest journey, live." },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  const enterStory = () => {
    const el = document.getElementById("story");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main id="top" className="relative">
      {!introDone && <LogoIntro onDone={() => setIntroDone(true)} />}
      <Hero onEnter={enterStory} />
      <StoryMode />
    </main>
  );
}
