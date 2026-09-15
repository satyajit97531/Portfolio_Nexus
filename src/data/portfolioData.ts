import { ProfileData, Project, Skill, Achievement, EducationItem } from '../types';

export const profileData: ProfileData = {
  name: "Satyajit Samanta",
  role: "Full-Stack & Systems Engineer",
  tagline: "Building resilient MERN & Next.js systems, localized Ollama AI pipelines, and native iOS experiences",
  location: "Janakpuri / Sagarpur, New Delhi, India",
  currentCollege: "Delhi Global Institute of Technology (DGIT)",
  university: "Maharshi Dayanand University (MDU)",
  school: "Vinay Nagar Senior Secondary School, New Delhi",
  degree: "B.Tech in Computer Science and Engineering (CSE)",
  batch: "2023 – 2027",
  semester: "7th Semester (4th Year)",
  rollNo: "23DGITM425",
  email: "satyajit97531@gmail.com",
  phone: "+91 8076522382",
  whatsappUrl: "https://wa.me/918076522382?text=Hi%20Satyajit,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!",
  github: "https://github.com/satyajit97531",
  linkedin: "https://www.linkedin.com/in/satyajit-samanta-07a461385/",
  leetcode: "https://leetcode.com/u/satyajitzzzzz/",
  codeforces: "https://codeforces.com/profile/satyajitzzz",
  bio: "B.Tech Computer Science student at Delhi Global Institute of Technology (DGIT), affiliated with Maharshi Dayanand University. Specialized in Full-Stack MERN and Next.js development, local AI model integration with Ollama, and native iOS application engineering. Passionate about systems architecture, clean design systems in Figma, and algorithmic problem-solving on LeetCode & Codeforces.",
  careerObjective: "Motivated B.Tech Computer Science student with a strong foundation in Full Stack Development (MERN, Next.js), Ollama AI integration, and iOS app development. Seeking an engineering or internship opportunity to build scalable, secure, and user-centric web & mobile solutions."
};

