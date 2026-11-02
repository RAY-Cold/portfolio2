import { useLayoutEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  LuActivity, LuBriefcase, LuDownload, LuHouse, LuLayers, LuMail, LuMoon, LuSun, LuTrophy, LuUser, LuWrench,
} from 'react-icons/lu';
import { monogramPaths } from '../data/brand';
import { profile } from '../data/profile';
import { useActiveSection, useScrolledPast, type Theme } from '../lib/hooks';
import { navigate } from '../lib/router';

export const NAV_ITEMS: readonly { id: string; label: string; icon: IconType }[] = [
  { id: 'home', label: 'Home', icon: LuHouse },
  { id: 'about', label: 'About', icon: LuUser },
  { id: 'skills', label: 'Skills', icon: LuWrench },
  { id: 'projects', label: 'Projects', icon: LuLayers },
  { id: 'experience', label: 'Experience', icon: LuBriefcase },
  { id: 'achievements', label: 'Achievements', icon: LuTrophy },
  { id: 'dashboard', label: 'Dashboard', icon: LuActivity },
  { id: 'contact', label: 'Contact', icon: LuMail },
];

const IDS = NAV_ITEMS.map((n) => n.id);

export function Monogram({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--blue)" />
          <stop offset="1" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="13" fill="url(#mg)" />
      {monogramPaths.map((d) => (
        <path key={d} d={d} fill="none" stroke="#1a0b12" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/** Top bar (identity + theme + resume) and an app-style dock at the bottom for section navigation. */
export function Nav({ onHome, theme, toggleTheme }: { onHome: boolean; theme: Theme; toggleTheme: () => void }) {
  const active = useActiveSection(IDS, onHome);
  const scrolled = useScrolledPast(12);
  const dockRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      if (!onHome) return setPill(null);
      const li = dockRef.current?.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`)?.parentElement;
      if (li) setPill({ left: li.offsetLeft, width: li.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active, onHome]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigate(`/#${id}`);
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || !onHome ? 'py-2' : 'py-4'}`}>
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2 transition-all duration-300 sm:px-8 ${
            scrolled || !onHome ? 'frosted mx-3 rounded-full !px-3 sm:mx-6 lg:mx-auto' : ''
          }`}
        >
          <a href="/#home" onClick={(e) => go(e, 'home')} className="flex items-center gap-2.5 rounded-full pr-2" data-cursor="hover">
            <Monogram />
            <span className="font-display text-[1.1rem] font-bold tracking-tight">{profile.name}</span>
          </a>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:text-ink"
              data-cursor="hover"
            >
              {theme === 'dark' ? <LuSun size={17} /> : <LuMoon size={17} />}
            </button>
            <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn btn-primary !px-4 !py-2.5 text-sm" data-cursor="hover">
              <LuDownload size={16} aria-hidden="true" /> <span className="hidden sm:inline">Resume</span>
              <span className="sr-only sm:hidden">Download resume</span>
            </a>
          </div>
        </div>
      </header>

      <nav aria-label="Sections" className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 sm:bottom-5">
        <ul ref={dockRef} className="frosted no-scrollbar relative flex max-w-full items-center overflow-x-auto rounded-full p-1.5">
          {pill && <li aria-hidden="true" className="dock-pill" style={{ left: pill.left, width: pill.width }} />}
          {NAV_ITEMS.map((item) => {
            const on = onHome && active === item.id;
            return (
              <li key={item.id} className="dock-item shrink-0">
                <a
                  href={`/#${item.id}`}
                  data-id={item.id}
                  onClick={(e) => go(e, item.id)}
                  aria-current={on ? 'true' : undefined}
                  aria-label={item.label}
                  title={item.label}
                  data-cursor="hover"
                  className={`flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors duration-300 lg:px-3.5 ${
                    on ? 'text-bg' : 'text-muted hover:text-ink'
                  }`}
                >
                  <item.icon size={18} aria-hidden="true" />
                  <span className={`hidden xl:inline ${on ? '' : ''}`}>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
