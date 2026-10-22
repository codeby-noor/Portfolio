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
const buildDirectory = path.resolve(__dirname, "..", "build");
const indexPath = path.join(buildDirectory, "index.html");

if (!fs.existsSync(indexPath)) {
    throw new Error(`Production HTML was not found at ${indexPath}. Run the React production build first.`);
}

let html = fs.readFileSync(indexPath, "utf8");
const rootPlaceholder = '<div id="root"></div>';

if (!html.includes(rootPlaceholder)) {
    throw new Error("Expected the Create React App root element in build/index.html.");
}

const renderedApp = renderToString(React.createElement(App));
html = html.replace(rootPlaceholder, `<div id="root">${renderedApp}</div>`);

const escapeHtmlAttribute = (value) => value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const verificationTags = [
    ["REACT_APP_GOOGLE_SITE_VERIFICATION", "google-site-verification"],
    ["REACT_APP_BING_SITE_VERIFICATION", "msvalidate.01"],
]
    .filter(([environmentVariable]) => process.env[environmentVariable])
    .map(([environmentVariable, name]) => (
        `<meta name="${name}" content="${escapeHtmlAttribute(process.env[environmentVariable])}" />`
    ));

if (verificationTags.length > 0) {
    const closingHead = html.indexOf("</head>");
    if (closingHead === -1) throw new Error("Expected a closing </head> in build/index.html.");
    html = `${html.slice(0, closingHead)}${verificationTags.join("\n")}\n${html.slice(closingHead)}`;
}

fs.writeFileSync(indexPath, html);
console.log(`Pre-rendered the React portfolio into ${indexPath}.`);