export const projectsData: Project[] = [
  {
    id: "service-portal",
    title: "Service Portal Application",
    subtitle: "AI-Powered Health Tracking & Diagnostic Consultation Engine",
    tagline: "MERN health monitoring ecosystem integrated with localized Ollama LLM assistant",
    category: "AI & ML",
    badge: "Major Project",
    featured: true,
    problem: "Health and biometric tracking apps often lock user data into rigid schemas and lack intelligent context-aware feedback, while cloud AI queries introduce latency and personal healthcare data privacy concerns.",
    solution: "Engineered a full-stack MERN application incorporating an on-premise Ollama AI assistant. Features secure JWT authentication, real-time health metric visualizations, automated BMI/vital trends, and zero-data-leak intelligent conversational support.",
    metrics: [
      "100% on-device/local privacy with Ollama AI integration",
      "Sub-80ms API response time with Express & MongoDB indexing",
      "Dynamic interactive charting with real-time vitals tracking"
    ],
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Ollama AI", "JWT Auth", "REST API", "Tailwind CSS"],
    github: "https://github.com/satyajit97531/Service_Portal",
    highlights: [
      "Integrated local Ollama LLM to answer healthcare queries with zero reliance on costly external API keys",
      "Engineered comprehensive health metric dashboards with interactive biometric curves",
      "Designed clean responsive interface optimized for mobile and desktop screens"
    ],
    techStackDetailed: {
      frontend: "React 19, Tailwind CSS, Lucide Icons, Charting Hooks",
      backend: "Node.js, Express.js, JWT Authentication",
      database: "MongoDB with Mongoose ODM & aggregation pipelines",
      aiOrTools: "Ollama Local LLM (Llama / Mistral runtime)"
    }
  },
  {
    id: "medi-map",
    title: "Medi_Map",
    subtitle: "Emergency Medical Facility Routing & Resource Navigator",
    tagline: "Interactive geospatial locator for medical clinics, emergency care, and specialty centers",
    category: "Full-Stack",
    badge: "Healthcare Tech",
    featured: true,
    problem: "During urgent medical scenarios, finding nearby specialized clinics with up-to-date service information and direct routing is often slowed down by clunky generic search engines.",
    solution: "Architected a dedicated healthcare map platform with instant geo-lookup, specialty filtering (emergency, diagnostics, pharmacies), and interactive route visualization designed with rapid responsiveness in mind.",
    metrics: [
      "Instant geolocation triangulation and facility radius search",
      "Zero-latency search filter across healthcare classifications",
      "Optimized client-side caching for repeat destination queries"
    ],
    tags: ["React", "JavaScript", "Leaflet / Maps", "Node.js", "Express", "Geospatial", "Tailwind CSS"],
    github: "https://github.com/satyajit97531/Medi_Map",
    highlights: [
      "Real-time geolocation radius searching and facility markers",
      "Categorized search for clinics, emergency centers, and diagnostic labs",
      "Mobile-first responsive UX with quick dispatch calls"
    ],
    techStackDetailed: {
      frontend: "React.js, Interactive Map Engine, Tailwind CSS",
      backend: "Node.js, Express.js REST APIs",
      database: "Medical facilities schema with geospatial indexing"
    }
  },
  {
    id: "auraspace",
    title: "AuraSpace",
    subtitle: "High-Performance Modern Collaborative Workspace",
    tagline: "TypeScript-powered workspace hub with real-time interaction and modern aesthetics",
    category: "Full-Stack",
    badge: "Production Ready",
    featured: true,
    problem: "Modern creators and developers need clean, distraction-free workspaces that blend document organization, task coordination, and aesthetic ergonomics without bloated microservices.",
    solution: "Built a high-performance workspace in TypeScript with modern modular architecture, smooth UI transitions, and structured organizational workflows designed for high productivity.",
    metrics: [
      "100% strict TypeScript type coverage and zero runtime type errors",
      "60fps smooth micro-interactions powered by motion transforms",
      "Instant local cache synchronization for uninterrupted drafting"
    ],
    tags: ["TypeScript", "React", "Tailwind CSS", "Motion", "State Management", "Vite"],
    github: "https://github.com/satyajit97531/AuraSpace",
    highlights: [
      "Strict TypeScript design with modular components and scalable hierarchy",
      "Aesthetic cyber-minimalist dark mode with responsive typography",
      "Fluid state updates and real-time client reactivity"
    ],
    techStackDetailed: {
      frontend: "TypeScript, React, Tailwind CSS, Motion Animations",
      backend: "Node.js API endpoints & persistence layers"
    }
  },
  {
    id: "games-24",
    title: "Games 24",
    subtitle: "Next-Gen Digital Game Storefront & Distribution Platform",
    tagline: "High-fidelity digital distribution UX inspired by Steam and Epic Games",
    category: "Mobile & Design",
    badge: "Minor Project",
    featured: true,
    problem: "Traditional gaming storefronts often suffer from visual clutter, poor typographic hierarchy, and complex friction-heavy checkout paths that detract from discovery.",
    solution: "Designed and prototyped a high-fidelity digital game distribution platform in Figma. Features an immersive dark aesthetic, categorized genre carousels, detailed spec requirements, and a streamlined 2-step checkout flow.",
    metrics: [
      "Tested streamlined 2-step checkout flow with zero friction steps",
      "High-contrast dark gaming aesthetic with custom typography",
      "End-to-end interactive prototype covering 15+ high-fidelity screens"
    ],
    tags: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "E-Commerce"],
    github: "https://github.com/satyajit97531",
    highlights: [
      "Engineered comprehensive component design system with atomic variants in Figma",
      "Built interactive prototypes for discovery, filtering, cart management, and profile reviews",
      "Adheres strictly to modern responsive gaming interface conventions"
    ],
    techStackDetailed: {
      frontend: "Figma Component Systems, Interactive Prototyping, Modern Design Tokens",
      aiOrTools: "Figma, Adobe Creative Suite, Design Tokens"
    }
  },
  {
    id: "product-store",
    title: "Product_Store",
    subtitle: "Full-Stack MERN E-Commerce & Inventory Management Engine",
    tagline: "Scalable product catalog with instant CRUD, state-driven shopping cart, and REST APIs",
    category: "Full-Stack",
    badge: "Full-Stack MERN",
    featured: false,
    problem: "Small businesses require lightweight, resilient e-commerce inventory backends that handle fast catalog additions, price updates, and cart tracking without prohibitive licensing fees.",
    solution: "Developed an end-to-end MERN application featuring a reactive frontend, clean RESTful Express routes, and MongoDB persistence for rapid catalog manipulation and cart states.",
    metrics: [
      "Instant optimistic UI updates for product management operations",
      "Clean RESTful endpoints with input validation and error middleware",
      "Fully responsive catalog grid adapting to all screen formats"
    ],
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Tailwind CSS"],
    github: "https://github.com/satyajit97531/Product_Store",
    highlights: [
      "Modular product management with dynamic image previews and price filters",
      "Asynchronous state handling with clean API error boundaries",
      "Scalable Mongoose data models with strict validation"
    ],
    techStackDetailed: {
      frontend: "React, State Hooks, Responsive Grid Layouts",
      backend: "Node.js, Express.js REST API",
      database: "MongoDB Cloud Atlas"
    }
  },
  {
    id: "cipher",
    title: "Cipher",
    subtitle: "Cryptographic Security Suite & Text Encryption Utility",
    tagline: "Client-side encryption protocols, hash generation, and algorithmic ciphers",
    category: "Systems & Security",
    badge: "Security & Algorithms",
    featured: false,
    problem: "Developers and students need transparent, accessible demonstrations of cryptographic transformations to understand cipher complexity and hashing primitives.",
    solution: "Constructed an interactive cryptographic engine demonstrating symmetric ciphers, hashing, and encoding algorithms with instant visual diffs and key verification.",
    metrics: [
      "Zero server latency via client-side algorithmic execution",
      "Support for multiple classic and modern cipher algorithms",
      "Instant copy-to-clipboard hash and payload generation"
    ],
    tags: ["JavaScript", "Cryptography", "Algorithms", "Web Security", "Node.js"],
    github: "https://github.com/satyajit97531/Cipher",
    highlights: [
      "Real-time text encryption and decryption workbench",
      "Algorithmic demonstrations of substitution, transposition, and hashing",
      "Zero telemetry / 100% private in-browser computation"
    ],
    techStackDetailed: {
      frontend: "JavaScript ES2022, Modern Web Cryptography APIs, Clean Cyber UI"
    }
  }
];

