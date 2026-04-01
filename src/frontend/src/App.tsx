import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera,
  Clapperboard,
  ExternalLink,
  Film,
  Instagram,
  Menu,
  Play,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitContactMessage } from "./hooks/useQueries";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ADS_IDS = [
  "keJrPmufC6c",
  "hmBBwC7WPh4",
  "b-BlbkTeNx8",
  "t98h0qRXnWo",
  "truWSRKax80",
  "Bo0H43HshaY",
  "j4a6QnKh6dY",
  "etQwVlshdkA",
  "xyIiFMilF5k",
  "V6-lcC5TWuA",
  "IOsSS-mBofc",
  "-UDZRSmTm7Y",
  "Tytc-PKc4cQ",
  "-Pc15-Bwcu0",
  "yPcoyQFqDdk",
  "4K4wElOJjVI",
  "Sz9-wca0TX4",
  "zSthlpyYNC8",
  "kIBfqRnZ6gY",
  "4Cdalzrda6w",
  "GS0upSBjnkY",
  "TV08Jw_3cbg",
  "VF4xjhNzTSU",
  "wyhAiFdTQ-o",
  "LS3pgP336PA",
  "sVSotWVjFGk",
  "62ZpbvyvtK0",
  "qA0Ctqd6xdA",
  "kFjVI91i2Ag",
  "XGAhv-e_dAM",
  "gPVaxhckUuM",
  "CSVV4G9KfN8",
  "e2dcHBdGt1A",
  "2wetua82T5c",
  "rw-Qn5f6XI4",
  "bg6d9GTNZbU",
  "i3VjkihrlWQ",
  "HPec_8KyKuo",
  "zTARdN_ZVSk",
  "YWI6CbCdyf4",
  "tDJ45PKRBF0",
  "N0f9zBFJ62I",
  "ZJq7rPGpeJ4",
  "AXsBh_teFYs",
  "zZ0L_HCKkjM",
  "bVi4B2tT3tU",
  "BMvx9yui5xg",
];

const SHORT_FILMS_IDS = ["V3C8q-Tycno"];
const CSR_IDS = ["k7VFA7iLRHk", "rz5nSuQ5HP8", "pWyiVlAIno4"];
const PODCASTS_IDS = [
  "l8WaoJ1MwV8",
  "fHwWaRfaN2s",
  "nVwMVI4YUok",
  "qhp3GD8zK_g",
  "bHOAushTjec",
  "bcoV1IyoGqs",
  "-dp2v3wRzvE",
  "FKQd4CnqeI4",
  "IsOFO31ORLE",
  "nVkT1VgtirY",
];

const GEAR = [
  {
    icon: <Camera className="w-6 h-6" />,
    name: "Arri Alexa",
    desc: "Cinema-grade digital large format — the gold standard for narrative filmmaking.",
  },
  {
    icon: <Camera className="w-6 h-6" />,
    name: "Sony Venice",
    desc: "Full-frame cinematic sensor delivering stunning latitude and skin tones.",
  },
  {
    icon: <Camera className="w-6 h-6" />,
    name: "Red Epic",
    desc: "High-resolution digital acquisition for demanding commercial and feature work.",
  },
  {
    icon: <Clapperboard className="w-6 h-6" />,
    name: "DJI Ronin 4D",
    desc: "Integrated gimbal cinema system — fluid motion and unmatched stabilisation.",
  },
  {
    icon: <Film className="w-6 h-6" />,
    name: "35mm Film",
    desc: "Analog celluloid — grain, texture, and a timeless quality no digital replicates.",
  },
  {
    icon: <Clapperboard className="w-6 h-6" />,
    name: "Lighting & Grip",
    desc: "Creative illumination craft — shaping light to sculpt emotion and atmosphere.",
  },
];

// ─── Video Thumbnail Card ──────────────────────────────────────────────────────

