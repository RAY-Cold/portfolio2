import { useEffect, useState } from 'react';
import { LuArrowDown, LuDownload, LuGithub, LuMail, LuMapPin } from 'react-icons/lu';
import { profile } from '../data/profile';
import { skills } from '../data/skills';
import { useTyping } from '../lib/hooks';
import { MagneticLink } from './ui';

const SCREENS = [
  { key: 'tour', label: 'Tour Secure AI', sub: 'Flutter, Supabase, Solidity' },
  { key: 'defi', label: 'Fortify DeFi', sub: 'Next.js, wagmi, viem' },
  { key: 'v2x', label: 'Decentralized V2X', sub: 'React, FastAPI, WebSockets' },
] as const;

export function Hero({ reduced }: { reduced: boolean }) {
  const typed = useTyping(profile.roles, reduced);
  const [screen, setScreen] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const t = window.setInterval(() => setScreen((s) => (s + 1) % SCREENS.length), 4200);
    return () => window.clearInterval(t);
  }, [reduced, paused]);

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-24 pb-10 md:pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.3fr_0.9fr] lg:gap-10">
        <div className="page-enter">
          <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-muted">
            <LuMapPin size={15} aria-hidden="true" className="text-violet" />
            {profile.location}
          </p>

          <h1 id="hero-title" className="font-display text-[clamp(3.4rem,9.5vw,6.3rem)] font-extrabold leading-[0.88] tracking-[-0.055em]">
            {profile.name.split(' ').map((part, i) => (
              <span key={part} className="block">
                {i > 0 && ' '}
                {part}
              </span>
            ))}
          </h1>

          <p className="mt-5 flex items-center gap-3 font-display text-[clamp(1.3rem,3vw,1.85rem)] font-semibold" aria-live="off">
            <span aria-hidden="true" className="inline-block h-[2px] w-10 bg-blue" />
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span aria-hidden="true">
              <span className="gradient-text">{typed}</span>
              <span className="caret !bg-violet" />
            </span>
          </p>

          <p className="mt-6 max-w-[33rem] text-[1.06rem] leading-relaxed text-muted sm:text-lg">
            {profile.headline}. {profile.intro}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <MagneticLink href="/#projects" variant="primary">
              View my projects
            </MagneticLink>
            <MagneticLink href={profile.resumeUrl} download={profile.resumeFileName} external={false}>
              <LuDownload size={17} aria-hidden="true" /> Download resume
            </MagneticLink>
            <MagneticLink href="/#contact">
              <LuMail size={17} aria-hidden="true" /> Contact me
            </MagneticLink>
            <MagneticLink href={profile.links.github} label="GitHub profile (opens in a new tab)">
              <LuGithub size={17} aria-hidden="true" /> GitHub
            </MagneticLink>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {profile.heroHighlights.map((h) => (
              <li key={h.title} className="border-l-2 border-violet pl-3">
                <span className="block font-bold">{h.title}</span>
                <span className="block text-muted">{h.body}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="page-enter flex flex-col items-center [animation-delay:160ms]">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-10 -z-10 rounded-full opacity-70 blur-3xl"
              style={{ background: 'radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--blue) 45%, transparent), color-mix(in srgb, var(--violet) 25%, transparent) 50%, transparent 72%)' }}
            />
            <div className={`phone ${reduced ? '' : 'float-y'}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <div className="phone-screen" role="img" aria-label={`Preview of ${SCREENS[screen].label}`}>
                <div className="phone-notch" />
                <div className="screen-layer" data-on={screen === 0}>
                  <TourScreen />
                </div>
                <div className="screen-layer" data-on={screen === 1}>
                  <DefiScreen />
                </div>
                <div className="screen-layer" data-on={screen === 2}>
                  <V2xScreen />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 text-center" aria-live="polite">
            <p className="font-display text-lg font-bold">{SCREENS[screen].label}</p>
            <p className="text-sm text-muted">{SCREENS[screen].sub}</p>
          </div>
          <div className="mt-3 flex gap-2" role="tablist" aria-label="Choose a project preview">
            {SCREENS.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={screen === i}
                aria-label={`Show ${s.label}`}
                onClick={() => setScreen(i)}
                data-cursor="hover"
                className={`h-2.5 rounded-full transition-all duration-300 ${screen === i ? 'w-8 bg-blue' : 'w-2.5 bg-line-strong hover:bg-muted'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <TechTicker reduced={reduced} />

      <a
        href="/#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        }}
        className="mx-auto mt-8 hidden w-fit items-center gap-2 text-sm text-faint transition-colors hover:text-ink md:flex"
      >
        <LuArrowDown size={16} aria-hidden="true" className={reduced ? '' : 'animate-bounce'} /> Scroll
      </a>
    </section>
  );
}

function TechTicker({ reduced }: { reduced: boolean }) {
  const items = skills.filter((s) => s.category !== 'Languages' || ['TypeScript', 'Dart', 'Python'].includes(s.name));
  const row = (hidden: boolean) =>
    items.map((s) => (
      <li key={`${hidden ? 'b' : 'a'}-${s.name}`} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-2.5 px-6 text-muted">
        <s.icon size={20} aria-hidden="true" />
        <span className="font-display text-lg font-semibold whitespace-nowrap">{s.name}</span>
      </li>
    ));
  return (
    <div className="ticker mt-20 border-y border-line py-5" aria-label="Technologies I use">
      <ul className="ticker-track" style={reduced ? { animation: 'none' } : undefined}>
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}

/* ---- Mini app screens, drawn to echo each project's real UI ---- */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-4 pb-2 text-[10px] font-bold text-white/80">
      <span>9:41</span>
      <span className="flex gap-1">
        <span className="h-1.5 w-3 rounded-sm bg-white/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
      </span>
    </div>
  );
}

function TourScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0f1416] text-white">
      <StatusBar />
      <div className="px-4 pt-3">
        <p className="text-[11px] text-white/60">Tour Secure AI</p>
        <p className="font-display text-lg font-bold leading-tight">Safety around you</p>
      </div>
      <div className="relative mx-4 mt-3 h-[46%] overflow-hidden rounded-2xl bg-[#18222a]">
        <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
          <path d="M0 60 H200 M0 140 H200 M60 0 V220 M140 0 V220" stroke="#2a3a44" strokeWidth="8" />
          <circle cx="58" cy="64" r="42" fill="#ef4444" opacity="0.35" />
          <circle cx="140" cy="150" r="36" fill="#f59e0b" opacity="0.32" />
          <circle cx="150" cy="54" r="26" fill="#3fe0b0" opacity="0.35" />
          <path d="M20 200 Q70 130 100 140 T190 60" fill="none" stroke="#3fe0b0" strokeWidth="3" strokeDasharray="6 5" />
          <circle cx="100" cy="140" r="6" fill="#fff" />
          <circle cx="100" cy="140" r="14" fill="none" stroke="#fff" strokeOpacity="0.5" />
        </svg>
        <span className="absolute top-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold">Live heatmap</span>
      </div>
      <div className="mx-4 mt-3 grid grid-cols-2 gap-2 text-[10px]">
        <div className="rounded-xl bg-white/5 p-2.5">
          <p className="text-white/55">Area score</p>
          <p className="font-display text-base font-bold text-[#3fe0b0]">Safe</p>
        </div>
        <div className="rounded-xl bg-white/5 p-2.5">
          <p className="text-white/55">Digital ID</p>
          <p className="font-display text-base font-bold">On-chain</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-center pb-6">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[#ef4444] font-display text-sm font-extrabold shadow-[0_0_0_8px_rgba(239,68,68,0.2)]">SOS</span>
      </div>
    </div>
  );
}