export const skillsData: Skill[] = [
  {
    name: "Next.js & React 19",
    category: "frontend",
    tier: "Production Core",
    projects: ["AuraSpace", "Service Portal", "Production Systems"],
    description: "Server-side rendering (SSR), Static Site Generation (SSG), App Router, server actions, and full-stack performance optimization.",
    accent: "#6366f1"
  },
  {
    name: "React.js & TypeScript",
    category: "frontend",
    tier: "Production Core",
    projects: ["Service Portal", "AuraSpace", "Medi_Map"],
    description: "Component architecture, custom hooks, reactive state, concurrent rendering, and strict type safety.",
    accent: "#38bdf8"
  },
  {
    name: "Node.js & Express.js",
    category: "backend",
    tier: "Production Core",
    projects: ["Service Portal", "Product Store", "Medi_Map"],
    description: "RESTful API design, middleware architecture, JWT authentication, and secure routing.",
    accent: "#22c55e"
  },
  {
    name: "MongoDB & Mongoose",
    category: "backend",
    tier: "Production Core",
    projects: ["Service Portal", "Product Store"],
    description: "NoSQL document schema design, indexing, aggregation pipelines, and ACID transactions.",
    accent: "#10b981"
  },
  {
    name: "Swift & iOS Development",
    category: "aimobile",
    tier: "Specialized",
    projects: ["SKLZ TECT Training", "Mobile Systems"],
    description: "Swift programming, Xcode IDE, Apple Human Interface Guidelines, and mobile app lifecycles.",
    accent: "#f97316"
  },
  {
    name: "Ollama AI & Local LLMs",
    category: "aimobile",
    tier: "Specialized",
    projects: ["Service Portal Application"],
    description: "Self-hosted local AI inference, conversational chatbot pipelines, zero-data-leak architecture.",
    accent: "#a855f7"
  },
  {
    name: "Tailwind CSS & Motion",
    category: "frontend",
    tier: "Production Core",
    projects: ["AuraSpace", "Portfolio", "Service Portal"],
    description: "Utility-first modern CSS, micro-interactions, responsive fluid grids, and glassmorphic UI.",
    accent: "#06b6d4"
  },
  {
    name: "UI/UX & Figma",
    category: "aimobile",
    tier: "Proficient",
    projects: ["Games 24", "iOS Layouts", "AuraSpace"],
    description: "High-fidelity wireframing, component design systems, atomic design, user flow prototyping.",
    accent: "#ec4899"
  },
  {
    name: "JavaScript (ES6+)",
    category: "frontend",
    tier: "Production Core",
    projects: ["Medi_Map", "Cipher", "Product Store"],
    description: "Asynchronous programming, closures, promises, event loop, and DOM manipulation.",
    accent: "#eab308"
  },
  {
    name: "Git & GitHub Workflow",
    category: "tools",
    tier: "Production Core",
    projects: ["All Repositories"],
    description: "Branching strategies, commit conventions, code reviews, and version control.",
    accent: "#f43f5e"
  },
  {
    name: "Data Structures & Algorithms",
    category: "tools",
    tier: "Production Core",
    projects: ["LeetCode Problem Solving", "Cipher"],
    description: "Arrays, hashing, two pointers, sliding window, binary trees, recursion, and time complexity.",
    accent: "#8b5cf6"
  },
  {
    name: "Xcode & Apple Tooling",
    category: "tools",
    tier: "Proficient",
    projects: ["SKLZ TECT iOS Certification"],
    description: "Simulator profiling, storyboard/SwiftUI structures, build schemes, and asset catalogs.",
    accent: "#6366f1"
  },
  {
    name: "HTML5 & Modern CSS3",
    category: "frontend",
    tier: "Production Core",
    projects: ["All Web Projects"],
    description: "Semantic web standards, accessibility (a11y), flexbox, CSS Grid, and custom variables.",
    accent: "#f97316"
  }
];

