const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "build", "index.html"), "utf8");
const shoperaHtml = fs.readFileSync(path.join(root, "build", "projects", "shopera", "index.html"), "utf8");
const codequestHtml = fs.readFileSync(path.join(root, "build", "projects", "codequest", "index.html"), "utf8");
const sitemapXml = fs.readFileSync(path.join(root, "build", "sitemap.xml"), "utf8");
const robotsTxt = fs.readFileSync(path.join(root, "build", "robots.txt"), "utf8");

console.log("=== AUDIT VERIFICATION RESULTS ===");

// 1. Google Tag verification
const indexGtagMatches = indexHtml.match(/googletagmanager\.com\/gtag\/js\?id=G-R974K3STNH/g) || [];
const shoperaGtagMatches = shoperaHtml.match(/googletagmanager\.com\/gtag\/js\?id=G-R974K3STNH/g) || [];
const codequestGtagMatches = codequestHtml.match(/googletagmanager\.com\/gtag\/js\?id=G-R974K3STNH/g) || [];

console.log("Google Tag G-R974K3STNH in index.html:", indexGtagMatches.length, "times (Expected: 1)");
console.log("Google Tag G-R974K3STNH in shopera/index.html:", shoperaGtagMatches.length, "times (Expected: 1)");
console.log("Google Tag G-R974K3STNH in codequest/index.html:", codequestGtagMatches.length, "times (Expected: 1)");

// 2. Google Search Console Verification Meta Tag
const indexGsc = indexHtml.match(/name="google-site-verification" content="HjdUGLz1wI-U58978j2tA95iQAbMrr5H5mW_0qpv2kU"/g) || [];
const shoperaGsc = shoperaHtml.match(/name="google-site-verification" content="HjdUGLz1wI-U58978j2tA95iQAbMrr5H5mW_0qpv2kU"/g) || [];
const codequestGsc = codequestHtml.match(/name="google-site-verification" content="HjdUGLz1wI-U58978j2tA95iQAbMrr5H5mW_0qpv2kU"/g) || [];

console.log("Google Site Verification in index.html:", indexGsc.length, "times (Expected: 1)");
console.log("Google Site Verification in shopera/index.html:", shoperaGsc.length, "times (Expected: 1)");
console.log("Google Site Verification in codequest/index.html:", codequestGsc.length, "times (Expected: 1)");

// 3. Canonicals
const getCanonical = (html) => {
    const match = html.match(/<link rel="canonical" href="([^"]+)"\s*\/?>/);
    return match ? match[1] : null;
};
console.log("Canonical (index.html):", getCanonical(indexHtml));
console.log("Canonical (shopera):", getCanonical(shoperaHtml));
console.log("Canonical (codequest):", getCanonical(codequestHtml));

// 4. Social Cards & OpenGraph
const getOgImage = (html) => {
    const match = html.match(/<meta property="og:image" content="([^"]+)"\s*\/?>/);
    return match ? match[1] : null;
};
console.log("OG Image (index.html):", getOgImage(indexHtml));
console.log("OG Image (shopera):", getOgImage(shoperaHtml));
console.log("OG Image (codequest):", getOgImage(codequestHtml));

// 5. JSON-LD Schema
const getSchema = (html) => {
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    return match ? JSON.parse(match[1]) : null;
};
const indexSchema = getSchema(indexHtml);
const shoperaSchema = getSchema(shoperaHtml);
console.log("Schema Graph Types (index.html):", indexSchema["@graph"].map((e) => e["@type"]));
console.log("Schema Graph Types (shopera):", shoperaSchema["@graph"].map((e) => e["@type"]));

// 6. Robots.txt and Sitemap.xml
console.log("\n--- ROBOTS.TXT ---");
console.log(robotsTxt.trim());

console.log("\n--- SITEMAP.XML ---");
console.log(sitemapXml.trim());
