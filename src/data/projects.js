// ============================================================
// PROJECT DATA — Professional Engineering Case Studies
// Grounded in genuine implementation details by Mahenoor Shaikh
// ============================================================

export const projects = [
    {
        id: 1,
        title: "Full-Stack E-Commerce Application",
        category: "E-Commerce & Order Management",
        role: "Full-Stack Developer (End-to-End Build)",
        tagline: "Database-backed shopping platform with product catalog, cart persistence, checkout validation, and admin management.",
        overview:
            "A complete web application built to handle digital storefront operations and administrative inventory management with relational data consistency.",
        myRole:
            "Personally engineered the full application lifecycle: designed the normalized MySQL schema (products, users, orders, order_items), implemented the Express.js REST API with input validation and security headers, and built the React client interface with stateful cart synchronization.",
        technologies: ["React.js", "Node.js", "Express.js", "MySQL", "REST APIs", "CSS3"],
        keyFeatures: [
            "Structured product catalog with category hierarchies, price filtering, and keyword search",
            "Persistent shopping cart with dynamic tax, discount, and total price calculation",
            "Multi-step checkout workflow with customer shipping and contact validation",
            "Administrative panel for CRUD operations on inventory stock and customer orders",
            "Modular REST API endpoints with structured JSON responses and HTTP status codes"
        ],
        technicalImplementation:
            "Engineered reusable React components for storefront browsing and cart management. Implemented Express.js router modules to isolate auth, product, and order endpoints. Utilized parameterized SQL queries in MySQL to ensure data integrity and prevent SQL injection.",
        dataFlow: [
            { step: "1. Client Request", desc: "User interactions in React trigger API calls via Axios HTTP client" },
            { step: "2. Express Routing", desc: "Express.js routes parse incoming JSON payloads and run validation middleware" },
            { step: "3. Controller & SQL", desc: "Controllers execute parameterized SQL queries against MySQL database" },
            { step: "4. Database Execution", desc: "MySQL enforces relational constraints and returns query recordsets" },
            { step: "5. State Update", desc: "JSON response updates client React state and re-renders components" }
        ],
        engineeringDecisions: [
            {
                decision: "MySQL Relational Database",
                rationale: "Used MySQL because e-commerce data (orders, inventory, line items) requires strict relational integrity, foreign key constraints, and ACID transactions."
            },
            {
                decision: "Context API for Cart State",
                rationale: "Centralized cart items and total calculation in a React Context Provider to prevent prop drilling across nested product components."
            },
            {
                decision: "Parameterized SQL Queries",
                rationale: "Executed database queries with prepared statements to protect against SQL injection vulnerabilities."
            }
        ],
        challenge:
            "Synchronizing cart state across navigation while ensuring product stock quantities and price totals remain consistent during checkout.",
        solution:
            "Structured a centralized React Context with local storage persistence and validated order item calculations on the Express backend before confirming orders.",
        result:
            "A fully functional full-stack web application with working product browsing, cart persistence, order submission, and admin inventory control.",
        image: "/projects/ecommerce/home.png",
        liveUrl: "",
        githubUrl: "",
        featured: true,
        type: "ecommerce",
        accent: "#6366f1"
    },
    {
        id: 2,
        title: "Broker Streets — Real Estate Platform",
        category: "Real Estate Web Application",
        role: "Frontend & API Integration Developer",
        tagline: "Modern property discovery platform with multi-parameter filtering, detailed listings, and broker lead routing.",
        overview:
            "A dedicated real estate web application built to streamline property discovery through structured listings, location-based categorization, and direct broker contact channels.",
        myRole:
            "Designed and implemented the complete frontend application: developed the property browsing interface, dynamic search and filtering algorithms, responsive property detail views, and broker inquiry lead capture forms.",
        technologies: ["React.js", "JavaScript (ES6+)", "Bootstrap", "CSS3", "REST APIs"],
        keyFeatures: [
            "Multi-parameter property search and filtering by price range, property type, and location",
            "Detailed property specification views with amenities breakdown and image presentation",
            "Structured broker lead capture form with client-side input validation",
            "Location-based neighborhood categorization for regional property discovery",
            "Responsive layout optimized for mobile, tablet, and desktop viewports"
        ],
        technicalImplementation:
            "Built with modular React components following separation of concerns between presentational cards and filter logic. Implemented custom hooks to manage search filters and URL query parameters for shareable property searches.",
        dataFlow: [
            { step: "1. Filter Input", desc: "User selects location, price, or property type in the search bar" },
            { step: "2. Query State", desc: "Custom React filter hooks update the active filtering state" },
            { step: "3. API / Data Match", desc: "Filter algorithms match criteria against property dataset" },
            { step: "4. UI Re-render", desc: "Property grid dynamically updates with matching property cards" }
        ],
        engineeringDecisions: [
            {
                decision: "Component Modularity",
                rationale: "Divided property listings into reusable Card, FilterBar, and DetailModal components for clean code reuse."
            },
            {
                decision: "Client-Side Filter Optimization",
                rationale: "Optimized multi-parameter filtering algorithms to ensure instantaneous search results without interface stutter."
            },
            {
                decision: "Responsive Grid System",
                rationale: "Combined Bootstrap grid utilities with custom CSS variables to guarantee consistent layouts across all screen sizes."
            }
        ],
        challenge:
            "Maintaining fast rendering performance when filtering through extensive property listings with multiple simultaneous filter parameters.",
        solution:
            "Memoized filtered results and decoupled filter inputs from the listing render tree to prevent unnecessary component re-renders.",
        result:
            "A responsive, user-friendly real estate platform enabling seamless property discovery and lead generation for brokers.",
        image: "/projects/broker-streets.png",
        liveUrl: "https://brokerstreets.com",
        githubUrl: "",
        featured: true,
        type: "realestate",
        accent: "#3b82f6"
    },
    {
        id: 3,
        title: "Real-Time Chat Application",
        category: "Communication Platform",
        role: "Full-Stack Developer",
        tagline: "Instant messaging application with WebSocket event communication, live presence, and MongoDB persistence.",
        overview:
            "A real-time messaging application engineered for low-latency bidirectional communication with active user presence detection and persistent conversation storage.",
        myRole:
            "Implemented the WebSocket server using Socket.io on Node.js/Express, designed MongoDB document collections for message persistence, and created the reactive React chat interface with auto-scrolling message feeds.",
        technologies: ["React.js", "Node.js", "Express.js", "Socket.io", "MongoDB"],
        keyFeatures: [
            "Low-latency bidirectional messaging powered by Socket.io WebSocket connections",
            "Live user presence status broadcasting (Online / Offline detection)",
            "Real-time typing feedback indicators for active conversations",
            "Persistent message history stored in MongoDB document collections",
            "Responsive chat interface with auto-scrolling to newest messages"
        ],
        technicalImplementation:
            "Set up an event-driven WebSocket architecture on Node.js using Socket.io room handlers. Built MongoDB schemas with timestamped message records and developed a reactive React client that listens for incoming socket events and renders updates optimistically.",
        dataFlow: [
            { step: "1. Message Send", desc: "User types message and emits a 'send_message' socket event" },
            { step: "2. Server Event", desc: "Socket.io server receives event, validates payload, and saves to MongoDB" },
            { step: "3. Broadcast", desc: "Server broadcasts message event to the recipient's active socket room" },
            { step: "4. Client Receive", desc: "Recipient client receives event and appends message to active chat thread" }
        ],
        engineeringDecisions: [
            {
                decision: "Socket.io WebSockets",
                rationale: "Selected WebSockets over HTTP polling to enable instant bidirectional message delivery with minimal overhead."
            },
            {
                decision: "MongoDB Document Store",
                rationale: "Used MongoDB for message persistence because flexible document structures naturally represent chat messages and metadata."
            },
            {
                decision: "Optimistic UI Updates",
                rationale: "Immediately rendered sent messages in the sender's UI while saving asynchronously to provide a responsive user experience."
            }
        ],
        challenge:
            "Managing socket connection lifecycles (connect, disconnect, reconnect) without duplicate message listeners or memory leaks in React.",
        solution:
            "Structured socket event listeners inside `useEffect` hooks with proper cleanup functions on component unmount.",
        result:
            "An instant messaging application with reliable real-time message delivery, live typing states, and persistent conversation history.",
        image: "/projects/chat-app.png",
        liveUrl: "",
        githubUrl: "",
        featured: false,
        type: "chat",
        accent: "#06b6d4"
    },
    {
        id: 4,
        title: "Admin Analytics Dashboard",
        category: "Data Management & Analytics",
        role: "Full-Stack Developer",
        tagline: "Administrative dashboard for tracking metrics, revenue distributions, and user activities with data tables.",
        overview:
            "A data management dashboard created to help system administrators track operational metrics, view activity trends, and manage user records with filtering and pagination.",
        myRole:
            "Engineered the aggregate data calculation endpoints in Express.js, structured MySQL aggregation queries, and built modular dashboard widgets in React with interactive charts and filterable data tables.",
        technologies: ["React.js", "Node.js", "Express.js", "MySQL", "REST APIs", "CSS3"],
        keyFeatures: [
            "KPI summary cards displaying key operational indicators and trend metrics",
            "Data visualization charts for revenue distribution and activity analysis",
            "User management data table with status filtering, keyword search, and pagination",
            "REST API endpoints delivering aggregated operational data from MySQL",
            "High-contrast interface with accessible dark and light theme options"
        ],
        technicalImplementation:
            "Developed REST endpoints that execute SQL aggregation functions (`COUNT`, `SUM`, `GROUP BY`) to deliver pre-calculated summary metrics to the client. Built modular chart components in React that render dynamic data visualizations with responsive scaling.",
        dataFlow: [
            { step: "1. Date / Filter Select", desc: "Admin selects reporting date range or filter criteria" },
            { step: "2. API Request", desc: "React client requests aggregate analytics data from Express REST API" },
            { step: "3. SQL Aggregation", desc: "Express backend executes optimized SQL queries with indexing" },
            { step: "4. Dashboard Render", desc: "React dashboard widgets and charts re-render with aggregate datasets" }
        ],
        engineeringDecisions: [
            {
                decision: "Backend Data Aggregation",
                rationale: "Computed metrics on the server via SQL aggregations rather than sending large raw datasets to the client."
            },
            {
                decision: "Modular Widget Architecture",
                rationale: "Isolated metric cards, charts, and data tables into independent components for easier maintenance."
            },
            {
                decision: "Server-side Table Pagination",
                rationale: "Structured data table queries with `LIMIT` and `OFFSET` to ensure fast query response times."
            }
        ],
        challenge:
            "Presenting multi-dimensional metrics clearly without overcrowding the interface on smaller desktop and tablet screens.",
        solution:
            "Implemented a responsive CSS grid layout that dynamically reorganizes KPI cards, charts, and user tables based on viewport width.",
        result:
            "A structured administrative dashboard providing real-time operational visibility and efficient user record management.",
        image: "/projects/admin-dashboard.png",
        liveUrl: "",
        githubUrl: "",
        featured: false,
        type: "dashboard",
        accent: "#10b981"
    }
];

export const featuredProject = projects[0];