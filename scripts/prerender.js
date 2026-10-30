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

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/'/g, "&#39;");

const defaultGoogleVerification = "HjdUGLz1wI-U58978j2tA95iQAbMrr5H5mW_0qpv2kU";
const googleVerification = process.env.REACT_APP_GOOGLE_SITE_VERIFICATION || defaultGoogleVerification;
const bingVerification = process.env.REACT_APP_BING_SITE_VERIFICATION;

const withVerificationTags = (html) => {
    let result = html;
    if (result.includes('name="google-site-verification"')) {
        result = result.replace(
            /<meta name="google-site-verification" content="[^"]*"\s*\/?>/,
            `<meta name="google-site-verification" content="${escapeHtml(googleVerification)}" />`
        );
    } else {
        const closingHead = result.indexOf("</head>");
        if (closingHead === -1) throw new Error("Expected a closing </head> in build/index.html.");
        result = `${result.slice(0, closingHead)}<meta name="google-site-verification" content="${escapeHtml(googleVerification)}" />\n${result.slice(closingHead)}`;
    }

    if (bingVerification) {
        if (result.includes('name="msvalidate.01"')) {
            result = result.replace(
                /<meta name="msvalidate.01" content="[^"]*"\s*\/?>/,
                `<meta name="msvalidate.01" content="${escapeHtml(bingVerification)}" />`
            );
        } else {
            const closingHead = result.indexOf("</head>");
            result = `${result.slice(0, closingHead)}<meta name="msvalidate.01" content="${escapeHtml(bingVerification)}" />\n${result.slice(closingHead)}`;
        }
    }
    return result;
};

const defaultGaMeasurementId = "G-R974K3STNH";
const gaMeasurementId = process.env.REACT_APP_GA_MEASUREMENT_ID || defaultGaMeasurementId;

const withGoogleAnalytics = (html) => {
    if (gaMeasurementId === defaultGaMeasurementId) return html;
    return html
        .replace(/id=G-[A-Z0-9]+/g, `id=${escapeHtml(gaMeasurementId)}`)
        .replace(/'G-[A-Z0-9]+'/g, `'${escapeHtml(gaMeasurementId)}'`);
};

const personId = "https://www.mahenoorshaikh.in/#person";
const websiteId = "https://www.mahenoorshaikh.in/#website";
const websiteName = "Mahenoor Shaikh | Full-Stack Web Developer";
const homepageDescription =
    "Mahenoor Shaikh is a Full-Stack Web Developer in Navsari, India, building React and Node.js apps with REST APIs, MySQL, and MongoDB.";

const makeStructuredData = (page) => {
    const graph = [
        {
            "@type": "Person",
            "@id": personId,
            name: "Mahenoor Shaikh",
            alternateName: "Mahenoor Asif Shaikh",
            jobTitle: "Full-Stack Web Developer",
            description: "Full-Stack Web Developer based in Navsari, India.",
            url: "https://www.mahenoorshaikh.in/",
            image: "https://www.mahenoorshaikh.in/social-card.png",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Navsari",
                addressRegion: "Gujarat",
                addressCountry: "IN",
            },
            sameAs: [
                "https://github.com/codeby-noor",
                "https://www.linkedin.com/in/mahenoor-shaikh-994125350/",
            ],
            knowsAbout: [
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
            url: "https://www.mahenoorshaikh.in/",
            name: websiteName,
            inLanguage: "en-IN",
            creator: { "@id": personId },
        },
    ];

    if (page.project) {
        const workId = `${page.canonical}#project`;
        const projectEntity = {
            "@type": "SoftwareApplication",
            "@id": workId,
            name: page.project.detailTitle || page.project.title,
            description: page.description,
            url: page.canonical,
            applicationCategory: page.project.type && page.project.type.includes("Commerce") ? "BusinessApplication" : "EducationalApplication",
            operatingSystem: "Web",
            author: { "@id": personId },
            keywords: page.project.technologies || [],
        };
        if (page.project.image) {
            projectEntity.image = `https://www.mahenoorshaikh.in${page.project.image}`;
        }
        if (page.project.liveUrl) {
            projectEntity.sameAs = page.project.liveUrl;
        }

        graph.push(
            projectEntity,
            {
                "@type": "WebPage",
                "@id": `${page.canonical}#webpage`,
                url: page.canonical,
                name: page.title,
                description: page.description,
                inLanguage: "en-IN",
                mainEntity: { "@id": workId },
                about: { "@id": personId },
                isPartOf: { "@id": websiteId },
            }
        );
    } else {
        graph.push({
            "@type": "WebPage",
            "@id": "https://www.mahenoorshaikh.in/#webpage",
            url: page.canonical,
            name: page.title,
            description: page.description,
            inLanguage: "en-IN",
            mainEntity: { "@id": personId },
            isPartOf: { "@id": websiteId },
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
    html = withGoogleAnalytics(html);
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

    if (page.project && page.project.image) {
        const fullImageUrl = `https://www.mahenoorshaikh.in${page.project.image}`;
        const imageAlt = page.project.imageAlt || `${page.project.title} preview`;
        html = html.replace(/<meta property="og:image" content="[^"]*"\/?>/, `<meta property="og:image" content="${escapeHtml(fullImageUrl)}"/>`);
        html = html.replace(/<meta property="og:image:secure_url" content="[^"]*"\/?>/, `<meta property="og:image:secure_url" content="${escapeHtml(fullImageUrl)}"/>`);
        html = html.replace(/<meta property="og:image:alt" content="[^"]*"\/?>/, `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}"/>`);
        html = html.replace(/<meta name="twitter:image" content="[^"]*"\/?>/, `<meta name="twitter:image" content="${escapeHtml(fullImageUrl)}"/>`);
        html = html.replace(/<meta name="twitter:image:alt" content="[^"]*"\/?>/, `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}"/>`);
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

// Generate build/sitemap.xml
const sitemapPath = path.join(buildDirectory, "sitemap.xml");
const today = new Date().toISOString().split("T")[0];
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.mahenoorshaikh.in/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
${projects
    .map(
        (p) => `    <url>
        <loc>https://www.mahenoorshaikh.in/projects/${p.slug}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`
    )
    .join("\n")}
</urlset>
`;
fs.writeFileSync(sitemapPath, sitemapContent.trim() + "\n");
console.log(`Generated fresh sitemap at ${sitemapPath}.`);
