export const IMAGES = {
  founderOne: "/src/assets/images/founder_portrait_one_1794849798297.jpg",
  founderTwo: "/src/assets/images/founder_portrait_two_1794849798818.jpg",
  fintechSuite: "/src/assets/images/fintech_analytics_suite_1794849798882.jpg",
  softwareStudio: "/src/assets/images/software_studio_workspace_1794849799446.jpg",
  cloudDatacenter: "/src/assets/images/cloud_network_datacenter_1794849800882.jpg",
  trainingWorkshop: "/src/assets/images/tech_training_workshop_1794849800507.jpg",
  aiHealthcare: "/src/assets/images/ai_vision_healthcare_1794849800648.jpg",
} as const;

export const WHATSAPP_NUMBER = "250792752832";
export const WHATSAPP_PAYMENT_NUMBER = "250792752832";
export const WHATSAPP_PAYMENT_DISPLAY = "0792752832";
export const STUDIO_PHONE_DISPLAY = "+250 792 752 832";
export const STUDIO_PHONE_TEL = "tel:+250792752832";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppPaymentUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PAYMENT_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface PartnerOrg {
  id: string;
  name: string;
  sector: string;
  monogram: string;
}

export const PARTNER_ORGS: PartnerOrg[] = [
  { id: "techstart", name: "TechStart Rwanda", sector: "Venture Studio", monogram: "TS" },
  { id: "dione", name: "Dione Coaching Center", sector: "Education", monogram: "DC" },
  { id: "kigali-hub", name: "Kigali Innovation Hub", sector: "Incubator", monogram: "KI" },
  { id: "ict-chamber", name: "Rwanda ICT Chamber", sector: "Industry Guild", monogram: "IC" },
  { id: "ur", name: "University of Rwanda", sector: "Research Partner", monogram: "UR" },
  { id: "bnr", name: "National Bank Network", sector: "Financial Tech", monogram: "NB" },
];

export const TECHNICAL_SKILLS = [
  { name: "JavaScript / TypeScript", level: 90, color: "#2563EB" },
  { name: "React & Vite", level: 85, color: "#0284C7" },
  { name: "PHP & Laravel", level: 80, color: "#1D4ED8" },
  { name: "IT Support & Troubleshooting", level: 95, color: "#2563EB" },
  { name: "System Architecture", level: 75, color: "#0F172A" },
];

export const IMPACT_METRICS = [
  { value: "50+", label: "Clients Served", key: "clients" as const },
  { value: "100+", label: "Students Trained", key: "students" as const },
  { value: "30+", label: "Projects Delivered", key: "projects" as const },
  { value: "5+", label: "Years Experience", key: "years" as const },
];

export const CREDENTIALS = [
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2025", icon: "cloud" as const },
  { name: "CompTIA A+", issuer: "CompTIA", year: "2024", icon: "wrench" as const },
  { name: "Laravel Certification", issuer: "Laravel", year: "2023", icon: "code" as const },
  { name: "Google IT Support", issuer: "Google", year: "2022", icon: "monitor" as const },
];

export type ServiceCategory = "Development" | "Consulting" | "Infrastructure";

export const SERVICES = [
  {
    id: 1,
    code: "01",
    category: "Development" as ServiceCategory,
    icon: "code" as const,
    title: "Software Development",
    description: "Custom, scalable digital products built with modern frameworks.",
    items: ["Web Applications", "Mobile Solutions", "Custom APIs"],
  },
  {
    id: 2,
    code: "02",
    category: "Development" as ServiceCategory,
    icon: "server" as const,
    title: "Enterprise Systems & APIs",
    description: "Multi-tenant platforms, payment gateways, and legacy integrations engineered for high uptime.",
    items: ["Payment Bridges (MoMo/Stripe)", "Multi-Tenant SaaS", "ERP Workflows"],
  },
  {
    id: 3,
    code: "03",
    category: "Consulting" as ServiceCategory,
    icon: "cog" as const,
    title: "Digital Consulting",
    description: "Strategic roadmap for your organization's digital transformation.",
    items: ["Cloud Strategy", "Workflow Automation", "Tech Audits"],
  },
  {
    id: 4,
    code: "04",
    category: "Consulting" as ServiceCategory,
    icon: "graduation" as const,
    title: "Tech Training & Mentorship",
    description: "Empowering teams and cohorts with practical full-stack and IT engineering fluency.",
    items: ["Full-Stack Cohorts", "Corporate Upskilling", "Curriculum Advisory"],
  },
  {
    id: 5,
    code: "05",
    category: "Infrastructure" as ServiceCategory,
    icon: "laptop" as const,
    title: "Professional IT Support",
    description: "Reliable hardware and software maintenance for your business.",
    items: ["Network Security", "Hardware Repair", "System Recovery"],
  },
  {
    id: 6,
    code: "06",
    category: "Infrastructure" as ServiceCategory,
    icon: "cloud" as const,
    title: "Cloud & DevOps Operations",
    description: "Resilient server provisioning, automated backups, and continuous uptime monitoring.",
    items: ["AWS & Docker Hosting", "Automated Off-Site Backups", "Security Hardening"],
  },
];

