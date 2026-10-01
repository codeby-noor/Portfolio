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
        tagline: "Financial Management Platform",
        summary: "Financial management platform built with React and Supabase, using PostgreSQL for structured financial data, authentication, analytics, and dynamic reporting.",
        whatIBuilt: "Built React transaction interfaces with Supabase integration — PostgreSQL-backed CRUD, Supabase Auth for authorized-only access, and dynamic analytics/reporting views computed from structured financial data.",
        overview: "Diamond Finance is a financial management platform built with React and Supabase. It stores structured financial records in PostgreSQL and pairs them with authentication, analytics, and dynamic reporting so authorized users get accurate balances and clear insight into income and spending.",
        myRole: "As a Full Stack Developer intern, I built the platform end-to-end on the frontend and backend-services side: React forms, tables, and reporting views; Supabase table integration; Supabase Auth session handling; and validation across every data flow.",
        keyFeatures: [
            "Transaction management with categorized, structured PostgreSQL records",
            "Supabase Auth protecting all financial data for authorized users only",
            "Analytics and dynamic reporting views aggregated from live financial data",
        ],
        technicalImplementation: "React components manage transaction forms, filterable tables, and reporting views in Bootstrap/CSS layouts. Supabase provides the PostgreSQL persistence layer plus email authentication; Row-level access rules keep each query scoped to authorized users. Aggregation queries power balance summaries and analytics charts, and Postman-style request checks verified payload shapes during integration.",
        engineeringDecisions: [
            { decision: "Supabase + PostgreSQL backend", rationale: "Structured relational data with managed auth removes custom server overhead for finance records." },
            { decision: "Auth-gated queries", rationale: "Every read and write passes through Supabase Auth so financial data stays authorized-only." },
            { decision: "Query-driven reporting", rationale: "Analytics views aggregate live PostgreSQL data instead of duplicating totals on the client." },
        ],
        dataFlow: [
            { step: "01", desc: "Authorized user signs in via Supabase Auth session" },
            { step: "02", desc: "React forms submit validated transactions to Supabase PostgreSQL tables" },
            { step: "03", desc: "RLS-scoped queries return only that user's structured financial records" },
            { step: "04", desc: "Analytics views aggregate records into balances and dynamic reports" },
        ],
        challenge: "Financial totals had to stay accurate and private — every figure traceable to structured records, visible only to authorized users.",
        solution: "PostgreSQL relations with Supabase Auth scoping made accuracy and privacy structural: validated writes, authorized-only reads, and server-aggregated reporting.",
        result: "Delivered a working finance platform with authenticated CRUD and dynamic analytics reporting, restricted to authorized users.",
        technologies: ["React.js", "JavaScript (ES6+)", "Bootstrap", "CSS3", "Supabase", "PostgreSQL", "Supabase Auth", "Analytics"],
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
