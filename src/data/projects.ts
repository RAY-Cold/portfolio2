// Project content comes from Rahul's resume and from each project's own
// repository (READMEs, source, and contracts).

export type ProjectCategory = 'Mobile' | 'Web3' | 'Full-stack' | 'Distributed systems' | 'AI / ML';

export type Project = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  categories: ProjectCategory[];
  stack: string[];
  repo?: string;
  context: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  contributions: string[];
  metrics: { value: string; label: string }[];
  illustration: 'v2x' | 'toursecure' | 'fortify' | 'ecommerce';
  image?: { src: string; alt: string; caption: string; width: number; height: number };
  accent: string;
};

const repo = (name: string) => `https://github.com/RAY-Cold/${name}`;

export const projects: Project[] = [
  {
    slug: 'tour-secure-ai',
    name: 'Tour Secure AI — Tourist Safety Platform',
    shortName: 'Tour Secure AI',
    tagline: 'A Flutter safety app for travellers: live heatmaps, SOS, e-FIR, and an on-chain digital ID.',
    categories: ['Mobile', 'Web3', 'AI / ML'],
    stack: ['Flutter', 'Dart', 'Supabase', 'Solidity', 'Ethereum', 'web3dart', 'flutter_map', 'AI/ML'],
    repo: repo('V2.0'),
    context: 'Smart India Hackathon 2025 · Institute Finalist · team project',
    overview:
      'The mobile half of a team tourist-safety platform. Travellers get a safety heatmap of the area around them, can plan and share itineraries, file an e-FIR, read and post place reviews, and carry a verifiable digital ID, with a one-tap SOS button on every screen. Teammates built the web version; I built the mobile app on my own.',
    problem:
      'Tourists in unfamiliar places often cannot tell which areas are risky, and in an emergency they lose time proving who they are and filing a report. Identity documents shared over chat or email can also be altered.',
    solution:
      'Put the safety tools in a mobile app backed by Supabase, and anchor each traveller’s identity on Ethereum with a soulbound token. Only a hash of the ID record goes on-chain, so the record can be verified without exposing personal data.',
    features: [
      'Seven screens: home, safety heatmap, reviews, itinerary, e-FIR, digital ID, and about',
      'Safety heatmap built on flutter_map from area scores and population data in Supabase',
      'One-tap SOS button and real-time safety alerts',
      'Itinerary planning and e-FIR filing stored in Supabase',
      'Digital ID shown as a QR code and backed by a soulbound ERC-721 token (EIP-5192) that cannot be transferred',
      'Only a keccak256 hash of the ID record is stored on-chain, keeping personal data off the blockchain',
    ],
    contributions: [
      'Sole developer of the Flutter mobile app in a team project; teammates built the web version.',
      'Integrated Ethereum smart contracts (Solidity) for tamper-resistant tourist digital identity and records.',
      'Built the Supabase backend and mobile workflows for digital ID, real-time safety alerts, and emergency SOS.',
    ],
    metrics: [
      { value: '7', label: 'app screens, built solo' },
      { value: '~6.9K', label: 'lines of Dart' },
      { value: 'EIP-5192', label: 'soulbound digital ID token' },
      { value: 'SIH 2025', label: 'institute finalist' },
    ],
    illustration: 'toursecure',
    accent: 'var(--cyan)',
  },
  {
    slug: 'fortify-defi',
    name: 'Fortify DeFi — Risk-Aware DeFi Platform',
    shortName: 'Fortify DeFi',
    tagline: 'Yield vaults, insurance, and DAO governance with the risk shown up front.',
    categories: ['Web3', 'Full-stack'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'wagmi', 'viem', 'WalletConnect', 'Prisma', 'Recharts', 'Zustand'],
    repo: repo('ProjectF'),
    context: 'Team project',
    overview:
      'A DeFi web app that puts risk next to every decision. Users connect a wallet, compare insured and uninsured yield vaults, buy coverage and file claims, and vote on claims and protocol parameters through a DAO. A demo mode lets presenters simulate incidents and fast-forward claims.',
    problem:
      'DeFi dashboards usually show yield and hide risk. Users choose vaults without seeing how likely a loss is, and insurance and governance live in separate tools.',
    solution:
      'One Next.js app with a risk score on every vault, pricing coverage by that risk, and routing claims to DAO votes, all backed by API routes and a Prisma data model so the full flow runs end to end.',
    features: [
      'Dashboard with a risk-aware portfolio overview and next-step recommendations',
      'Insured and uninsured yield vaults with dynamic risk pricing',
      'Coverage purchase, claim submission, and claim review workflow',
      'DAO governance: voting on claims and on protocol parameter proposals',
      'Risk analytics with score breakdowns, a risk heatmap, TVL, solvency, and claim-frequency charts',
      'Wallet connection with wagmi, viem, and WalletConnect',
      '39 API routes over an 11-model Prisma schema, plus a demo mode for simulating incidents',
    ],
    contributions: [
      'Built a DeFi platform covering risk-aware portfolio management, yield vaults, insurance workflows, and DAO governance.',
      'Designed responsive dashboards with interactive risk and portfolio analytics visualizations.',
      'Integrated wallet and on-chain interactions using wagmi and viem within a component-based architecture.',
    ],
    metrics: [
      { value: '7', label: 'app sections' },
      { value: '39', label: 'API routes' },
      { value: '11', label: 'data models (Prisma)' },
      { value: '~8.3K', label: 'lines of TypeScript' },
    ],
    illustration: 'fortify',
    accent: 'var(--violet)',
  },
  {
    slug: 'decentralized-v2x',
    name: 'Decentralized V2X Ecosystem',
    shortName: 'Decentralized V2X',
    tagline: 'Vehicles and roadside units that keep traffic safe when the cloud goes dark.',
    categories: ['Distributed systems', 'AI / ML'],
    stack: ['TypeScript', 'React', 'FastAPI', 'Python', 'scikit-learn', 'WebSockets'],
    repo: repo('V2X'),
    context: 'B.Tech Project-I · team of three · mentor Dr. Malathi D',
    overview:
      'A decentralized vehicle-to-everything prototype. Every vehicle is a compute node that senses hazards, gossips them to nearby vehicles, and reroutes around congestion using only what its peers report. Roadside units run edge AI, a fog tier aggregates districts, and a digital-twin dashboard shows it all live.',
    problem:
      'Connected-vehicle systems usually route decisions through a central cloud. Losing the uplink loses the service, a hazard just ahead waits on a data-centre round trip, and continuous per-vehicle telemetry exposes movement history.',
    solution:
      'Move intelligence to the vehicle and the roadside. Hazard warnings travel peer to peer, roadside units corroborate reports and forecast congestion locally, and only compact digests go up through a fog tier to the cloud.',
    features: [
      'Peer-to-peer hazard gossip between simulated vehicles, with V2V collaborative rerouting',
      'Roadside units that corroborate reports, forecast congestion, and self-heal when a neighbour fails',
      'Fog computing tier that aggregates a district’s roadside units into one regional summary',
      'Predictive emergency corridor: lights preempt and nearby vehicles get a yield instruction before an ambulance arrives',
      'Trust layer that scores reporters and flags fabricated hazard reports',
      'React digital-twin dashboard streaming live state over WebSockets',
    ],
    contributions: [
      'Built the decentralized V2X system with peer-to-peer hazard sharing over 6 ETSI C-ITS message types, roadside-unit edge inference, a city digital twin, and certificate-based security with pseudonym rotation.',
      'Against a centralized baseline over 5 seeds with 95% confidence intervals: cut cloud uplink traffic by 88.7%, kept 100% availability through a cloud outage, and raised hazard-detection precision from 0.861 to 0.994.',
      'Trained a regional congestion model with federated averaging (24 rounds, 275.6 KB of raw telemetry kept local) and shipped a 7-scenario guided demo backed by 360+ automated tests.',
    ],
    metrics: [
      { value: '−88.7%', label: 'cloud uplink traffic vs. centralized' },
      { value: '100%', label: 'availability through a cloud outage' },
      { value: '0.994', label: 'hazard-detection precision (from 0.861)' },
      { value: '24', label: 'federated rounds, 275.6 KB telemetry kept local' },
    ],
    illustration: 'v2x',
    accent: 'var(--blue)',
  },
  {
    slug: 'e-commerce-platform',
    name: 'E-Commerce Platform',
    shortName: 'E-Commerce Platform',
    tagline: 'A full-stack store that won first place at an inter-college web development competition.',
    categories: ['Full-stack'],
    stack: ['React.js', 'Node.js', 'Express', 'MongoDB'],
    context: 'Inter-College Web Development Competition 2024 · First Place',
    overview:
      'A complete online store built for a competition: shoppers browse products, fill a cart, place orders, and track them, while an admin manages the catalogue and orders from a dashboard.',
    problem:
      'The competition asked teams to build and present a working, end-to-end web product in a short time, judged on completeness and presentation.',
    solution:
      'A MERN stack store covering both sides of the business, the shopper’s flow and the admin’s, so the whole order lifecycle could be demonstrated live.',
    features: [
      'Product listings and product pages',
      'Shopping cart and checkout',
      'Order tracking for shoppers',
      'Admin dashboard for products and orders',
    ],
    contributions: ['Built a full-stack store with product listings, cart, order tracking, and an admin dashboard; it won first place.'],
    metrics: [
      { value: '1st', label: 'place, inter-college competition' },
      { value: '2024', label: 'competition year' },
    ],
    illustration: 'ecommerce',
    accent: 'var(--cyan)',
  },
];

export const projectCategories: ProjectCategory[] = ['Mobile', 'Web3', 'Full-stack', 'Distributed systems', 'AI / ML'];