export const PROCESS_STEPS = [
  { step: "01", title: "Consult", desc: "Analyzing your operational goals and technical bottlenecks." },
  { step: "02", title: "Plan", desc: "Architecting the system blueprint, milestones, and stack." },
  { step: "03", title: "Execute", desc: "Engineering clean, tested software and resilient infrastructure." },
  { step: "04", title: "Support", desc: "Continuous monitoring, training, and iterative growth." },
];

export const COURSES = [
  {
    id: 0,
    title: "Web Development",
    duration: "8 Weeks",
    projects: "5+ Real Projects",
    difficulty: "Beginner",
    icon: "code" as const,
    topics: ["UI/UX", "React", "Git", "REST API"],
    desc: "Master the craft of building responsive, production-ready web applications from the ground up.",
  },
  {
    id: 1,
    title: "Advanced Laravel",
    duration: "6 Weeks",
    projects: "SaaS Platform",
    difficulty: "Intermediate",
    icon: "layers" as const,
    topics: ["Auth", "Database", "Scaling", "Cloud"],
    desc: "Deep dive into enterprise-grade backend architecture, queues, and scalable PHP systems.",
  },
  {
    id: 2,
    title: "IT Support",
    duration: "4 Weeks",
    projects: "Lab Simulation",
    difficulty: "Beginner",
    icon: "shield" as const,
    topics: ["Networking", "Hardware", "Security", "OS"],
    desc: "The foundation of technical operations. Master networking, hardware diagnostics, and endpoint security.",
  },
];

export const STUDENT_STORIES = [
  {
    name: "fabu001",
    role: "L4SWD Student Coordinator",
    company: "EAV Kivumu TSS",
    text: "At Kivumu TSS, our full-stack coding and system setups scaled in real time. The Level 4 Software Development cohort builds production-grade systems.",
  },
  {
    name: "Aline Marie",
    role: "IT Specialist",
    company: "Global Connect",
    text: "The hardware labs were hands-on from day one. I gained the confidence to manage network security and workstation health for an entire office.",
  },
  {
    name: "Samuel K.",
    role: "Backend Engineer",
    company: "Fintech Solutions",
    text: "The Laravel cohort bridges the gap between basic syntax and real software architecture. I shipped my first multi-tenant API two weeks after graduating.",
  },
];

