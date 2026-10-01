// ============================================================
// PROJECT DATA — Internship and Professional Case Studies
// Preserved: ids, titles, live URLs, access labels, categories.
// Enriched: engineering scope, stack, features, decisions, flows.
// ============================================================

export const projects = [
    {
        id: 1,
        title: "AI Jamin",
        category: "Professional / Internship Project",
        role: "Full Stack Developer",
        access: "Public",
        tagline: "AI-Powered Real Estate Platform",
        summary: "Contributed to a production AI-assisted real estate platform serving property discovery, listings, and inquiry workflows.",
        whatIBuilt: "Built responsive React listing interfaces, integrated REST endpoints for property search/filter flows, and wired form-to-API inquiry submissions with validation and loading states.",
        overview: "AI Jamin is an AI-assisted real estate platform that streamlines property discovery and buyer inquiry. The product needed fast, filterable listings and a reliable inquiry pipeline from frontend to backend persistence.",
        myRole: "As a Full Stack Developer intern, I implemented frontend listing components, connected search/filter UI to REST APIs, and supported backend route and schema updates for listings and inquiries.",
        keyFeatures: [
            "Filterable property listings with search, sort, and responsive card layouts",
            "Inquiry / contact flow with client validation and server-side persistence",
            "Reusable React components for cards, filters, and detail sections",
        ],
        technicalImplementation: "React component hierarchy separates filter state, listing grids, and detail views. Express routes expose paginated listing queries with query-parameter filters; MySQL stores normalized property and inquiry records with foreign-key relations. Postman verified status codes and payload shapes.",
        engineeringDecisions: [
            { decision: "Query-param filtering", rationale: "Keeps listing URLs shareable and backend pagination stateless." },
            { decision: "Modular Express routers", rationale: "Isolates listing, inquiry, and auth concerns for clean error handling." },
            { decision: "Controlled form state", rationale: "Prevents invalid inquiry payloads before they reach the API." },
        ],
        dataFlow: [
            { step: "01", desc: "User sets search / filter state in React listing UI" },
            { step: "02", desc: "Client builds query params and calls GET /api/listings" },
            { step: "03", desc: "Express validates params, queries MySQL with joins + pagination" },
            { step: "04", desc: "UI renders cards; inquiry form POSTs to /api/inquiries with validation" },
        ],
        challenge: "Listing filters and inquiry submissions had to stay fast and consistent across mobile viewports without over-fetching.",
        solution: "Paginated API responses, debounced search input, and isolated component state kept renders minimal while validation utilities standardized payloads.",
        result: "Shipped a publicly accessible platform at https://www.aijamin.in/ with stable listing discovery and working inquiry submission.",
        technologies: ["React.js", "JavaScript (ES6+)", "Bootstrap", "CSS3", "Node.js", "Express.js", "REST APIs", "MySQL"],
        image: "",
        liveUrl: "https://www.aijamin.in/",
        liveLabel: "View Live Project",
        githubUrl: "",
        featured: true,
        type: "realestate",
        accent: "#6366f1"
    },
    {
        id: 2,
        title: "Diamond Finance",
        category: "Professional / Internship Project",
        role: "Full Stack Developer",
        access: "Private / Authorized Users Only",
        tagline: "Personal Finance Management System",
        summary: "Built ledger-style finance tracking with categorized transactions, balance computation, and authenticated access.",
        whatIBuilt: "Implemented transaction CRUD interfaces, balance aggregation logic, and authenticated Express routes with MongoDB persistence and role-aware access.",
        overview: "Diamond Finance is an internal finance management system for tracking income, expenses, and balances. It required accurate money math, clear transaction history, and restricted access to authorized users.",
        myRole: "As a Full Stack Developer intern, I built transaction modules end-to-end: React forms and tables, Express CRUD routes with validation, and MongoDB document models for transactions and users.",
        keyFeatures: [
            "Transaction ledger with category, date, and amount tracking",
            "Balance summaries computed from verified transaction records",
            "Authenticated routes restricting data to authorized users",
        ],
        technicalImplementation: "React tables with client-side sorting and form validation feed into Express middleware chains (auth, validation, controller). MongoDB collections store flexible transaction documents; aggregation pipelines compute totals. Git branches isolated ledger, auth, and reporting work.",
        engineeringDecisions: [
            { decision: "Server-computed balances", rationale: "Avoids client rounding drift and keeps money math authoritative." },
            { decision: "Auth middleware first", rationale: "Guarantees every finance route verifies identity before touching data." },
            { decision: "Document model for transactions", rationale: "Flexible categories and notes fit MongoDB documents better than rigid rows." },
        ],
        dataFlow: [
            { step: "01", desc: "User submits transaction via validated React form" },
            { step: "02", desc: "Express auth + validation middleware checks session and payload" },
            { step: "03", desc: "Controller writes MongoDB document and recomputes aggregates" },
            { step: "04", desc: "Dashboard refetches ledger + balances with loading/error states" },
        ],
        challenge: "Financial totals had to remain correct under concurrent edits while keeping unauthorized users fully locked out.",
        solution: "Centralized aggregation on the server plus route-level auth checks ensured consistent balances and strict access control.",
        result: "Delivered a working internal system restricted to authorized users, with verified CRUD and balance accuracy.",
        technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JavaScript (ES6+)", "Bootstrap"],
        image: "",
        liveUrl: "",
        liveLabel: "",
        githubUrl: "",
        privateLabel: "Private Project",
        featured: false,
        type: "finance",
        accent: "#10b981"
    }
];

export const featuredProject = projects[0];
