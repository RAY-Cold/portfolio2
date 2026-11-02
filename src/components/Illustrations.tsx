import type { CSSProperties, ReactNode } from 'react';
import type { Project } from '../data/projects';

// Architecture diagrams drawn from each repository's real structure. Packets
// move along the paths with CSS offset-path; reduced-motion users get a still frame.

const T = { fontFamily: 'Inter, sans-serif', fontSize: 10, fill: 'var(--muted)' } as const;
const H = { fontFamily: 'Space Grotesk, Inter, sans-serif', fontSize: 11, fontWeight: 600, fill: 'var(--ink)' } as const;

function Box({ x, y, w, h, label, sub, tone = 'var(--blue)' }: { x: number; y: number; w: number; h: number; label: string; sub?: string; tone?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={9} fill="color-mix(in srgb, var(--bg-2) 80%, transparent)" stroke={tone} strokeOpacity={0.7} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle" {...H}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" {...T} fontSize={9}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Flow({ d, tone = 'var(--cyan)', delay = 0, dash = false }: { d: string; tone?: string; delay?: number; dash?: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke="var(--line-strong)" strokeWidth={1.4} strokeDasharray={dash ? '4 4' : undefined} />
      <circle r={3.2} fill={tone} className="packet" style={{ offsetPath: `path('${d}')`, ['--d' as string]: `${delay}s` } as CSSProperties} />
    </g>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 400 240" role="img" aria-label={label} className="h-auto w-full">
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--line)" />
        </pattern>
      </defs>
      <rect width="400" height="240" fill="url(#dots)" />
      {children}
    </svg>
  );
}

function Car({ x, y, tone = 'var(--cyan)' }: { x: number; y: number; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-13} y={-7} width={26} height={14} rx={5} fill="var(--bg-2)" stroke={tone} />
      <rect x={-6} y={-4.5} width={12} height={9} rx={2.5} fill={tone} opacity={0.35} />
    </g>
  );
}

function V2X() {
  return (
    <Frame label="Vehicles gossip hazard warnings to each other and to roadside units, which train a shared model by federated averaging while the cloud is offline.">
      <path d="M20 170 H380 M200 70 V230" stroke="var(--line-strong)" strokeWidth={14} strokeOpacity={0.35} />
      <Car x={70} y={170} />
      <Car x={140} y={170} tone="var(--blue)" />
      <Car x={300} y={170} tone="var(--violet)" />
      <Car x={200} y={215} tone="var(--blue)" />
      <g>
        <circle cx={70} cy={170} r={10} fill="none" stroke="var(--cyan)" className="pulse-ring" />
      </g>
      <Flow d="M70 170 Q105 140 140 170" tone="var(--cyan)" />
      <Flow d="M140 170 Q220 120 300 170" tone="var(--cyan)" delay={-1.1} />
      <Flow d="M140 170 Q170 200 200 215" tone="var(--cyan)" delay={-2} />
      <Box x={95} y={84} w={80} h={36} label="RSU edge" sub="local inference" tone="var(--blue)" />
      <Box x={235} y={84} w={80} h={36} label="RSU edge" sub="local inference" tone="var(--blue)" />
      <Flow d="M140 170 L135 120" tone="var(--blue)" delay={-0.6} />
      <Flow d="M300 170 L275 120" tone="var(--blue)" delay={-1.8} />
      <Box x={150} y={18} w={110} h={36} label="FedAvg" sub="weights only" tone="var(--violet)" />
      <Flow d="M135 84 Q150 60 180 54" tone="var(--violet)" dash delay={-0.4} />
      <Flow d="M275 84 Q260 60 232 54" tone="var(--violet)" dash delay={-2.2} />
      <g transform="translate(340 34)">
        <path d="M-22 6 a10 10 0 0 1 4 -18 a14 14 0 0 1 26 2 a9 9 0 0 1 4 16 z" fill="none" stroke="var(--faint)" strokeDasharray="3 3" />
        <path d="M-7 -8 L7 6 M7 -8 L-7 6" stroke="#f87171" strokeWidth={2} strokeLinecap="round" />
        <text x={-4} y={24} textAnchor="middle" {...T} fontSize={9}>
          cloud down
        </text>
      </g>
      <text x={20} y={200} {...T}>
        DENM hazard warning
      </text>
    </Frame>
  );
}