export interface ProjectItem {
  id: number;
  category: "Web App" | "System" | "Fintech" | "AI" | "IT Tool";
  title: string;
  description: string;
  tech: string[];
  image: string;
  image2: string;
  details: string;
  outcome: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    category: "Web App",
    title: "E-Commerce Dashboard",
    description: "Advanced admin panel for product inventory, order processing, and sales analytics.",
    tech: ["React", "Chart.js", "Node.js", "Tailwind"],
    image: IMAGES.fintechSuite,
    image2: IMAGES.softwareStudio,
    details: "Built with React and integrated with Stripe and Mobile Money for payment reconciliation. Features role-based access and real-time order telemetry.",
    outcome: "Reduced order fulfillment reconciliation time by 62% across 14 retail outlets.",
  },
  {
    id: 2,
    category: "System",
    title: "School Management",
    description: "Comprehensive digital infrastructure for student records, attendance, and grading.",
    tech: ["Laravel", "MySQL", "Tailwind"],
    image: IMAGES.trainingWorkshop,
    image2: IMAGES.softwareStudio,
    details: "Deployed for a secondary school in Kigali. Includes automated term report generation, fee tracking, and secure parent-teacher portals.",
    outcome: "Digitized 1,400+ student records with zero report-card turnaround delays.",
  },
  {
    id: 3,
    category: "Fintech",
    title: "Payment Gateway API",
    description: "Secure transaction processing engine for local and international payment methods.",
    tech: ["Node.js", "Redis", "PostgreSQL"],
    image: IMAGES.fintechSuite,
    image2: IMAGES.cloudDatacenter,
    details: "Built to handle high-concurrency transactions with idempotency keys, webhook verification, and automated ledger reconciliation.",
    outcome: "Sustains 99.98% uptime across MTN MoMo, Airtel Money, and card rails.",
  },
  {
    id: 4,
    category: "AI",
    title: "Customer Sentiment Bot",
    description: "AI-driven tool for analyzing customer reviews and support tickets in real time.",
    tech: ["Python", "TensorFlow", "FastAPI"],
    image: IMAGES.aiHealthcare,
    image2: IMAGES.softwareStudio,
    details: "Uses Natural Language Processing to categorize customer intent and urgency, helping support teams prioritize critical escalations.",
    outcome: "Cut average first-response ticket triage time from 45 minutes to 4 minutes.",
  },
  {
    id: 5,
    category: "IT Tool",
    title: "Network Monitor Pro",
    description: "System utility for monitoring server uptime, latency, and resource allocation.",
    tech: ["Python", "Docker", "Grafana"],
    image: IMAGES.cloudDatacenter,
    image2: IMAGES.fintechSuite,
    details: "Built for continuous infrastructure health checks. Dispatches instant alerts via Telegram and email whenever latency thresholds spike.",
    outcome: "Monitors 40+ edge servers with sub-30-second incident alerting.",
  },
  {
    id: 6,
    category: "System",
    title: "Smart Warehouse ERP",
    description: "Inventory tracking system with QR code integration and automated restock alerts.",
    tech: ["PHP", "MySQL", "JavaScript"],
    image: IMAGES.softwareStudio,
    image2: IMAGES.cloudDatacenter,
    details: "Optimized for regional logistics teams. Tracks batch intake, bin transfers, and dispatch manifests with barcode verification.",
    outcome: "Achieved 99.9% stock-count accuracy across 3 regional depots.",
  },
  {
    id: 7,
    category: "Web App",
    title: "HealthCare Portal",
    description: "Telemedicine platform connecting patients with specialists for remote consultations.",
    tech: ["Next.js", "WebRTC", "Firebase"],
    image: IMAGES.aiHealthcare,
    image2: IMAGES.trainingWorkshop,
    details: "Features end-to-end encrypted video consultations, appointment scheduling, and an integrated digital prescription ledger.",
    outcome: "Facilitated 2,800+ remote specialist consultations in its first year.",
  },
  {
    id: 8,
    category: "AI",
    title: "Auto-Crop Vision Tool",
    description: "Machine learning tool for automatic image processing and background removal.",
    tech: ["Python", "OpenCV", "PyTorch"],
    image: IMAGES.aiHealthcare,
    image2: IMAGES.fintechSuite,
    details: "Designed for studio photographers and e-commerce merchants to batch-process catalog imagery with consistent framing.",
    outcome: "Processes 1,000+ catalog photos per batch in under 3 minutes.",
  },
  {
    id: 9,
    category: "Fintech",
    title: "Crypto Portfolio Tracker",
    description: "Live dashboard for tracking multi-chain assets and historical performance data.",
    tech: ["React", "Web3.js", "REST API"],
    image: IMAGES.fintechSuite,
    image2: IMAGES.cloudDatacenter,
    details: "Provides live price feeds, allocation breakdowns, and realized/unrealized profit-loss calculations across wallets.",
    outcome: "Tracks 5,000+ digital assets with sub-second chart updates.",
  },
  {
    id: 10,
    category: "IT Tool",
    title: "Security Audit Script",
    description: "Automated utility for scanning server vulnerabilities and outdated dependencies.",
    tech: ["Bash", "Nmap", "Go"],
    image: IMAGES.cloudDatacenter,
    image2: IMAGES.softwareStudio,
    details: "Designed for systems administrators to run scheduled port, TLS, and package audits and export structured compliance PDFs.",
    outcome: "Standardized monthly hardening checks across 25 client networks.",
  },
  {
    id: 11,
    category: "Web App",
    title: "Booking Engine",
    description: "Centralized reservation system for hotels, car rentals, and curated tour packages.",
    tech: ["Laravel", "Vue.js", "PostgreSQL"],
    image: IMAGES.softwareStudio,
    image2: IMAGES.fintechSuite,
    details: "Synchronizes room and fleet availability calendars in real time with instant mobile money and card checkout.",
    outcome: "Increased direct online bookings by 48% for hospitality partners.",
  },
  {
    id: 12,
    category: "System",
    title: "Church Management",
    description: "Administration platform for memberships, contributions, and event scheduling.",
    tech: ["React", "Supabase", "Tailwind"],
    image: IMAGES.trainingWorkshop,
    image2: IMAGES.founderTwo,
    details: "Streamlines congregation directories, transparent contribution receipts, and automated SMS event reminders.",
    outcome: "Adopted by 6 community parishes serving 3,200+ active members.",
  },
  {
    id: 13,
    category: "System",
    title: "fabu001 DevHub • Kivumu TSS",
    description: "Real-time workstation and education gateway built for EAV Kivumu TSS L4SWD cohort.",
    tech: ["React", "TypeScript", "Tailwind", "Git"],
    image: IMAGES.trainingWorkshop,
    image2: IMAGES.founderOne,
    details: "Co-developed and designed by fabu001 representing Level 4 Software Development (L4SWD) at EAV Kivumu Technical Secondary School (TSS).",
    outcome: "Active daily hub for 60+ software development students and instructors.",
  },
];