function DefiScreen() {
  const vaults = [
    { n: 'Stable vault', y: 'Insured', c: '#3fe0b0' },
    { n: 'ETH yield', y: 'Medium risk', c: '#ffb547' },
    { n: 'Leveraged LP', y: 'High risk', c: '#ff5c8a' },
  ];
  return (
    <div className="flex h-full flex-col bg-[#120f18] text-white">
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-3">
        <div>
          <p className="text-[11px] text-white/60">Fortify DeFi</p>
          <p className="font-display text-lg font-bold leading-tight">Portfolio risk</p>
        </div>
        <span className="rounded-full bg-[#3fe0b0]/15 px-2 py-1 text-[9px] font-semibold text-[#3fe0b0]">Wallet connected</span>
      </div>
      <div className="mx-4 mt-4 flex items-center gap-4 rounded-2xl bg-white/5 p-4">
        <svg viewBox="0 0 60 60" className="h-16 w-16" aria-hidden="true">
          <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
          <circle cx="30" cy="30" r="24" fill="none" stroke="#ffb547" strokeWidth="7" strokeDasharray="95 151" strokeLinecap="round" transform="rotate(-90 30 30)" />
        </svg>
        <div className="text-[10px]">
          <p className="text-white/55">Risk-aware view</p>
          <p className="font-display text-base font-bold">Moderate</p>
          <p className="text-white/55">Coverage suggested</p>
        </div>
      </div>
      <p className="mx-4 mt-4 text-[10px] font-semibold text-white/55">Vaults</p>
      <ul className="mx-4 mt-2 space-y-2">
        {vaults.map((v) => (
          <li key={v.n} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-[11px]">
            <span className="font-semibold">{v.n}</span>
            <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ color: v.c, background: `${v.c}22` }}>
              {v.y}
            </span>
          </li>
        ))}
      </ul>
      <div className="mx-4 mt-auto mb-6 grid grid-cols-3 gap-2 text-center text-[9px] font-semibold">
        {['Vaults', 'Insurance', 'DAO'].map((t, i) => (
          <span key={t} className={`rounded-full py-2 ${i === 0 ? 'bg-[#ff5c8a] text-[#1a0b12]' : 'bg-white/5 text-white/70'}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function V2xScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0d1112] text-white">
      <StatusBar />
      <div className="px-4 pt-3">
        <p className="text-[11px] text-white/60">Decentralized V2X</p>
        <p className="font-display text-lg font-bold leading-tight">Digital twin</p>
      </div>
      <div className="mx-4 mt-3 rounded-xl border border-[#ffb547]/40 bg-[#ffb547]/10 px-3 py-2 text-[10px]">
        <span className="font-bold text-[#ffb547]">Hazard ahead.</span> Shared by 3 nearby vehicles
      </div>
      <div className="relative mx-4 mt-3 flex-1 overflow-hidden rounded-2xl bg-[#151b1d]">
        <svg viewBox="0 0 200 260" className="h-full w-full" aria-hidden="true">
          {[50, 130, 210].map((y) => (
            <path key={y} d={`M0 ${y} H200`} stroke="#263033" strokeWidth="14" />
          ))}
          {[60, 140].map((x) => (
            <path key={x} d={`M${x} 0 V260`} stroke="#263033" strokeWidth="14" />
          ))}
          <rect x="88" y="124" width="14" height="10" rx="2" fill="#ef4444" />
          {[
            [30, 50],
            [116, 130],
            [60, 180],
            [170, 210],
            [140, 90],
          ].map(([x, y], i) => (
            <rect key={i} x={x - 7} y={y - 5} width="14" height="10" rx="3" fill={i < 3 ? '#3fe0b0' : '#ff5c8a'} />
          ))}
          <path d="M30 50 L60 50 L60 130 L95 130" fill="none" stroke="#3fe0b0" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M116 130 L95 130" fill="none" stroke="#3fe0b0" strokeWidth="1.5" strokeDasharray="4 4" />
          <g transform="translate(140 50)">
            <rect x="-9" y="-16" width="18" height="16" rx="3" fill="#ffb547" />
            <text y="-5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1a0b12">RSU</text>
          </g>
        </svg>
      </div>
      <div className="mx-4 mt-3 mb-6 grid grid-cols-2 gap-2 text-[10px]">
        <div className="rounded-xl bg-white/5 p-2.5">
          <p className="text-white/55">Cloud link</p>
          <p className="font-display text-sm font-bold text-[#ff5c8a]">Offline</p>
        </div>
        <div className="rounded-xl bg-white/5 p-2.5">
          <p className="text-white/55">Alerts</p>
          <p className="font-display text-sm font-bold text-[#3fe0b0]">Still flowing</p>
        </div>
      </div>
    </div>
  );
}