export const achievementsData: Achievement[] = [
  {
    id: "ios-cert",
    title: "iOS Application Development Certification",
    issuer: "SKLZ TECT LLP",
    issuerUrl: "https://sklztect.com/",
    date: "14th August, 2024",
    badge: "Official Certificate",
    type: "certification",
    description: "Successfully completed an intensive 8-week training and internship program on native iOS Application Development conducted at Management Education & Research Institute (MERI), New Delhi.",
    credentialId: "SKLZ-TECT-IOS-2024-SAMANTA",
    skillsCovered: ["Swift Programming", "Xcode Environment", "Figma Mobile UI", "App Lifecycle", "MVC/Architecture"],
    details: [
      "Mastered native Swift programming and advanced object-oriented mobile architecture",
      "Implemented high-fidelity user interface wireframes designed in Figma into functional iOS views",
      "Gained comprehensive hands-on experience in mobile UI/UX principles, memory management, and debugging",
      "Awarded Certificate of Completion signed by Directors Simran and Aldrin Castelino"
    ],
    hasCertificatePreview: true
  },
  {
    id: "btech-cse",
    title: "B.Tech Computer Science Academic Foundation",
    issuer: "Maharshi Dayanand University / DGIT",
    date: "2023 – 2027",
    badge: "Academic Honor",
    type: "academic",
    description: "Pursuing Bachelor of Technology in Computer Science & Engineering with consistent focus on Data Structures, Database Systems, and Object-Oriented Architecture.",
    credentialId: "Roll No: 23DGITM425",
    skillsCovered: ["Data Structures", "Database Management", "OS Concepts", "Networking", "Software Engineering"],
    details: [
      "Maintained solid academic standing across 7 semesters at Delhi Global Institute of Technology (DGIT)",
      "Completed foundational coursework in Design & Analysis of Algorithms, DBMS, and Operating Systems",
      "Active participant in technical student engineering forums and software labs"
    ],
    hasCertificatePreview: false
  },
  {
    id: "ollama-integration",
    title: "Localized AI System Architecture with Ollama",
    issuer: "Independent Systems Engineering",
    date: "2024",
    badge: "Technical Milestone",
    type: "technical",
    description: "Successfully architected on-premise localized AI inference pipelines in MERN stack applications, removing reliance on third-party cloud LLM API billing and ensuring 100% data confidentiality.",
    skillsCovered: ["Ollama AI", "Local Inference", "Prompt Engineering", "Full-Stack Integration"],
    details: [
      "Integrated local Ollama LLM endpoint into health diagnostics Service Portal application",
      "Eliminated recurring API subscription costs and latency bottlenecks for chatbot interactions",
      "Built resilient fallback mechanisms and contextual memory handlers"
    ],
    hasCertificatePreview: false
  }
];