export const PROJECT_CATEGORIES = ["All", "Web App", "System", "Fintech", "AI", "IT Tool"] as const;

export interface TutorialItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: "Onboarding" | "Projects" | "Billing" | "Training" | "Delivery" | "Shop";
  thumbnail: string;
  chapters: string[];
}

export const TUTORIALS: TutorialItem[] = [
  {
    id: 1,
    title: "Getting Started with Your Client Dashboard",
    description: "Learn how to navigate your dashboard, view invoices, track project progress, and message your engineering team.",
    duration: "4:32",
    category: "Onboarding",
    thumbnail: IMAGES.fintechSuite,
    chapters: ["Workspace overview & milestones", "Reviewing live staging previews", "Direct messaging & feedback"],
  },
  {
    id: 2,
    title: "How to Submit a Project Requirement Brief",
    description: "A step-by-step guide on structuring goals, user roles, and timelines so our team ships exactly what you need.",
    duration: "3:15",
    category: "Projects",
    thumbnail: IMAGES.softwareStudio,
    chapters: ["Defining core user workflows", "Attaching brand assets & specs", "Setting realistic launch dates"],
  },
  {
    id: 3,
    title: "Understanding Your Service Invoice & Payments",
    description: "Everything you need to know about milestone billing cycles, Mobile Money / card settlement, and receipts.",
    duration: "5:00",
    category: "Billing",
    thumbnail: IMAGES.founderTwo,
    chapters: ["Milestone payment schedule", "MTN MoMo, Airtel & bank transfers", "Downloading tax-ready receipts"],
  },
  {
    id: 4,
    title: "How to Enroll in a Training Cohort",
    description: "Follow this walkthrough to compare tracks, verify prerequisites, and reserve your seat in the next cohort.",
    duration: "2:48",
    category: "Training",
    thumbnail: IMAGES.trainingWorkshop,
    chapters: ["Choosing Beginner vs Intermediate", "In-person Nyange vs remote live", "Pre-cohort environment setup"],
  },
  {
    id: 5,
    title: "Project Handoff: What to Expect",
    description: "A complete overview of our QA checklist, repository transfer, documentation, and post-launch support.",
    duration: "6:10",
    category: "Delivery",
    thumbnail: IMAGES.cloudDatacenter,
    chapters: ["Final security & load audit", "Source code & domain transfer", "30-day warranty & support SLA"],
  },
  {
    id: 6,
    title: "Using the Shop & Digital Products Portal",
    description: "Learn how to license UI starter kits, automation scripts, and reserve workshop seats directly.",
    duration: "3:45",
    category: "Shop",
    thumbnail: IMAGES.aiHealthcare,
    chapters: ["Selecting a commercial license", "Instant repository & ZIP access", "Team seat upgrades"],
  },
];

export const TUTORIAL_CATEGORIES = ["All", "Onboarding", "Projects", "Billing", "Training", "Delivery", "Shop"] as const;

export interface ExperienceMilestone {
  id: number;
  type: "work" | "education";
  year: string;
  period: string;
  title: string;
  org: string;
  location: string;
  desc: string;
  extendedDetails: string;
  highlights: string[];
  relatedProjects: string[];
  stack: string[];
}