function TourSecure() {
  return (
    <Frame label="Flutter app with a safety heatmap and SOS button, backed by Supabase tables and a soulbound ERC-721 digital ID on Ethereum that stores only a hash.">
      <g transform="translate(150 14)">
        <rect width={100} height={196} rx={16} fill="var(--bg-2)" stroke="var(--cyan)" />
        <rect x={38} y={7} width={24} height={4} rx={2} fill="var(--line-strong)" />
        <rect x={8} y={18} width={84} height={92} rx={8} fill="color-mix(in srgb, var(--bg) 70%, transparent)" stroke="var(--line-strong)" />
        <circle cx={34} cy={48} r={20} fill="#ef4444" opacity={0.28} />
        <circle cx={62} cy={74} r={16} fill="#f59e0b" opacity={0.28} />
        <circle cx={70} cy={38} r={12} fill="var(--good)" opacity={0.3} />
        <path d="M14 96 Q40 70 58 82 T88 54" fill="none" stroke="var(--cyan)" strokeWidth={1.6} strokeDasharray="3 3" />
        <circle cx={58} cy={82} r={3.4} fill="var(--cyan)" />
        <circle cx={58} cy={82} r={8} fill="none" stroke="var(--cyan)" className="pulse-ring" />
        <text x={50} y={124} textAnchor="middle" {...H} fontSize={10}>
          Safety heatmap
        </text>
        <rect x={10} y={134} width={36} height={20} rx={6} fill="color-mix(in srgb, var(--blue) 20%, transparent)" stroke="var(--blue)" strokeOpacity={0.6} />
        <text x={28} y={147} textAnchor="middle" {...T} fontSize={8}>
          e-FIR
        </text>
        <rect x={54} y={134} width={36} height={20} rx={6} fill="color-mix(in srgb, var(--violet) 20%, transparent)" stroke="var(--violet)" strokeOpacity={0.6} />
        <text x={72} y={147} textAnchor="middle" {...T} fontSize={8}>
          Digital ID
        </text>
        <circle cx={50} cy={176} r={13} fill="#ef4444" opacity={0.9} />
        <circle cx={50} cy={176} r={13} fill="#ef4444" opacity={0.3} className="pulse-ring" />
        <text x={50} y={179} textAnchor="middle" fontFamily="Inter" fontSize={8} fontWeight={700} fill="#fff">
          SOS
        </text>
      </g>
      <Box x={16} y={40} w={104} h={40} label="Supabase" sub="profiles, places, scores" tone="var(--blue)" />
      <Box x={16} y={140} w={104} h={40} label="Itineraries" sub="e-FIR, reviews" tone="var(--blue)" />
      <Box x={282} y={40} w={104} h={40} label="TouristID" sub="soulbound ERC-721" tone="var(--violet)" />
      <Box x={282} y={140} w={104} h={40} label="On-chain" sub="hash only, no PII" tone="var(--violet)" />
      <Flow d="M150 60 H120" tone="var(--blue)" />
      <Flow d="M150 160 H120" tone="var(--blue)" delay={-1.2} />
      <Flow d="M250 60 H282" tone="var(--violet)" delay={-0.6} />
      <Flow d="M334 80 V140" tone="var(--violet)" delay={-1.8} dash />
    </Frame>
  );
}

