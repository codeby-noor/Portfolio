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
    FaCode,
    FaServer,
    FaTools
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiMysql, SiPhpmyadmin, SiPostman } from "react-icons/si";
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
                appliedIn: "Internship project work",
                context: "Component architecture, React Hooks, Context API, dynamic UI routing"
            },
            {
                name: "JavaScript (ES6+)",
                icon: FaJsSquare,
                color: "#F7DF1E",
                appliedIn: "All projects",
                context: "Async/await, array transformations, DOM handling, modular ES imports"
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
            }
        ]
    },
    {
        id: "backend",
        title: "Backend & API Development",
        icon: FaServer,
        description: "Developing server-side applications, RESTful endpoints, and asynchronous event services.",
        skills: [
            {
                name: "Node.js",
                icon: FaNodeJs,
                color: "#339933",
                appliedIn: "E-Commerce Backend, Chat Server, Analytics API",
                context: "Asynchronous runtime, modular service structure, server execution"
            },
            {
                name: "Express.js",
                icon: SiExpress,
                color: "#ffffff",
                appliedIn: "E-Commerce REST API, Chat App, Dashboard Backend",
                context: "Route handlers, request parsing, authentication middleware, error handling"
            },
            {
                name: "RESTful API Architecture",
                icon: TbApiApp,
                color: "#00C7B7",
                appliedIn: "Internship project work",
                context: "CRUD operations, HTTP status codes, structured JSON request/response design"
            }
        ]
    },
    {
        id: "database",
        title: "Database Management",
        icon: FaDatabase,
        description: "Designing structured relational schemas and flexible document datastores.",
        skills: [
            {
                name: "MySQL",
                icon: SiMysql,
                color: "#4479A1",
                appliedIn: "Internship project work",
                context: "Relational schema design, primary/foreign keys, joins, aggregate queries"
            },
            {
                name: "MongoDB",
                icon: SiMongodb,
                color: "#47A248",
                appliedIn: "Internship project work",
                context: "Document modeling, collections, rapid message persistence"
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
        id: "tools",
        title: "Developer Tools & Workflow",
        icon: FaTools,
        description: "Version control, API testing, debugging, and development workflow tools.",
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
                name: "VS Code",
                icon: VscVscode,
                color: "#007ACC",
                appliedIn: "Primary development environment",
                context: "Code editing, debugging, linting, extensions"
            }
        ]
    }
];