export const EXPERIENCE_TIMELINE: ExperienceMilestone[] = [
  {
    id: 1,
    type: "work",
    year: "2021",
    period: "2021 — Present",
    title: "Founder & Lead Engineer",
    org: "fabu001 Studio",
    location: "Nyange & Kigali, Rwanda",
    desc: "Leading an independent software studio delivering custom web apps, IT infrastructure, and technical training.",
    extendedDetails:
      "Founded fabu001 Studio to bridge disciplined software engineering and practical technical mentorship across Rwanda. Architected production web systems, automated mobile-money billing pipelines, and enterprise management portals backed by clear SLA retainers.",
    highlights: [
      "Shipped 30+ custom software platforms, ERPs, and institutional portals",
      "Built MTN MoMo & Airtel Money automated payment reconciliation engines",
      "Trained 100+ students and corporate staff in modern full-stack engineering",
    ],
    relatedProjects: ["Payment Gateway API", "E-Commerce Dashboard", "Smart Warehouse ERP"],
    stack: ["React", "TypeScript", "Laravel", "PostgreSQL", "Docker"],
  },
  {
    id: 2,
    type: "work",
    year: "2023",
    period: "2023 — 2024",
    title: "IT Support Specialist",
    org: "Dione Coaching Center",
    location: "Nyange, Rwanda",
    desc: "Managed local area networking, workstation maintenance, and hardware diagnostics for a multi-room center.",
    extendedDetails:
      "Directed daily IT operations across multi-room training labs. Standardized workstation OS imaging, router traffic segmentation, and preventative hardware checks to eliminate downtime during live classes and assessments.",
    highlights: [
      "Sustained 99.5% network and workstation availability across training rooms",
      "Deployed segmented staff & student VLANs with endpoint protection",
      "Authored structured hardware troubleshooting runbooks for rapid recovery",
    ],
    relatedProjects: ["Campus LAN Segmentation", "Workstation Imaging Pipeline"],
    stack: ["Linux", "Windows Server", "TCP/IP & VLANs", "CompTIA A+"],
  },
  {
    id: 3,
    type: "education",
    year: "2024",
    period: "2024 — Present",
    title: "Level 4 Software Development",
    org: "EAV Kivumu TSS",
    location: "Kivumu, Rwanda",
    desc: "Advanced technical track covering web engineering, database systems, UI/UX, and collaborative Git.",
    extendedDetails:
      "Pursuing applied Level 4 Software Development (L4SWD) studies at EAV Kivumu Technical Secondary School. Focused on translating software fundamentals directly into real-world client systems, relational database architecture, and team Git workflows.",
    highlights: [
      "Co-designed and built the fabu001 DevHub student education gateway",
      "Engineered normalized MySQL & PostgreSQL schemas for school systems",
      "Practiced collaborative PR reviews, testing, and accessible UI engineering",
    ],
    relatedProjects: ["fabu001 DevHub • Kivumu TSS", "School Management"],
    stack: ["TypeScript", "PHP / Laravel", "MySQL", "Tailwind CSS", "Git"],
  },
  {
    id: 4,
    type: "work",
    year: "2024+",
    period: "2024 — Present",
    title: "Software Development Instructor",
    org: "EAV Kivumu TSS (L4SWD)",
    location: "Kivumu, Rwanda",
    desc: "Mentoring Level 4 Software Development students in full-stack engineering and production deployment.",
    extendedDetails:
      "Serving as L4SWD student coordinator and practical engineering mentor. Guiding cohorts from core web fundamentals to React component architecture, backend authentication, and deploying capstone systems used by schools and local businesses.",
    highlights: [
      "Mentored 60+ software development students across live team capstones",
      "Led weekly code reviews covering clean TypeScript and SQL security",
      "Facilitated hands-on hardware simulation and cloud deployment labs",
    ],
    relatedProjects: ["Full-Stack Cohort Curriculum", "Capstone Evaluation Labs"],
    stack: ["React", "Node.js", "REST APIs", "Git Workflows"],
  },
  {
    id: 5,
    type: "education",
    year: "2025",
    period: "2025",
    title: "AWS Cloud Practitioner",
    org: "Amazon Web Services",
    location: "Cloud Certification",
    desc: "Certified in cloud architecture fundamentals, IAM security best practices, and cost optimization.",
    extendedDetails:
      "Earned official Amazon Web Services certification validating cloud architectural patterns, least-privilege IAM governance, automated off-site backup durability, and cost-effective deployment strategies for regional startups.",
    highlights: [
      "Implemented least-privilege IAM roles and encrypted S3 off-site backups",
      "Containerized full-stack deployments using Docker and cloud pipelines",
      "Optimized compute sizing and caching to lower client hosting overhead",
    ],
    relatedProjects: ["Network Monitor Pro", "Security Audit Script"],
    stack: ["AWS IAM & S3", "Docker", "VPC", "CloudWatch"],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Jean Claude",
    role: "Co-Founder, TechStart Rwanda",
    quote: "fabu001 is exceptional at both architecting reliable production systems and mentoring the next generation of engineers.",
    initials: "JC",
  },
  {
    id: 2,
    name: "Aline Mukamana",
    role: "Director, Dione Coaching Center",
    quote: "Their technical support is swift, structured, and dependable. Every network upgrade and workstation rollout ran without downtime.",
    initials: "AM",
  },
  {
    id: 3,
    name: "Peter Habimana",
    role: "CTO, Kigali Innovation Hub",
    quote: "We collaborated on multiple fintech integrations and payment gateways. Clean code, clear documentation, and zero shortcuts.",
    initials: "PH",
  },
  {
    id: 4,
    name: "Divine M.",
    role: "Product Owner, Urwibutso Digital",
    quote: "A dependable software partner. Delivered our retail e-commerce platform on schedule with strong performance under peak traffic.",
    initials: "DM",
  },
];

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  date: string;
  category: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable Web Apps with Laravel & React",
    excerpt: "A practical guide to pairing Laravel's expressive backend APIs with a fast React and TypeScript frontend.",
    body: [
      "Modern business platforms require both rapid feature iteration and rock-solid data integrity. Pairing Laravel as a structured REST API with a React and TypeScript frontend gives product engineering teams clear separation of concerns while keeping release velocity high.",
      "Begin every build by locking down explicit API contracts early. In Laravel, dedicate dedicated Form Request classes for strict payload validation and use typed API Resource transformers so the JSON shape consumed by React never drifts silently between sprints. Pair these with generated TypeScript interfaces on the frontend so mismatched property names are caught at compile time rather than in production.",
      "Authentication and session boundaries deserve special attention when an SPA talks to a separate backend tier. Configure Laravel Sanctum with stateful first-party cookies or scoped bearer tokens paired with explicit CORS origins, rate limiting on authentication routes, and role-based policy checks enforced on every controller action.",
      "On the database layer, design your indexes alongside your migrations instead of treating query performance as an afterthought. Identify high-frequency filters—such as tenant IDs, invoice statuses, and creation timestamps—early, and rely on eager loading to eliminate N+1 query cascades before traffic grows.",
      "Finally, move heavy work off the HTTP request cycle. Dispatch invoice PDF generation, bulk spreadsheet exports, webhook retries, and SMS or email alerts through Laravel queues managed by Supervisor or containerized workers. Combined with automated zero-downtime deployments, error telemetry, and scheduled backups, this stack scales cleanly from a first client pilot to thousands of daily active users.",
    ],
    author: "fabu001",
    date: "Mar 15, 2026",
    category: "Development",
    image: IMAGES.softwareStudio,
  },
  {
    id: 2,
    title: "Getting Started with IT Support: A Beginner's Roadmap",
    excerpt: "Essential troubleshooting habits, networking fundamentals, and certifications to launch an IT career.",
    body: [
      "Great IT support starts with systematic diagnosis rather than guesswork. Whenever a workstation drops offline or an application fails to launch, train yourself to isolate whether the root cause lives at the physical layer, the local network, the operating system, or the application itself. Checking physical cabling, link lights, and IP assignment takes thirty seconds and eliminates half of all false escalations.",
      "Invest early in understanding core networking protocols—specifically TCP/IP addressing, subnet masks, DNS resolution, and DHCP lease behavior. Pair that conceptual foundation with practical Linux and Windows command-line fluency using tools like ping, traceroute, nslookup, netstat, and system event logs.",
      "Pair hands-on hardware lab practice with recognized industry credentials such as CompTIA A+ and the Google IT Support certificate. Rebuilding laptops, imaging drives, configuring office routers, and setting up endpoint antivirus policies in a real lab environment builds the muscle memory employers trust.",
      "Above all, document every recurring incident and fix in a shared team runbook—turning yesterday's emergency troubleshooting session into tomorrow's two-minute resolution.",
    ],
    author: "fabu001",
    date: "Feb 28, 2026",
    category: "IT Support",
    image: IMAGES.cloudDatacenter,
  },
  {
    id: 3,
    title: "Why Digital Literacy Matters for Rwandan Businesses",
    excerpt: "How structured digital workflows drive measurable efficiency and customer trust for growing enterprises.",
    body: [
      "Across Rwanda, small and mid-sized enterprises are moving steadily from paper ledgers and fragmented spreadsheets to integrated point-of-sale, inventory, and cloud accounting tools. That operational shift saves hours every week, prevents stock shrinkage, and makes monthly financial reconciliation straightforward.",
      "Yet technology alone never transforms a business unless staff feel confident operating it every day. Practical, hands-on team training ensures software adoption sticks long after launch week, replacing hesitation with repeatable habits for customer intake, receipt generation, and digital record keeping.",
      "When teams master digital invoicing, cloud backups, collaborative documents, and customer CRM workflows, business owners gain immediate visibility into margins, receivables, and service quality.",
    ],
    author: "fabu001",
    date: "Jan 10, 2026",
    category: "Digital",
    image: IMAGES.trainingWorkshop,
  },
  {
    id: 4,
    title: "Top 10 Cybersecurity Practices for Small Businesses",
    excerpt: "Practical, affordable security controls every founder and office administrator should enforce today.",
    body: [
      "Most real-world security incidents at growing companies stem from unpatched software, reused credentials, overly permissive staff accounts, or missing multi-factor authentication—rarely from exotic zero-day exploits. Fortunately, strong baseline hygiene costs almost nothing to put in place when structured methodically.",
      "First, enforce a team password manager and hardware-backed or authenticator-app multi-factor authentication across every administrative dashboard, domain registrar, email host, and cloud billing portal. Eliminate shared logins so every action maps cleanly to an individual account.",
      "Second, follow the principle of least privilege. Grant staff only the system permissions required for their daily role, and revoke access promptly when contractors finish an engagement or employees change teams.",
      "Third, automate operating system, browser, router firmware, and dependency updates across every office workstation and production server. Unpatched content management plugins and outdated server packages remain one of the fastest paths to ransomware.",
      "Fourth, adopt the 3-2-1 backup discipline: keep three copies of critical databases and documents on two different media types, with at least one encrypted copy stored off-site and tested with quarterly restore drills. A backup you have never restored is an assumption, not a safeguard.",
      "Fifth, segment your office network by isolating guest Wi-Fi, printers, and personal phones onto a separate VLAN away from finance workstations and local servers. Enable full-disk encryption (FileVault or BitLocker) on every company laptop so a lost or stolen device never exposes client data.",
      "Finally, run quarterly phishing awareness check-ins, configure SPF, DKIM, and DMARC records on your business email domain to prevent impersonation, and maintain a concise one-page incident response checklist so everyone knows who to call and which tokens to rotate within the first fifteen minutes of a suspected breach.",
    ],
    author: "fabu001",
    date: "Dec 5, 2025",
    category: "Security",
    image: IMAGES.cloudDatacenter,
  },
  {
    id: 5,
    title: "How to Choose the Right Tech Stack for Your Startup",
    excerpt: "Balancing delivery speed, hosting costs, scalability, and local engineering talent for new ventures.",
    body: [
      "The best technology stack for a startup is rarely the newest framework trending on social media—it is the stack your team can build, debug, hire for, and maintain reliably over the next three years without rewriting core infrastructure twice.",
      "Evaluate every choice against four practical criteria: local hiring availability, ecosystem maturity, predictable hosting overhead, and long-term upgrade paths. For the majority of B2B SaaS tools, marketplaces, and internal portals, TypeScript with React paired with a disciplined backend in Laravel or Node.js and a relational SQL database like PostgreSQL or MySQL covers ninety-five percent of product requirements cleanly.",
      "Resist premature microservice sprawl in your first year. A well-modularized monolith with clear domain boundaries ships faster, keeps deployment costs low, eliminates distributed tracing headaches, and can still extract background workers or payment microservices whenever real traffic metrics justify the added complexity.",
      "Before writing production features, instrument centralized error logging, automated test suites around critical financial or auth flows, and clean environment configuration so onboarding a second engineer takes an afternoon instead of a week.",
    ],
    author: "fabu001",
    date: "Nov 18, 2025",
    category: "Development",
    image: IMAGES.founderOne,
  },
  {
    id: 6,
    title: "The Future of Fintech in Rwanda: Opportunities & Trends",
    excerpt: "How mobile money APIs, instant settlement, and digital lending are reshaping everyday commerce.",
    body: [
      "Rwanda's mobile-first financial ecosystem has transformed seamless digital checkout, utility settlement, and instant disbursements from nice-to-have extras into baseline customer expectations for modern software products.",
      "Forward-thinking merchants and institutions that unify MTN MoMo, Airtel Money, and card payment rails inside a single auditable ledger eliminate hours of manual SMS reconciliation and reduce settlement errors dramatically. When webhook signatures, idempotency keys, and automated ledger entries are engineered properly from day one, finance teams close daily books in minutes rather than days.",
      "Beyond consumer checkout, the next major wave of innovation sits inside specialized B2B infrastructure: connecting agricultural cooperatives, regional logistics fleets, private schools, and clinics directly to automated recurring billing, verified supplier payouts, and transparent cash-flow analytics.",
      "As open banking standards and cross-border East African settlement corridors mature, software studios that combine disciplined compliance, resilient API architecture, and local user-experience nuance will define the region's next generation of trusted digital commerce.",
    ],
    author: "fabu001",
    date: "Oct 22, 2025",
    category: "Fintech",
    image: IMAGES.fintechSuite,
  },
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "Custom",
    cadence: "per project",
    desc: "Ideal for small businesses and startups launching a credible, fast web presence.",
    features: [
      "Responsive Website (up to 5 pages)",
      "Technical SEO Setup",
      "Contact Form & WhatsApp Routing",
      "1 Month Post-Launch Support",
      "Domain & Hosting Setup",
    ],
    popular: false,
    action: "Request Starter Quote",
  },
  {
    name: "Business",
    price: "Custom",
    cadence: "per project",
    desc: "For growing companies needing a custom web platform with dashboards and payment rails.",
    features: [
      "Custom Web Application",
      "Role-Based Admin Dashboard",
      "Database Architecture & APIs",
      "Mobile Money / Card Integration",
      "3 Months Priority Support",
      "Core Web Vitals Optimization",
    ],
    popular: true,
    action: "Request Business Quote",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "per project",
    desc: "End-to-end digital transformation for institutions, schools, and large organizations.",
    features: [
      "Full-Stack Multi-Tenant Platform",
      "Infrastructure & Security Audit",
      "CI/CD & Automated Backups",
      "On-Site & Remote Team Training",
      "6 Months Dedicated SLA",
      "Custom ERP / Legacy Migration",
    ],
    popular: false,
    action: "Contact Studio",
  },
];

