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
  bio: "B.Tech Computer Science student at Delhi Global Institute of Technology (DGIT), affiliated with Maharshi Dayanand University. Specialized in Full-Stack MERN and Next.js development, local AI model integration with Ollama, and native iOS application engineering. Passionate about systems architecture, clean design systems in Figma, and algorithmic problem-solving on LeetCode.",
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
      "45+ medical dialogue Q&A training pairs & 30+ health condition vectors",
      "5 MongoDB document schemas managing 60+ biometric records",
      "Sub-80ms API response time with indexed Mongoose aggregations"
    ],
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Ollama AI", "JWT Auth", "REST API", "Tailwind CSS"],
    github: "https://github.com/satyajit97531/Service_Portal",
    highlights: [
      "Integrated local Ollama LLM trained/conditioned with 45+ healthcare dialogue pairs with 0% external cloud API cost",
      "Engineered 5 MongoDB document schemas (Users, Consultations, Biometrics, AuditTrails, Vitals) handling 60+ synthetic records",
      "Designed real-time biometric vitals and BMI curves with interactive telemetry charting"
    ],
    techStackDetailed: {
      frontend: "React 19, Tailwind CSS, Lucide Icons, Charting Hooks",
      backend: "Node.js, Express.js, JWT Authentication",
      database: "MongoDB (5 Document Schemas, 60+ Biometric Records)",
      aiOrTools: "Ollama Local LLM (Llama 3 / Mistral 7B quantized 4-bit, 45+ Q&A Pairs)"
    },
    dataModel: "5 Mongoose Document Schemas (UserProfiles, BiometricTelemetry, ConsultationThreads, SymptomLogs, AuditTrails)",
    dataVolumeNumeral: "45+ Training Q&A Pairs · 60+ Biometric Records · 30+ Health Vectors"
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
      "50+ mapped medical facility geo-coordinates & clinic nodes",
      "25+ emergency trauma centers categorized across 12 specialties",
      "Sub-50ms radius spatial bounding queries via 2dsphere indexing"
    ],
    tags: ["React", "JavaScript", "Leaflet / Maps", "Node.js", "Express", "Geospatial", "Tailwind CSS"],
    github: "https://github.com/satyajit97531/Medi_Map",
    highlights: [
      "Constructed geospatial data model indexing 50+ clinic coordinates and 25+ emergency centers",
      "Real-time 2dsphere spatial indexing for instant 5km to 25km radius facility triangulation",
      "Interactive Leaflet route mapping with emergency quick-dispatch contacts"
    ],
    techStackDetailed: {
      frontend: "React.js, Leaflet Geospatial Engine, Tailwind CSS",
      backend: "Node.js, Express.js REST APIs",
      database: "MongoDB Geospatial (2dsphere index, 50+ Facility Nodes, 12 Taxonomy Schemas)"
    },
    dataModel: "GeoJSON & 2dsphere Spatial Models (Coordinates, FacilityMetadata, OperationalHours, EmergencyCapacity)",
    dataVolumeNumeral: "50+ Verified Geo-Coordinates · 25+ Emergency Centers · 12 Specialty Schemas"
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
      "16 strict TypeScript domain entity interfaces & data schemas",
      "50+ interactive workspace document, board, & task nodes",
      "40+ simulated real-time client interaction event vectors"
    ],
    tags: ["TypeScript", "React", "Tailwind CSS", "Motion", "State Management", "Vite"],
    github: "https://github.com/satyajit97531/AuraSpace",
    highlights: [
      "Strict TypeScript design with 16 modular data models and zero runtime type errors",
      "Optimistic UI state synchronization managing 50+ document and kanban nodes",
      "Cyber-minimalist 60fps micro-interactions powered by motion transforms"
    ],
    techStackDetailed: {
      frontend: "TypeScript 5.6, React 19, Tailwind CSS, Motion Animations",
      backend: "Node.js API endpoints & local-first client cache sync",
      database: "Normalized JSON Workspace Store (16 Entity Models, 50+ Nodes)"
    },
    dataModel: "16 TypeScript Type-Safe Entity Schemas (Workspaces, DocumentTrees, KanbanNodes, AuditLogs)",
    dataVolumeNumeral: "16 Schema Interfaces · 50+ Document Nodes · 40+ Event Vectors"
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
      "40+ structured digital game catalog item data models",
      "35+ design tokens & 20+ reusable atomic UI component variants",
      "10+ fully interactive high-fidelity screen prototype user flows"
    ],
    tags: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "E-Commerce"],
    github: "https://github.com/satyajit97531",
    highlights: [
      "Modeled e-commerce catalog schemas structuring 40+ game title records and 12 genre taxonomies",
      "Engineered comprehensive atomic design system with 35+ design tokens and 20+ components in Figma",
      "Built interactive prototypes for store discovery, filtering, cart management, and 2-step checkout"
    ],
    techStackDetailed: {
      frontend: "Figma Component Systems, Interactive Prototyping, Modern Design Tokens",
      aiOrTools: "Figma, Adobe Creative Suite, Design Tokens, 12 Genre Taxonomies"
    },
    dataModel: "GameStore Taxonomy Model (40+ Game Titles, 12 Genre Taxonomies, Hardware Spec Matrices)",
    dataVolumeNumeral: "40+ Game Titles · 35+ Design Tokens · 20+ Atomic Components · 10+ Screens"
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
      "45+ SKU product inventory items across 8 category schemas",
      "60+ order simulation transactions and stock threshold validations",
      "Sub-60ms optimistic CRUD API updates with Mongoose ODM"
    ],
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Tailwind CSS"],
    github: "https://github.com/satyajit97531/Product_Store",
    highlights: [
      "Modeled 45+ SKU inventory items across 8 category schemas with strict validation",
      "Engineered optimistic UI updates and real-time price & quantity recalculations",
      "Tested with 60+ simulated checkout and stock fluctuation events"
    ],
    techStackDetailed: {
      frontend: "React, State Hooks, Responsive Grid Layouts",
      backend: "Node.js, Express.js REST API",
      database: "MongoDB Cloud Atlas (45+ SKUs, 8 Category Models, 60+ Transactions)"
    },
    dataModel: "Mongoose Product & Inventory Schema (SKU, PriceMatrix, CategoryTaxonomy, StockLevel, OrderQueue)",
    dataVolumeNumeral: "45+ SKU Products · 8 Categories · 60+ Simulated Transactions"
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
      "50+ cryptanalytic test vectors and edge-case validation strings",
      "8 classic & modern cipher algorithms + 5 secure hashing standards",
      "Zero server latency via client-side Web Crypto API execution"
    ],
    tags: ["JavaScript", "Cryptography", "Algorithms", "Web Security", "Node.js"],
    github: "https://github.com/satyajit97531/Cipher",
    highlights: [
      "Benchmarked across 50+ test vectors for bit entropy and transformation consistency",
      "Algorithmic implementations of AES, DES, Caesar, Vigenère, SHA-256, and HMAC",
      "Instant visual diffs and key verification with 100% private in-browser computation"
    ],
    techStackDetailed: {
      frontend: "JavaScript ES2022, Modern Web Cryptography APIs, Clean Cyber UI",
      database: "Test Suite (50+ Algorithmic Test Vectors, 8 Ciphers, 5 Hashing Standards)"
    },
    dataModel: "Cryptographic Transformation Vector Schema (KeySpace, CipherMode, DigestHash, EntropyScore)",
    dataVolumeNumeral: "50+ Test Vectors · 8 Ciphers · 5 Hashing Standards"
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
    institution: "Delhi Global Institute of Technology (DGIT)",
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