function Fortify() {
  const bars = [38, 52, 44, 66, 58, 74, 70];
  return (
    <Frame label="A wallet connects through wagmi and viem to a Next.js app with vaults, insurance, and DAO governance, all scored by a risk engine and backed by API routes over a Prisma database.">
      <Box x={16} y={22} w={92} h={40} label="Wallet" sub="wagmi + viem" tone="var(--cyan)" />
      <Flow d="M108 42 H148" />
      <g transform="translate(148 14)">
        <rect width={236} height={150} rx={12} fill="color-mix(in srgb, var(--bg-2) 85%, transparent)" stroke="var(--violet)" strokeOpacity={0.7} />
        <text x={14} y={22} {...H} fontSize={11}>
          Risk-aware dashboard
        </text>
        {['Vaults', 'Insurance', 'DAO'].map((t, i) => (
          <g key={t} transform={`translate(${14 + i * 72} 34)`}>
            <rect width={64} height={26} rx={7} fill="color-mix(in srgb, var(--blue) 14%, transparent)" stroke="var(--blue)" strokeOpacity={0.5} />
            <text x={32} y={17} textAnchor="middle" {...T} fontSize={9} fill="var(--ink)">
              {t}
            </text>
          </g>
        ))}
        {bars.map((h, i) => (
          <rect key={i} x={16 + i * 18} y={138 - h} width={11} height={h} rx={2} fill={i === 5 ? 'var(--violet)' : 'var(--blue)'} opacity={0.75} className="col-grow" style={{ ['--i' as string]: i } as CSSProperties} />
        ))}
        <g transform="translate(176 104)">
          <circle r={26} fill="none" stroke="var(--line-strong)" strokeWidth={6} />
          <circle r={26} fill="none" stroke="var(--good)" strokeWidth={6} strokeDasharray="120 164" transform="rotate(-90)" strokeLinecap="round" />
          <text y={4} textAnchor="middle" {...H} fontSize={10}>
            Risk
          </text>
          <text y={42} textAnchor="middle" {...T} fontSize={8}>
            score per vault
          </text>
        </g>
      </g>
      <Box x={16} y={110} w={92} h={40} label="Risk engine" sub="prices coverage" tone="var(--violet)" />
      <Flow d="M108 130 H148" tone="var(--violet)" delay={-1} />
      <Box x={148} y={186} w={112} h={38} label="39 API routes" sub="Next.js" tone="var(--blue)" />
      <Box x={272} y={186} w={112} h={38} label="Prisma" sub="11 models" tone="var(--blue)" />
      <Flow d="M204 164 V186" delay={-0.4} />
      <Flow d="M260 205 H272" delay={-1.6} />
    </Frame>
  );
}

function ECommerce() {
  const steps = [
    { label: 'Catalogue', sub: 'product pages' },
    { label: 'Cart', sub: 'add, update' },
    { label: 'Order', sub: 'checkout' },
    { label: 'Tracking', sub: 'order status' },
  ];
  return (
    <Frame label="Shopper flow from catalogue to cart, order, and tracking, with an admin dashboard managing products and orders in MongoDB through a Node and Express API.">
      {steps.map((st, i) => (
        <Box key={st.label} x={14 + i * 96} y={30} w={84} h={42} label={st.label} sub={st.sub} tone={i % 2 ? 'var(--violet)' : 'var(--cyan)'} />
      ))}
      {[0, 1, 2].map((i) => (
        <Flow key={i} d={`M${98 + i * 96} 51 H${110 + i * 96}`} delay={-i * 0.7} />
      ))}
      <Box x={126} y={118} w={148} h={42} label="Node + Express API" sub="REST" tone="var(--blue)" />
      <Box x={14} y={182} w={130} h={40} label="Admin dashboard" sub="products, orders" tone="var(--violet)" />
      <Box x={256} y={182} w={130} h={40} label="MongoDB" sub="store data" tone="var(--blue)" />
      <Flow d="M200 72 V118" tone="var(--blue)" delay={-0.3} />
      <Flow d="M160 160 Q120 175 100 182" tone="var(--violet)" delay={-1.1} />
      <Flow d="M240 160 Q280 175 300 182" tone="var(--blue)" delay={-1.9} />
      <g transform="translate(352 140)">
        <circle r={20} fill="color-mix(in srgb, #f5c542 20%, transparent)" stroke="#f5c542" />
        <text y={4} textAnchor="middle" fontFamily="Space Grotesk, Inter" fontSize={12} fontWeight={700} fill="#f5c542">
          1st
        </text>
      </g>
    </Frame>
  );
}

export function ProjectIllustration({ kind }: { kind: Project['illustration'] }) {
  switch (kind) {
    case 'v2x':
      return <V2X />;
    case 'toursecure':
      return <TourSecure />;
    case 'fortify':
      return <Fortify />;
    case 'ecommerce':
      return <ECommerce />;
  }
}
