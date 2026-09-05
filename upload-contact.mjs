import fs from "fs";
import path from "path";

const REPO = "contact-tsandeep/contact-tsandeep.github.io";
const BRANCH = "main";
const ROOT = "C:/Users/thole/Downloads/sandeep-portfolio/dist";

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

async function getFileSha(url, headers) {
  const r = await fetch(url, { headers });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`get ${url} ${r.status}`);
  const j = await r.json();
  return j.sha;
}

async function putFile(relPath, content, sha, token) {
  const url = `https://api.github.com/repos/${REPO}/contents/${relPath
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
  const body = {
    message: `Update portfolio - ${relPath}`,
    branch: BRANCH,
    content: Buffer.from(content).toString("base64"),
  };
  if (sha) body.sha = sha;
  const r = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "abd-deploy",
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`PUT ${relPath} ${r.status}: ${t}`);
  }
  return r.json();
}

const token = process.env.GH_TOKEN;
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "User-Agent": "abd-deploy",
};

const files = walk(ROOT).map((f) => f.replace(/\\/g, "/"));
console.log(`Found ${files.length} files`);

for (const f of files) {
  const rel = f.replace(ROOT.replace(/\\/g, "/") + "/", "");
  const url = `https://api.github.com/repos/${REPO}/contents/${rel
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
  const sha = await getFileSha(url, headers);
  const content = fs.readFileSync(f);
  process.stdout.write(
    `Uploading ${rel} (${content.length} bytes)${sha ? " (update)" : " (new)"}... `
  );
  await putFile(rel, content, sha, token);
  console.log("ok");
}
console.log("Done");
