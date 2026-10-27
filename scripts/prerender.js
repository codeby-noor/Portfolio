const fs = require("fs");
const path = require("path");

process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";
require("react-scripts/config/env");

const sourceDirectory = path.resolve(__dirname, "..", "src") + path.sep;
const babel = require("@babel/core");
const reactAppPreset = require.resolve("babel-preset-react-app");

for (const extension of [".js", ".jsx"]) {
    const originalLoader = require.extensions[extension];

    require.extensions[extension] = (module, filename) => {
        if (!filename.startsWith(sourceDirectory)) {
            if (originalLoader) return originalLoader(module, filename);
            return module._compile(fs.readFileSync(filename, "utf8"), filename);
        }

        const result = babel.transformFileSync(filename, {
            babelrc: false,
            configFile: false,
            presets: [[reactAppPreset, { runtime: "automatic" }]],
        });
        module._compile(result.code, filename);
    };
}

require.extensions[".css"] = () => {};

const React = require("react");
const { renderToString } = require("react-dom/server");
const App = require(path.resolve(sourceDirectory, "App.jsx")).default;
const { projects } = require(path.resolve(sourceDirectory, "data", "projects.js"));
const buildDirectory = path.resolve(__dirname, "..", "build");
const indexPath = path.join(buildDirectory, "index.html");

if (!fs.existsSync(indexPath)) {
    throw new Error(`Production HTML was not found at ${indexPath}. Run the React production build first.`);
}

const template = fs.readFileSync(indexPath, "utf8");
const rootPlaceholder = '<div id="root"></div>';

if (!template.includes(rootPlaceholder)) {
    throw new Error("Expected the Create React App root element in build/index.html.");
}

const escapeHtml = (value) => value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;");

const verificationTags = [
    ["REACT_APP_GOOGLE_SITE_VERIFICATION", "google-site-verification"],
    ["REACT_APP_BING_SITE_VERIFICATION", "msvalidate.01"],
]
    .filter(([environmentVariable]) => process.env[environmentVariable])
    .map(([environmentVariable, name]) => (
    `<meta name="${name}" content="${escapeHtml(process.env[environmentVariable])}" />`
    ));

const withVerificationTags = (html) => {
if (verificationTags.length === 0) return html;
const closingHead = html.indexOf("</head>");
if (closingHead === -1) throw new Error("Expected a closing </head> in build/index.html.");
return `${html.slice(0, closingHead)}${verificationTags.join("\n")}\n${html.slice(closingHead)}`;
};

const personId = "https://www.mahenoorshaikh.in/#person";
const websiteId = "https://www.mahenoorshaikh.in/#website";
const websiteName = "Mahenoor Shaikh | Full-Stack Web Developer";
const homepageDescription = "Mahenoor Shaikh is a Full-Stack Web Developer in Navsari, India, building React and Node.js apps with REST APIs, MySQL, and MongoDB.";

const makeStructuredData = (page) => {
const graph = [
    {
        "@type": "Person",
        "@id": personId,
        "name": "Mahenoor Shaikh",
        "alternateName": "Mahenoor Asif Shaikh",
        "jobTitle": "Full-Stack Web Developer",
        "description": "Full-Stack Web Developer based in Navsari, India.",
        "url": "https://www.mahenoorshaikh.in/",
        "image": "https://www.mahenoorshaikh.in/social-card.png",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Navsari",
            "addressRegion": "Gujarat",
            "addressCountry": "IN",
        },
        "sameAs": [
            "https://github.com/codeby-noor",
            "https://www.linkedin.com/in/mahenoor-shaikh-994125350/",
        ],
        "knowsAbout": [
            "React.js",
            "JavaScript",
            "Node.js",
            "Express.js",
            "REST APIs",
            "MySQL",
            "MongoDB",
        ],
    },
    {
        "@type": "WebSite",
        "@id": websiteId,
        "url": "https://www.mahenoorshaikh.in/",
        "name": websiteName,
        "inLanguage": "en-IN",
        "creator": { "@id": personId },
    },
];