export const educationData: EducationItem[] = [
  {
    institution: "Delhi Global Institute of Technology (DGIT) / MERI",
    degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
    location: "Jhajjar, Haryana / Affiliated with Maharshi Dayanand University (MDU)",
    period: "2023 – 2027",
    status: "7th Semester (4th Year Undergrad)",
    rollNo: "23DGITM425",
    description: "Undergraduate engineering program centered on core computer science foundations, systems programming, and modern full-stack development methodologies.",
    highlights: [
      "Majoring in Computer Science and Engineering with advanced elective modules in Web Technologies and Distributed Systems",
      "Lead developer on the Service Portal Major Project and Games 24 UI/UX minor platform",
      "Collaborative student lab initiatives in database systems and data structures"
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Operating Systems & Linux Internals",
      "Object-Oriented Programming (OOP)",
      "Computer Networks & Protocols",
      "Software Engineering & Agile"
    ]
  },
  {
    institution: "Vinay Nagar Senior Secondary School",
    degree: "Senior Secondary Education (CBSE - Class XII & X)",
    location: "New Delhi, India",
    period: "Completed",
    status: "Higher Secondary Foundation",
    description: "Rigorous secondary education in Science and Technology stream with strong analytical grounding in Physics, Mathematics, and Computer Fundamentals.",
    highlights: [
      "Formative mathematical and logical reasoning foundation",
      "Early engagement with computer programming concepts, problem analysis, and algorithms",
      "Active participation in school technical science exhibitions"
    ],
    coursework: [
      "Mathematics & Calculus",
      "Computer Science Fundamentals",
      "Physics & Mechanics",
      "Chemistry & Analytical Science"
    ]
  }
];

export const leetCodeData = {
  username: "satyajitzzzzz",
  profileUrl: "https://leetcode.com/u/satyajitzzzzz/",
  ranking: "Top Problem Solver",
  focusAreas: [
    { name: "Arrays & Hashing", count: 18, color: "#38bdf8" },
    { name: "Two Pointers & Sliding Window", count: 11, color: "#a855f7" },
    { name: "Binary Trees & BST", count: 8, color: "#10b981" },
    { name: "Dynamic Programming & Recursion", count: 6, color: "#f59e0b" },
    { name: "Strings & Math", count: 7, color: "#ec4899" }
  ],
  stats: {
    easySolved: 30,
    mediumSolved: 15,
    hardSolved: 5,
    totalSolved: 50,
    acceptanceRate: "76.8%"
  }
};

export const codeforcesData = {
  handle: "satyajitzzz",
  profileUrl: "https://codeforces.com/profile/satyajitzzz",
  title: "Competitive Programmer",
  platform: "Codeforces",
  rank: "Algorithmic Problem Solver",
  contests: 14,
  problemsSolved: 35,
  primaryTopic: "Greedy & Implementation",
  tags: [
    { name: "Greedy Algorithms", count: 18, color: "#38bdf8" },
    { name: "Implementation & Simulation", count: 14, color: "#10b981" },
    { name: "Math & Constructive Logic", count: 8, color: "#818cf8" },
    { name: "Two Pointers & Brute Force", count: 5, color: "#f59e0b" }
  ]
};