export const TECH_STACK = [
  { name: "React", mark: "Re" },
  { name: "TypeScript", mark: "TS" },
  { name: "Laravel", mark: "Lv" },
  { name: "Node.js", mark: "Nd" },
  { name: "Tailwind", mark: "Tw" },
  { name: "Python", mark: "Py" },
  { name: "MySQL", mark: "SQL" },
  { name: "Docker", mark: "Dk" },
  { name: "Git", mark: "Git" },
  { name: "Figma", mark: "Fg" },
  { name: "Vite", mark: "Vt" },
  { name: "Next.js", mark: "Nx" },
];

export const FAQS = [
  {
    q: "What services does fabu001 offer?",
    a: "We deliver full-cycle software development (web applications, custom APIs, and internal systems), professional IT infrastructure support, hands-on tech training cohorts, and digital strategy consulting.",
  },
  {
    q: "How long does it take to build a custom web application?",
    a: "Timelines depend on scope and integrations. A focused business website typically ships in 2–4 weeks, while a custom SaaS platform or ERP takes 8–14 weeks with weekly staging demos.",
  },
  {
    q: "Do you offer remote training programs?",
    a: "Yes. Our training cohorts run both in-person in Nyange, Rwanda and remotely via live interactive sessions, complete with recordings, project reviews, and lab guides.",
  },
  {
    q: "What is the cost of your services?",
    a: "Every engagement is quoted transparently by scope, timeline, and support requirements. We structure accessible milestone pricing for startups, NGOs, schools, and enterprises.",
  },
  {
    q: "Do you provide post-launch support and maintenance?",
    a: "Yes. All builds include an initial warranty period, with optional ongoing retainers covering uptime monitoring, security patches, backups, and feature iterations.",
  },
  {
    q: "How can I enroll in a training cohort?",
    a: "Open the Training section, select your preferred track (Web Development, Advanced Laravel, or IT Support), and submit the enrollment form. Our admissions desk responds within 24 hours.",
  },
  {
    q: "What technologies do you use for development?",
    a: "We specialize in React, TypeScript, Next.js, Laravel, Node.js, Python, and Tailwind CSS backed by PostgreSQL, MySQL, Redis, Docker, and AWS cloud infrastructure.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We collaborate with organizations across East Africa, Europe, and North America using structured milestones, async updates, and live weekly video check-ins.",
  },
  {
    q: "Can you integrate mobile money payments into my site?",
    a: "Yes. We implement MTN MoMo, Airtel Money, Flutterwave, and Stripe payment flows with automated webhook verification and instant receipt generation.",
  },
];