function VideoCard({
  id,
  index,
  onPlay,
}: { id: string; index: number; onPlay: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const thumb = imgError
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

  return (
    <motion.div
      data-ocid={`work.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="relative group cursor-pointer overflow-hidden rounded-sm bg-card border border-border"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(id)}
    >
      <div className="aspect-video relative">
        <img
          src={thumb}
          alt="Video thumbnail"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-background/40 transition-opacity duration-300"
          style={{ opacity: hovered ? 0.2 : 0.45 }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.8)",
          }}
        >
          <div className="w-14 h-14 rounded-full bg-amber/90 flex items-center justify-center shadow-amber">
            <Play className="w-5 h-5 text-background fill-background ml-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Video Modal ───────────────────────────────────────────────────────────────

function VideoModal({
  videoId,
  onClose,
}: { videoId: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        data-ocid="work.modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-5xl aspect-video rounded-sm overflow-hidden border border-border"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video player"
          />
          <button
            data-ocid="work.close_button"
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:text-amber hover:border-amber transition-colors"
            type="button"
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work" },
    { label: "BIO", href: "#bio" },
    { label: "GEAR", href: "#gear" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      style={{ height: "68px" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#hero"
          className="flex flex-col leading-none"
          data-ocid="nav.link"
        >
          <span className="font-display text-xl font-semibold tracking-tight text-ivory">
            TUSHAR SARMALKAR
          </span>
          <span className="text-amber eyebrow mt-0.5">CINEMATOGRAPHER</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-ocid={`nav.${l.label.toLowerCase()}.link`}
              className="eyebrow text-warm-gray hover:text-ivory transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.imdb.com/name/nm13423930/"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.imdb.link"
            className="eyebrow px-3 py-1.5 border border-amber text-amber hover:bg-amber hover:text-background transition-all duration-200"
          >
            IMDB
          </a>
          <a
            href="https://www.instagram.com/iam_tushar_sarmalkar/"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="nav.instagram.link"
            className="text-warm-gray hover:text-amber transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram className="w-4.5 h-4.5" />
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-warm-gray hover:text-ivory transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border"
          >
            <nav className="flex flex-col px-6 py-4 gap-5">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="eyebrow text-warm-gray hover:text-ivory"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <a
                  href="https://www.imdb.com/name/nm13423930/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow px-3 py-1.5 border border-amber text-amber"
                >
                  IMDB
                </a>
                <a
                  href="https://www.instagram.com/iam_tushar_sarmalkar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-gray hover:text-amber"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen px-6 overflow-hidden"
    >
      {/* Subtle horizontal lines — cinematic widescreen feel */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-0 right-0 h-[8vh] bg-background/80" />
        <div className="absolute bottom-0 left-0 right-0 h-[8vh] bg-background/80" />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.70 0.115 55 / 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto w-full pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="eyebrow mb-6"
          >
            Mumbai &nbsp;·&nbsp; FTII &nbsp;·&nbsp; Visual Storyteller
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-ivory leading-[0.95] mb-6"
          >
            Tushar
            <br />
            <span className="text-amber">Sarmalkar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="font-display text-xl md:text-2xl text-warm-gray italic mb-3"
          >
            Cinematographer &amp; Visual Storyteller
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.9 }}
            className="font-display text-3xl md:text-4xl text-dim-gray italic mb-10 tracking-wide"
          >
            Light.&ensp;Shadow.&ensp;Story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://www.instagram.com/iam_tushar_sarmalkar/"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.instagram.link"
              className="inline-flex items-center gap-2 px-6 py-3 border border-amber text-amber eyebrow hover:bg-amber hover:text-background transition-all duration-300 group"
            >
              <Instagram className="w-3.5 h-3.5" />
              @IAM_TUSHAR_SARMALKAR
            </a>
            <a
              href="https://www.imdb.com/name/nm13423930/"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.imdb.link"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-warm-gray eyebrow hover:border-amber hover:text-amber transition-all duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              VIEW ON IMDB
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="eyebrow text-dim-gray">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.8,
              ease: "easeInOut",
            }}
            className="w-px h-10 bg-gradient-to-b from-amber/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Bio Section ───────────────────────────────────────────────────────────────

function BioSection() {
  return (
    <section id="bio" className="section-pad px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow mb-4">BIO</p>
            <h2 className="font-display text-4xl md:text-5xl text-ivory font-bold uppercase leading-tight tracking-tight mb-8">
              The Artist
              <br />
              &amp; The Vision
            </h2>
            <div className="space-y-5 text-warm-gray leading-relaxed">
              <p>
                Born and raised in the vibrant city of Mumbai, I have always
                been captivated by the magic of a script seen through the lens.
                After honing my skills at the Film and Television Institute of
                India (FTII), I dedicate myself to crafting visually stunning
                films that resonate with audiences.
              </p>
              <p>
                I draw inspiration from the cinematic styles of Satyajit Ray,
                Wong Kar-wai, and Wes Anderson — each a master of mood, light,
                and human truth. My experience spans 35mm film to advanced
                digital systems — from the Arri Alexa and Sony Venice to the Red
                Epic and Ronin 4D.
              </p>
              <p>
                From the bustling sets of Bollywood to the serene landscapes of
                international shoots, I capture moments that linger in the
                hearts of viewers. I am fascinated by the interplay of light and
                shadow, the power of a single frame to evoke emotion, and the
                art of transforming a script into a cinematic experience.
              </p>
            </div>
          </motion.div>

          {/* Right — decorative quote */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="border-l-2 border-amber pl-8 py-6">
              <p className="font-display text-2xl md:text-3xl italic text-ivory/80 leading-relaxed mb-6">
                &ldquo;The camera is not merely a recording instrument; it is a
                medium through which messages reach us from another
                world.&rdquo;
              </p>
              <p className="eyebrow text-amber">— Satyajit Ray</p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "200+", label: "Projects" },
                { value: "FTII", label: "Graduated" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-border p-4 text-center"
                >
                  <p className="font-display text-2xl font-bold text-amber mb-1">
                    {stat.value}
                  </p>
                  <p
                    className="eyebrow text-dim-gray"
                    style={{ fontSize: "0.58rem" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Accent lines */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-amber/20 pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 border-b border-l border-amber/20 pointer-events-none"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Work Section ──────────────────────────────────────────────────────────────

function WorkSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const tabs = [
    { label: "ADS", ids: ADS_IDS },
    { label: "SHORT FILMS", ids: SHORT_FILMS_IDS },
    { label: "CSR", ids: CSR_IDS },
    { label: "PODCASTS", ids: PODCASTS_IDS },
  ];

  return (
    <section id="work" className="section-pad px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="eyebrow mb-4">WORK</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory font-bold uppercase leading-tight tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        <Tabs defaultValue="ADS" data-ocid="work.tab">
          <TabsList className="bg-transparent border-b border-border rounded-none h-auto mb-8 p-0 gap-0 w-full justify-start overflow-x-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.label}
                data-ocid={`work.${tab.label.toLowerCase().replace(" ", "-")}.tab`}
                className="eyebrow rounded-none border-b-2 border-transparent data-[state=active]:border-amber data-[state=active]:text-amber text-dim-gray hover:text-warm-gray pb-3 pt-1 px-4 bg-transparent data-[state=active]:bg-transparent transition-all"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.label} value={tab.label}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tab.ids.map((id, i) => (
                  <VideoCard
                    key={id}
                    id={id}
                    index={i}
                    onPlay={setActiveVideo}
                  />
                ))}
              </div>
              {tab.ids.length === 0 && (
                <div
                  data-ocid="work.empty_state"
                  className="text-center py-16 text-dim-gray eyebrow"
                >
                  COMING SOON
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {activeVideo && (
        <VideoModal
          videoId={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}

// ─── Equipment Section ─────────────────────────────────────────────────────────

function EquipmentSection() {
  return (
    <section id="gear" className="section-pad px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="eyebrow mb-4">EQUIPMENT</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory font-bold uppercase leading-tight tracking-tight">
            Tools of the Craft
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GEAR.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              data-ocid={`gear.item.${i + 1}`}
              className="border border-border bg-card p-6 group hover:border-amber/50 transition-colors duration-300"
            >
              <div className="text-amber mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {item.icon}
              </div>
              <h3 className="font-display text-xl text-ivory font-semibold mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-dim-gray leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────────

function ContactSection() {
  const mutation = useSubmitContactMessage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    try {
      await mutation.mutateAsync(form);
      toast.success("Message sent! I'll be in touch soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-pad px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="eyebrow mb-4">CONTACT</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory font-bold uppercase leading-tight tracking-tight">
            Let&rsquo;s Collaborate
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-warm-gray leading-relaxed">
              Available for narrative features, commercials, branded content,
              and documentary projects worldwide. Let's create something
              extraordinary together.
            </p>

            <div className="space-y-4 pt-4">
              <a
                href="https://www.instagram.com/iam_tushar_sarmalkar/"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.instagram.link"
                className="flex items-center gap-4 p-4 border border-border hover:border-amber group transition-all duration-300"
              >
                <div className="w-10 h-10 border border-amber/40 group-hover:border-amber flex items-center justify-center text-amber transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <p className="eyebrow text-ivory group-hover:text-amber transition-colors">
                    INSTAGRAM
                  </p>
                  <p className="text-sm text-dim-gray mt-0.5">
                    @iam_tushar_sarmalkar
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-dim-gray group-hover:text-amber ml-auto transition-colors" />
              </a>

              <a
                href="https://www.imdb.com/name/nm13423930/"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.imdb.link"
                className="flex items-center gap-4 p-4 border border-border hover:border-amber group transition-all duration-300"
              >
                <div className="w-10 h-10 border border-amber/40 group-hover:border-amber flex items-center justify-center text-amber transition-colors">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <p className="eyebrow text-ivory group-hover:text-amber transition-colors">
                    IMDB
                  </p>
                  <p className="text-sm text-dim-gray mt-0.5">
                    Tushar Sarmalkar on IMDB
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-dim-gray group-hover:text-amber ml-auto transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="contact.modal"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="eyebrow text-dim-gray block mb-2"
                >
                  NAME
                </label>
                <Input
                  data-ocid="contact.name.input"
                  id="contact-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className="bg-card border-border focus:border-amber rounded-none text-ivory placeholder:text-dim-gray"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="eyebrow text-dim-gray block mb-2"
                >
                  EMAIL
                </label>
                <Input
                  data-ocid="contact.email.input"
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="bg-card border-border focus:border-amber rounded-none text-ivory placeholder:text-dim-gray"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="eyebrow text-dim-gray block mb-2"
                >
                  MESSAGE
                </label>
                <Textarea
                  data-ocid="contact.message.textarea"
                  id="contact-message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell me about your project…"
                  rows={5}
                  className="bg-card border-border focus:border-amber rounded-none text-ivory placeholder:text-dim-gray resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={mutation.isPending}
                className="w-full bg-amber text-background hover:bg-amber/90 rounded-none eyebrow tracking-wider h-12 transition-all duration-300"
              >
                {mutation.isPending ? "SENDING…" : "SEND MESSAGE"}
              </Button>

              {mutation.isError && (
                <p
                  data-ocid="contact.error_state"
                  className="eyebrow text-destructive text-center"
                >
                  Failed to send. Please try again.
                </p>
              )}
              {mutation.isSuccess && (
                <p
                  data-ocid="contact.success_state"
                  className="eyebrow text-amber text-center"
                >
                  Message sent successfully!
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="eyebrow text-dim-gray">&copy; {year} Tushar Sarmalkar</p>
        <p className="eyebrow text-dim-gray" style={{ fontSize: "0.58rem" }}>
          Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber/70 hover:text-amber transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="film-grain vignette min-h-screen bg-background"
    >
      <Toaster position="bottom-right" theme="dark" />
      <Header />
      <main>
        <HeroSection />
        <BioSection />
        <WorkSection />
        <EquipmentSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
