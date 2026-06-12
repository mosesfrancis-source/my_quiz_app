import type { Topic } from "@/types";

export const DEFAULT_TOPICS: Topic[] = [
  {
    id: "ch1",
    chapter: "Chapter 1",
    title: "Introduction to E-Commerce",
    color: "#1F3864",
    icon: "🌐",
    summary: `E-commerce is the use of the Internet and Web to transact business. It began in 1995 and has grown to over $5 trillion in global sales. E-commerce differs from traditional commerce by enabling ubiquity (available everywhere), global reach, universal technology standards, richness of content, interactivity, information density, personalization/customization, and social technology.

Eight unique features of e-commerce technology: Ubiquity, Global Reach, Universal Standards, Richness, Interactivity, Information Density, Personalization/Customization, Social Technology.

Types of e-commerce: B2C (business to consumer), B2B (business to business), C2C (consumer to consumer), M-commerce (mobile), Social e-commerce, Local e-commerce.

Business models in e-commerce: e-tailers, transaction brokers, market creators, content providers, community providers, service providers, portals.

Key revenue models: advertising, subscription, transaction fee, sales, affiliate.

E-commerce requires: a value proposition, a revenue model, a market opportunity, a competitive environment, a competitive advantage, a market strategy, organizational development, and management.

Nike.com is an example of a B2C e-commerce site with features including personalization, product customization, rich media, a loyalty program, social integration, mobile optimization, live chat, and AR try-on tools.`,
  },
  {
    id: "ch2",
    chapter: "Chapter 2",
    title: "E-Commerce Business Models & Concepts",
    color: "#1C7293",
    icon: "💼",
    summary: `A business model is a set of planned activities designed to result in a profit in a marketplace. An e-commerce business model uses the unique qualities of the Internet and Web.

Eight key elements of a business model: value proposition, revenue model, market opportunity, competitive environment, competitive advantage, market strategy, organizational development, management team.

Value proposition: Why should a customer buy from you instead of competitors? E.g., Amazon offers convenience, selection, and price.

Revenue models: Advertising (Google), Subscription (Netflix), Transaction fee (eBay), Sales (Amazon), Affiliate (blogs with product links).

Major B2C business models: Portal (Yahoo), E-tailer (Amazon), Content provider (NYT), Transaction broker (E*Trade), Market creator (eBay), Service provider (Google), Community provider (Facebook).

Major B2B business models: E-distributor, E-procurement, Exchange, Industry consortium, Private industrial network.

Airbnb is an example of a market creator / sharing economy platform connecting hosts and guests. Key features: peer reviews, secure payments, host dashboard, messaging, dynamic pricing, and experience offerings.

The sharing economy (also called collaborative consumption) leverages excess capacity of assets. Examples: Airbnb (lodging), Uber (transportation), TaskRabbit (services).

Social e-commerce uses social networks and online social relationships to sell products. F-commerce (Facebook commerce) and social shopping are examples.`,
  },
  {
    id: "ch3",
    chapter: "Chapter 3",
    title: "Internet & Web Technology",
    color: "#065A82",
    icon: "🔌",
    summary: `The Internet is a worldwide network of computer networks using TCP/IP protocols. The Web is a subset of the Internet — a system of globally linked hypertext documents.

Key Internet protocols: TCP/IP (Transmission Control Protocol/Internet Protocol) breaks data into packets. HTTP (HyperText Transfer Protocol) is the communications protocol for the Web. HTTPS adds TLS encryption.

Internet infrastructure tiers: Tier 1 backbone networks (AT&T, Verizon), Tier 2 regional ISPs, Tier 3 local ISPs. NAPs (Network Access Points) and IXPs (Internet Exchange Points) connect these tiers.

Cloud computing: delivering computing services (servers, storage, databases, software) over the Internet. Types: IaaS (Infrastructure), PaaS (Platform), SaaS (Software).

CDNs (Content Delivery Networks): distributed servers that deliver web content from locations closer to the user. Akamai is the largest CDN, handling 15-30% of global Internet traffic. Edge computing moves processing closer to the data source.

LEO satellites (Low Earth Orbit): Starlink by SpaceX provides broadband Internet from a constellation of satellites at ~550km altitude, offering low latency (~20ms) and speeds of 100-200 Mbps. Serves rural and underserved areas.

Web standards: HTML5 for content structure, CSS3 for presentation, JavaScript for interactivity. Mobile-first design, responsive web design adapt to screen sizes.

Internet2: high-speed research network connecting universities and research institutions at 100 Gbps.`,
  },
  {
    id: "ch4",
    chapter: "Chapter 4",
    title: "Building an E-Commerce Presence",
    color: "#2C5F2D",
    icon: "🏗️",
    summary: `Building an e-commerce presence requires: a website, a mobile presence, and social media presence.

System architecture options: co-location (rent space in data center), shared hosting, dedicated hosting, cloud hosting (most flexible and scalable).

Website development approaches: build in-house, outsource to agency, use platforms like Shopify or WooCommerce, or use a SaaS e-commerce solution.

Key website design features: ease of use, performance (load speed under 2 seconds), reliability (99.9% uptime), security, and functionality.

Mobile presence: responsive design adapts to screen size. Native apps offer better performance but require separate development for iOS and Android. Progressive Web Apps (PWAs) combine benefits of both.

The systems development life cycle (SDLC) for e-commerce: systems analysis/planning → systems design → building the system → testing → implementation.

Performance metrics: page load time, bounce rate, conversion rate, average order value, customer acquisition cost, customer lifetime value.

Meter (smart utility) case: IoT-enabled smart meters collect real-time data, enabling dynamic pricing and remote monitoring for utilities. Demonstrates IoT applications in e-commerce infrastructure.

Key design principles: functionality, information design, visual design, social design. The homepage must communicate value proposition in under 3 seconds.`,
  },
  {
    id: "ch5",
    chapter: "Chapter 5",
    title: "E-Commerce Security & Payment Systems",
    color: "#8B1A1A",
    icon: "🔒",
    summary: `E-commerce security has six dimensions: Integrity, Nonrepudiation, Authenticity, Confidentiality, Privacy, Availability.

Global cybercrime costs exceeded $1 trillion in 2020, projected to reach $11 trillion by 2025. Average data breach cost: $4.2M globally, $9M in the U.S.

Major threats: malicious code (viruses, worms, ransomware like WannaCry, Trojans like Zeus/Emotet), phishing (BEC, spear phishing), data breaches (1,862 in 2021, +68%), DDoS attacks (3.45 Tbps record by Microsoft Azure 2021), SQL injection (55%+ of web attacks), identity fraud ($24B losses, 15M victims), insider attacks ($15.4M avg annual cost), zero-day vulnerabilities, IoT threats (Mirai botnet used 500,000+ devices), cryptojacking (+300% in 2021).

Technology solutions: AES encryption (128/192/256-bit), public key cryptography (public + private key pair), digital signatures (hash + private key), PKI and digital certificates from CAs, TLS 1.3 / HTTPS, VPNs, firewalls (packet filtering, application gateways, next-gen), proxy servers, IDS (detection) vs IPS (detection + prevention), anti-virus software.

Security plan: 5 steps — Risk Assessment → Security Policy → Implementation Plan → Security Organization → Security Audit. Zero Trust (ZT) framework: never trust, always verify.

Payment systems: Online credit card (CNP/MOTO transactions, 5 parties, PCI-DSS compliance, ~3% fees), PayPal (200+ countries), BNPL grew $6.5B→$75B+ (2019-2022), Mobile wallets (NFC: Apple Pay/Google Pay; QR: Walmart Pay/Starbucks Pay; P2P: Venmo/Zelle). Blockchain: distributed P2P ledger, smart contracts, Bitcoin, stablecoins.

SolarWinds hack: supply chain attack via SUNBURST backdoor in Orion update. Digitally signed by SolarWinds. 18,000 clients infected. Undetected 6-9 months. Attributed to Russia. 250+ organizations breached including Treasury, Pentagon, Cisco, Microsoft. Discovered by FireEye. Einstein intrusion system failed because threat arrived via trusted software update.`,
  },
];

export const TOPIC_COLORS = [
  "#1F3864", "#1C7293", "#065A82", "#2C5F2D",
  "#8B1A1A", "#5B4E8C", "#B45309", "#065A82",
];