export interface ShopProduct {
  id: string;
  name: string;
  category: string;
  priceUsd: number;
  summary: string;
  image: string;
}

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "starter-saas-kit",
    name: "Laravel + React SaaS Starter Kit",
    category: "Code Template",
    priceUsd: 49,
    summary: "Production-ready auth, role permissions, billing webhooks, and clean TypeScript UI components.",
    image: IMAGES.softwareStudio,
  },
  {
    id: "momo-sdk-bridge",
    name: "MoMo & Airtel Payment Bridge",
    category: "API Module",
    priceUsd: 35,
    summary: "Drop-in Node.js & PHP reconciliation module with idempotent webhook verification.",
    image: IMAGES.fintechSuite,
  },
  {
    id: "sysadmin-audit-pack",
    name: "IT Security & Network Audit Toolkit",
    category: "IT Utility",
    priceUsd: 29,
    summary: "Automated Bash and Go scripts for workstation inventory, TLS expiry, and port hardening.",
    image: IMAGES.cloudDatacenter,
  },
  {
    id: "cohort-seat-deposit",
    name: "L4SWD Full-Stack Cohort Seat",
    category: "Training Pass",
    priceUsd: 120,
    summary: "Reserve a mentored 8-week software engineering seat with live code reviews and certification.",
    image: IMAGES.trainingWorkshop,
  },
];
