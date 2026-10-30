// Node.js test for analytics module and event tracking verification
const assert = require("assert");

// Setup simulated browser environment
global.window = {
    location: {
        pathname: "/",
        href: "https://www.mahenoorshaikh.in/",
    },
    dataLayer: [],
    addEventListener: (event, handler) => {
        global.windowHandlers = global.windowHandlers || {};
        global.windowHandlers[event] = handler;
    },
};
global.document = {
    title: "Mahenoor Shaikh | Full-Stack Web Developer",
    head: {
        appendChild: (elem) => {},
    },
    createElement: (tag) => ({
        tag,
        setAttribute: () => {},
    }),
    querySelector: (selector) => null,
    addEventListener: (event, handler) => {
        global.documentHandlers = global.documentHandlers || {};
        global.documentHandlers[event] = handler;
    },
};
global.navigator = {
    doNotTrack: "0",
};

// Import analytics module (using babel or compiled code)
process.env.NODE_ENV = "production";
const babel = require("@babel/core");
const reactAppPreset = require.resolve("babel-preset-react-app");
const fs = require("fs");
const path = require("path");

const analyticsSource = fs.readFileSync(path.join(__dirname, "..", "src", "analytics.js"), "utf8");
const transformed = babel.transformSync(analyticsSource, {
    presets: [[reactAppPreset, { runtime: "automatic" }]],
    filename: "analytics.js",
}).code;

// Run the transformed code in a function context
const moduleExports = {};
const evaluateModule = new Function("exports", "require", "module", "process", transformed);
evaluateModule(moduleExports, require, { exports: moduleExports }, process);

console.log("=== RUNNING ANALYTICS SUITE ===");

// 1. Initialize Analytics
moduleExports.initializeAnalytics();
console.log("dataLayer length after init:", global.window.dataLayer.length);
assert.ok(global.window.dataLayer.length >= 2, "dataLayer should have js timestamp, config, and page_view");

// Check first event is config or js
console.log("dataLayer[0]:", global.window.dataLayer[0]);
console.log("dataLayer[1]:", global.window.dataLayer[1]);
console.log("dataLayer[2]:", global.window.dataLayer[2]);

// 2. Test trackPageView deduplication
const lengthBeforeDuplicate = global.window.dataLayer.length;
moduleExports.trackPageView("/", "Mahenoor Shaikh | Full-Stack Web Developer");
assert.strictEqual(global.window.dataLayer.length, lengthBeforeDuplicate, "Duplicate page_view within 600ms should be suppressed");
console.log("Page view deduplication verified successfully.");

// 3. Test trackProjectView
const testProject = {
    id: "ecommerce",
    slug: "shopera",
    title: "SHOPERA",
    type: "Full-Stack E-Commerce Platform",
};
moduleExports.trackProjectView(testProject);
const lastEvent = global.window.dataLayer[global.window.dataLayer.length - 1];
assert.strictEqual(lastEvent[0], "event");
assert.strictEqual(lastEvent[1], "project_view");
assert.strictEqual(lastEvent[2].project_id, "ecommerce");
assert.strictEqual(lastEvent[2].project_name, "SHOPERA");
console.log("project_view event verified successfully:", lastEvent[2]);

// 4. Test simulated click delegation: Resume download
const clickHandler = global.documentHandlers["click"];
assert.ok(typeof clickHandler === "function", "Document click handler should be registered");

const simulateClick = (element) => {
    clickHandler({
        target: {
            closest: (selector) => {
                if (selector === "a[href]") return element;
                if (element._matches && element._matches(selector)) return element;
                return null;
            },
        },
    });
};

// 4a. Click Resume
simulateClick({
    getAttribute: (attr) => (attr === "href" ? "/resume.pdf" : null),
    hasAttribute: (attr) => attr === "download",
});
const resumeEvent = global.window.dataLayer[global.window.dataLayer.length - 1];
assert.strictEqual(resumeEvent[1], "resume_download");
assert.strictEqual(resumeEvent[2].file_name, "resume.pdf");
console.log("resume_download event verified:", resumeEvent[2]);

// 4b. Click Email
simulateClick({
    getAttribute: (attr) => (attr === "href" ? "mailto:Mahenoorshaikh0408@gmail.com" : null),
    hasAttribute: () => false,
});
const emailEvent = global.window.dataLayer.find((e) => e[1] === "email_click");
assert.ok(emailEvent, "email_click event should exist");
assert.strictEqual(emailEvent[2].method, "email");
console.log("email_click event verified:", emailEvent[2]);

// 4c. Click LinkedIn
simulateClick({
    getAttribute: (attr) => (attr === "href" ? "https://www.linkedin.com/in/mahenoor-shaikh-994125350/" : null),
    hasAttribute: () => false,
});
const linkedinEvent = global.window.dataLayer.find((e) => e[1] === "social_link_click" && e[2].platform === "linkedin");
assert.ok(linkedinEvent, "social_link_click for linkedin should exist");
console.log("social_link_click (LinkedIn) verified:", linkedinEvent[2]);

// 4d. Click Project Live Demo
simulateClick({
    getAttribute: (attr) => (attr === "href" ? "https://shopera-ecommerce-frontend.vercel.app/" : null),
    hasAttribute: () => false,
    closest: (selector) => {
        if (selector === "a[href]") return { getAttribute: () => "https://shopera-ecommerce-frontend.vercel.app/" };
        return null;
    },
});
const demoEvent = global.window.dataLayer.find((e) => e[1] === "project_website_click");
assert.ok(demoEvent, "project_website_click event should exist");
assert.strictEqual(demoEvent[2].project_name, "SHOPERA");
console.log("project_website_click verified:", demoEvent[2]);

console.log("\nALL 9 ANALYTICS TESTS PASSED WITH 100% SUCCESS!");