if (page.project) {
    const workId = `${page.canonical}#project`;
    graph.push(
        {
            "@type": "CreativeWork",
            "@id": workId,
            "name": page.project.detailTitle,
            "description": page.description,
            "url": page.canonical,
            "keywords": page.project.technologies,
        },
        {
            "@type": "WebPage",
            "@id": `${page.canonical}#webpage`,
            "url": page.canonical,
            "name": page.title,
            "description": page.description,
            "inLanguage": "en-IN",
            "mainEntity": { "@id": workId },
            "about": { "@id": personId },
            "isPartOf": { "@id": websiteId },
        }
    );
} else {
    graph.push({
        "@type": "WebPage",
        "@id": "https://www.mahenoorshaikh.in/#webpage",
        "url": page.canonical,
        "name": page.title,
        "description": page.description,
        "inLanguage": "en-IN",
        "mainEntity": { "@id": personId },
        "isPartOf": { "@id": websiteId },
    });
}
return { "@context": "https://schema.org", "@graph": graph };
};

const replaceRequired = (html, pattern, replacement, label) => {
if (!pattern.test(html)) throw new Error(`Expected ${label} in the HTML template.`);
return html.replace(pattern, replacement);
};

const renderPage = (page) => {
let html = withVerificationTags(template);
html = replaceRequired(html, /<title>.*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`, "title");
html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]+"\/?>/,
    `<link rel="canonical" href="${escapeHtml(page.canonical)}"/>`,
    "canonical link"
);
html = replaceRequired(
    html,
    /<meta name="description" content="[^"]*"\/?>/,
    `<meta name="description" content="${escapeHtml(page.description)}"/>`,
    "meta description"
);

const socialMetadata = [
    [/<meta property="og:url" content="[^"]*"\/?>/, `<meta property="og:url" content="${escapeHtml(page.canonical)}"/>`, "Open Graph URL"],
    [/<meta property="og:title" content="[^"]*"\/?>/, `<meta property="og:title" content="${escapeHtml(page.title)}"/>`, "Open Graph title"],
    [/<meta property="og:description" content="[^"]*"\/?>/, `<meta property="og:description" content="${escapeHtml(page.description)}"/>`, "Open Graph description"],
    [/<meta name="twitter:title" content="[^"]*"\/?>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}"/>`, "Twitter title"],
    [/<meta name="twitter:description" content="[^"]*"\/?>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}"/>`, "Twitter description"],
];
for (const [pattern, replacement, label] of socialMetadata) {
    html = replaceRequired(html, pattern, replacement, label);
}

html = replaceRequired(
    html,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${JSON.stringify(makeStructuredData(page))}</script>`,
    "JSON-LD structured data"
);

const renderedApp = renderToString(React.createElement(App, { initialPath: page.path }));
html = replaceRequired(html, /<div id="root"><\/div>/, `<div id="root">${renderedApp}</div>`, "empty React root");
return html;
};

const homepage = {
path: "/",
canonical: "https://www.mahenoorshaikh.in/",
title: websiteName,
description: homepageDescription,
};
fs.writeFileSync(indexPath, renderPage(homepage));
console.log(`Pre-rendered the portfolio homepage into ${indexPath}.`);

for (const project of projects) {
const projectPath = `/projects/${project.slug}`;
const projectPage = {
    path: projectPath,
    canonical: `https://www.mahenoorshaikh.in${projectPath}`,
    title: project.metaTitle || `${project.detailTitle} | Mahenoor Shaikh`,
    description: project.metaDescription,
    project,
};
const outputDirectory = path.join(buildDirectory, "projects", project.slug);
fs.mkdirSync(outputDirectory, { recursive: true });
const outputPath = path.join(outputDirectory, "index.html");
fs.writeFileSync(outputPath, renderPage(projectPage));
console.log(`Pre-rendered ${projectPath} into ${outputPath}.`);
}
