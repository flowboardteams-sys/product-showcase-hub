export type Post = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  votes: number;
  comments: number;
  topics: string[];
  maker: string;
  day: "today" | "yesterday";
};

export const posts: Post[] = [
  {
    id: "orbitdesk",
    name: "OrbitDesk",
    tagline: "The calm inbox for support teams",
    description:
      "OrbitDesk groups every customer conversation into a single thread across email, chat and social, then drafts replies your team can send in one keystroke.",
    emoji: "🛰️",
    votes: 1428,
    comments: 96,
    topics: ["SaaS", "Customer Support", "AI"],
    maker: "Nina Alvarez",
    day: "today",
  },
  {
    id: "sunbeam",
    name: "Sunbeam",
    tagline: "Solar savings math in 30 seconds",
    description:
      "Drop your address and Sunbeam models roof angle, local rates and incentives to show exactly what panels would pay back, with no sales call attached.",
    emoji: "☀️",
    votes: 1183,
    comments: 74,
    topics: ["Climate", "Home", "Calculator"],
    maker: "Deepak Rao",
    day: "today",
  },
  {
    id: "keeltrack",
    name: "KeelTrack",
    tagline: "Shipping analytics for tiny teams",
    description:
      "KeelTrack watches your repo and turns commits into a weekly shipping report your investors actually read.",
    emoji: "📦",
    votes: 1041,
    comments: 58,
    topics: ["Developer Tools", "Analytics"],
    maker: "Rosa Lindqvist",
    day: "today",
  },
  {
    id: "murmur",
    name: "Murmur",
    tagline: "Voice notes that become docs",
    description:
      "Talk for two minutes on your walk and Murmur returns a structured document with headings, action items and links.",
    emoji: "🎙️",
    votes: 968,
    comments: 112,
    topics: ["Productivity", "AI", "Writing"],
    maker: "Ken Obara",
    day: "today",
  },
  {
    id: "fernpad",
    name: "Fernpad",
    tagline: "A notebook that grows with your project",
    description:
      "Fernpad starts as a scratchpad and gradually suggests structure: specs, decisions, open questions, all cross-linked.",
    emoji: "🌿",
    votes: 902,
    comments: 47,
    topics: ["Notes", "Productivity"],
    maker: "Iris Bell",
    day: "today",
  },
  {
    id: "tabletide",
    name: "TableTide",
    tagline: "Restaurant waitlists without the buzzer",
    description:
      "Guests scan a code, get live position updates by text, and hosts see the floor fill and clear in real time.",
    emoji: "🍽️",
    votes: 844,
    comments: 39,
    topics: ["Restaurants", "Local", "SaaS"],
    maker: "Marco Pilar",
    day: "today",
  },
  {
    id: "loomcast",
    name: "Loomcast",
    tagline: "Turn changelogs into short videos",
    description:
      "Paste release notes and Loomcast renders a 40 second narrated clip with captions, ready for social.",
    emoji: "🎬",
    votes: 781,
    comments: 63,
    topics: ["Marketing", "Video", "AI"],
    maker: "Ada Winters",
    day: "today",
  },
  {
    id: "gritledger",
    name: "GritLedger",
    tagline: "Bookkeeping for freelancers who hate it",
    description:
      "Forward receipts, connect one bank, and GritLedger keeps the books clean and quarterly taxes estimated.",
    emoji: "🧾",
    votes: 736,
    comments: 51,
    topics: ["Finance", "Freelance"],
    maker: "Yusuf Demir",
    day: "today",
  },
  {
    id: "pebblepath",
    name: "PebblePath",
    tagline: "Micro-courses built from your bookmarks",
    description:
      "PebblePath reads your saved links and assembles a five-day lesson plan so the reading list finally gets read.",
    emoji: "🪨",
    votes: 690,
    comments: 33,
    topics: ["Education", "AI"],
    maker: "Lena Fischer",
    day: "today",
  },
  {
    id: "harborcue",
    name: "HarborCue",
    tagline: "On-call handoffs that never drop context",
    description:
      "Every shift change gets an auto-written brief: open incidents, recent deploys, and who touched what.",
    emoji: "⚓",
    votes: 645,
    comments: 28,
    topics: ["DevOps", "Developer Tools"],
    maker: "Sam Whitlock",
    day: "today",
  },
  {
    id: "brightcart",
    name: "BrightCart",
    tagline: "One-page storefronts for makers",
    description:
      "Sell a single product beautifully. Payments, licenses and receipts included, no theme wrangling.",
    emoji: "🛒",
    votes: 612,
    comments: 44,
    topics: ["E-Commerce", "No-Code"],
    maker: "Priya Nadar",
    day: "yesterday",
  },
  {
    id: "quietloop",
    name: "QuietLoop",
    tagline: "Focus music tuned to your heart rate",
    description:
      "QuietLoop reads your wearable and adjusts tempo and density to keep you in a steady working rhythm.",
    emoji: "🎧",
    votes: 588,
    comments: 71,
    topics: ["Health", "Music"],
    maker: "Tobias Kern",
    day: "yesterday",
  },
  {
    id: "atlasforms",
    name: "AtlasForms",
    tagline: "Forms that ask smarter follow-ups",
    description:
      "Each answer shapes the next question, so a three-field form gathers what a twelve-field one used to.",
    emoji: "🗺️",
    votes: 551,
    comments: 25,
    topics: ["Forms", "AI", "SaaS"],
    maker: "Chloe Mensah",
    day: "yesterday",
  },
  {
    id: "sproutstack",
    name: "SproutStack",
    tagline: "Garden planning with real local data",
    description:
      "Pick your beds and SproutStack schedules sowing, thinning and harvest using your actual frost dates.",
    emoji: "🌱",
    votes: 517,
    comments: 36,
    topics: ["Home", "Gardening"],
    maker: "Hana Kimura",
    day: "yesterday",
  },
  {
    id: "cinderapi",
    name: "CinderAPI",
    tagline: "Mock any API from a single sentence",
    description:
      "Describe the endpoint you wish existed and get a live, seeded mock server with realistic data in seconds.",
    emoji: "🔥",
    votes: 483,
    comments: 42,
    topics: ["Developer Tools", "API"],
    maker: "Omar Haddad",
    day: "yesterday",
  },
  {
    id: "waypointhr",
    name: "Waypoint HR",
    tagline: "Onboarding checklists that run themselves",
    description:
      "New hire day one, week one and month one, automated across your tools with nudges to the right people.",
    emoji: "🧭",
    votes: 455,
    comments: 19,
    topics: ["HR", "SaaS"],
    maker: "Grace Okafor",
    day: "yesterday",
  },
  {
    id: "clipvault",
    name: "ClipVault",
    tagline: "A searchable memory for your clipboard",
    description:
      "Everything you copy, quietly indexed on-device, with instant recall by keyword, app or date.",
    emoji: "📋",
    votes: 421,
    comments: 30,
    topics: ["Mac", "Productivity", "Privacy"],
    maker: "Elias Braun",
    day: "yesterday",
  },
  {
    id: "roammap",
    name: "RoamMap",
    tagline: "Trip plans built from group votes",
    description:
      "Everyone drops the places they want, RoamMap builds a day-by-day route that keeps walking sane.",
    emoji: "✈️",
    votes: 398,
    comments: 27,
    topics: ["Travel", "Social"],
    maker: "Sofia Renard",
    day: "yesterday",
  },
  {
    id: "beaconqa",
    name: "BeaconQA",
    tagline: "End-to-end tests written from screen recordings",
    description:
      "Record a flow once. BeaconQA generates stable tests and keeps selectors updated when your UI shifts.",
    emoji: "🔦",
    votes: 366,
    comments: 22,
    topics: ["Testing", "Developer Tools"],
    maker: "Victor Aoki",
    day: "yesterday",
  },
  {
    id: "mossmail",
    name: "MossMail",
    tagline: "Newsletters for people with 200 readers",
    description:
      "No funnels, no scoring, no upsells. Write, send, and see who read it. That is the whole product.",
    emoji: "🍃",
    votes: 331,
    comments: 48,
    topics: ["Newsletter", "Writing"],
    maker: "Ruth Calder",
    day: "yesterday",
  },
];

export const getPost = (id: string) => posts.find((p) => p.id === id);
