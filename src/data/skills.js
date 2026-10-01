import {
    FaHtml5,
    FaCss3Alt,
    FaBootstrap,
    FaJsSquare,
    FaReact,
    FaNodeJs,
    FaDatabase,
    FaGitAlt,
    FaGithub,
    FaNpm,
    FaCode,
    FaServer,
    FaTools,
    FaLayerGroup,
    FaExchangeAlt,
    FaPuzzlePiece,
    FaMagic,
    FaEye,
    FaRoute,
    FaPlug,
    FaGlobe,
    FaLock,
    FaChartLine,
    FaCloud,
    FaMobileAlt,
    FaTable,
    FaKey
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiMysql, SiPhpmyadmin, SiPostman, SiPostgresql, SiSupabase, SiRedux } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbApiApp } from "react-icons/tb";

export const skillCategories = [
    {
        id: "frontend",
        title: "Frontend Development",
        icon: FaCode,
        description: "Building responsive, component-driven user interfaces with the React ecosystem.",
        skills: [
            {
                name: "React.js",
                icon: FaReact,
                color: "#61DAFB",
                appliedIn: "All projects",
                context: "Component architecture, conditional rendering, reusable UI modules"
            },
            {
                name: "React Hooks",
                icon: FaPuzzlePiece,
                color: "#61DAFB",
                appliedIn: "All React work",
                context: "useState, useEffect, useRef, custom hooks for data and UI state"
            },
            {
                name: "JavaScript (ES6+)",
                icon: FaJsSquare,
                color: "#F7DF1E",
                appliedIn: "All projects",
                context: "Async/await, array transformations, DOM handling, modular ES imports"
            },
            {
                name: "React Router",
                icon: FaRoute,
                color: "#CA4245",
                appliedIn: "Multi-view React apps",
                context: "Client-side routing, route params, protected/nested routes"
            },
            {
                name: "Redux & Redux Toolkit",
                icon: SiRedux,
                color: "#764ABC",
                appliedIn: "React state management",
                context: "Slices, store configuration, predictable global state updates"
            },
            {
                name: "Axios",
                icon: FaExchangeAlt,
                color: "#5A29E4",
                appliedIn: "API-connected views",
                context: "HTTP requests, interceptors, async data fetching with loading states"
            },
            {
                name: "HTML5 & Semantic Markup",
                icon: FaHtml5,
                color: "#E34F26",
                appliedIn: "All projects",
                context: "Accessible heading hierarchy, semantic landmarks, form controls"
            },
            {
                name: "CSS3 & Modern Layouts",
                icon: FaCss3Alt,
                color: "#1572B6",
                appliedIn: "All projects",
                context: "Flexbox, CSS Grid, Custom Properties (variables), responsive media queries"
            },
            {
                name: "Bootstrap",
                icon: FaBootstrap,
                color: "#7952B3",
                appliedIn: "Internship project work",
                context: "Rapid UI prototyping, grid alignment, modal & form layouts"
            },
            {
                name: "React Bootstrap",
                icon: FaLayerGroup,
                color: "#7952B3",
                appliedIn: "React interfaces",
                context: "Prebuilt accessible components composed into React views"
            },
            {
                name: "Framer Motion",
                icon: FaMagic,
                color: "#FF0080",
                appliedIn: "Portfolio interface",
                context: "Entrance reveals, micro-interactions, spring-based motion"
            },
            {
                name: "AOS",
                icon: FaEye,
                color: "#4DD0E1",
                appliedIn: "Scroll-based reveals",
                context: "Animate-on-scroll section entrances with tuned offsets"
            }
        ]
    },
    {
        id: "backend",
        title: "Backend & API Development",
        icon: FaServer,
        description: "Developing server-side applications, RESTful endpoints, and API integrations.",
        skills: [
            {
                name: "Node.js",
                icon: FaNodeJs,
                color: "#339933",
                appliedIn: "API-backed projects",
                context: "Asynchronous runtime, modular service structure, server execution"
            },
            {
                name: "Express.js",
                icon: SiExpress,
                color: "#ffffff",
                appliedIn: "REST API projects",
                context: "Route handlers, request parsing, validation, structured error handling"
            },
            {
                name: "REST APIs",
                icon: TbApiApp,
                color: "#00C7B7",
                appliedIn: "Internship project work",
                context: "CRUD operations, HTTP status codes, structured JSON request/response design"
            },
            {
                name: "API Integration",
                icon: FaPlug,
                color: "#FFB300",
                appliedIn: "Frontend + Supabase work",
                context: "Connecting UI to REST and Supabase endpoints with error handling"
            },
            {
                name: "CORS",
                icon: FaGlobe,
                color: "#29B6F6",
                appliedIn: "Client-server projects",
                context: "Cross-origin configuration for decoupled frontend/backend setups"
            },
            {
                name: "Authentication / Authorization",
                icon: FaLock,
                color: "#EF5350",
                appliedIn: "Diamond Finance",
                context: "Supabase Auth sessions, protected routes, role-aware access"
            }
        ]
    },
    {
        id: "database",
        title: "Database & Backend Services",
        icon: FaDatabase,
        description: "Designing structured relational data and working with managed backend platforms.",
        skills: [
            {
                name: "PostgreSQL",
                icon: SiPostgresql,
                color: "#336791",
                appliedIn: "Diamond Finance",
                context: "Relational schema design, relations, filtered queries, aggregations"
            },
            {
                name: "Supabase",
                icon: SiSupabase,
                color: "#3ECF8E",
                appliedIn: "Diamond Finance",
                context: "Postgres hosting, database integration, analytics and reporting queries"
            },
            {
                name: "Supabase Auth",
                icon: FaKey,
                color: "#3ECF8E",
                appliedIn: "Diamond Finance",
                context: "Email authentication, session handling, authorized-only data access"
            },
            {
                name: "MySQL",
                icon: SiMysql,
                color: "#4479A1",
                appliedIn: "AI Jamin",
                context: "Relational schema design, primary/foreign keys, joins, aggregate queries"
            },
            {
                name: "MongoDB",
                icon: SiMongodb,
                color: "#47A248",
                appliedIn: "Prior project work",
                context: "Document modeling, collections, flexible record structures"
            }
        ]
    },
    {
        id: "tools",
        title: "Developer Tools & Workflow",
        icon: FaTools,
        description: "Version control, API testing, package management, and development workflow tools.",
        skills: [
            {
                name: "Git & Version Control",
                icon: FaGitAlt,
                color: "#F05032",
                appliedIn: "All project repositories",
                context: "Branching, feature commits, conflict resolution, version tracking"
            },
            {
                name: "GitHub",
                icon: FaGithub,
                color: "#ffffff",
                appliedIn: "Personal portfolio",
                context: "Code hosting, documentation, open source project structure"
            },
            {
                name: "Postman",
                icon: SiPostman,
                color: "#FF6C37",
                appliedIn: "API development",
                context: "Endpoint testing, request payload inspection, status code verification"
            },
            {
                name: "npm",
                icon: FaNpm,
                color: "#CB3837",
                appliedIn: "All projects",
                context: "Dependency management, scripts, production builds"
            },
            {
                name: "VS Code",
                icon: VscVscode,
                color: "#007ACC",
                appliedIn: "Primary development environment",
                context: "Code editing, debugging, linting, extensions"
            },
            {
                name: "phpMyAdmin",
                icon: SiPhpmyadmin,
                color: "#6C78AF",
                appliedIn: "MySQL database administration",
                context: "Table structures, query testing, index configuration"
            }
        ]
    },
    {
        id: "practices",
        title: "Engineering Practices",
        icon: FaChartLine,
        description: "How the stack comes together — responsive delivery from database to deployed UI.",
        skills: [
            {
                name: "Responsive & Mobile-first Design",
                icon: FaMobileAlt,
                color: "#29B6F6",
                appliedIn: "All projects",
                context: "Mobile-first layouts scaling fluidly across phone, tablet, and desktop"
            },
            {
                name: "CRUD Applications",
                icon: FaTable,
                color: "#66BB6A",
                appliedIn: "Diamond Finance, AI Jamin",
                context: "Create, read, update, and delete flows with validation and feedback states"
            },
            {
                name: "Database Integration",
                icon: FaDatabase,
                color: "#AB47BC",
                appliedIn: "Diamond Finance, AI Jamin",
                context: "Wiring UI actions to Supabase/PostgreSQL and MySQL persistence layers"
            },
            {
                name: "Analytics Integration",
                icon: FaChartLine,
                color: "#FFA726",
                appliedIn: "Diamond Finance",
                context: "Aggregated reporting views computed from structured financial data"
            },
            {
                name: "Deployment / Production Builds",
                icon: FaCloud,
                color: "#26C6DA",
                appliedIn: "Live projects",
                context: "Optimized production builds and hosting configuration"
            }
        ]
    }
];
