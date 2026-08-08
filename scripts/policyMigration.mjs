const SAFE_ATTRIBUTE_NAMES = new Set(["colspan", "href", "lang", "rel", "rowspan", "target"]);

const LEGACY_AUTHOR_PATTERNS = [
  /([가-힣]{2,4})\s*\(직책\/직급:\s*없음\)/g,
  /([A-Z][a-z]+ [A-Z][a-z]+)\s*\(no formal title\/position\)/g,
  /([A-Z][a-z]+ [A-Z][a-z]+)（職名・職位：なし）/g,
  /([A-Z][a-z]+ [A-Z][a-z]+)（无职务\/职级）/g,
];

const PRIVATE_TEXT_REPLACEMENTS = [
  [/\+82-10-\d{3,4}-\d{4}\s*,?\s*/g, ""],
  [/public\.(?!bluemiv@)[\w.-]+@gmail\.com/gi, "public.bluemiv@gmail.com"],
  [
    /((?:<span>(?:privacy officer|data protection contact|name|氏名|성명|担当者|個人情報保護責任者|담당자|개인정보 보호책임자)<\/span>|privacy officer|data protection contact|担当者|個人情報保護責任者|담당자|개인정보 보호책임자)\s*:\s*)[^<]+/gi,
    "$1Bluemiv",
  ],
  [/\{appName\}/g, "KPOP Clip"],
];

function removeLegacyAuthorNames(html) {
  const names = LEGACY_AUTHOR_PATTERNS.flatMap((pattern) => {
    return [...html.matchAll(pattern)].map((match) => match[1]);
  });

  let sanitizedHtml = html;
  for (const pattern of LEGACY_AUTHOR_PATTERNS) {
    sanitizedHtml = sanitizedHtml.replace(pattern, "Bluemiv");
  }
  for (const name of new Set(names)) {
    sanitizedHtml = sanitizedHtml.replaceAll(name, "Bluemiv");
  }

  return sanitizedHtml;
}

function normalizeInternalHref(href) {
  if (!href.startsWith("/") || href === "/" || href.includes("#") || /\.[a-z0-9]+$/i.test(href)) {
    return href;
  }

  return `${href.replace(/\/+$/, "")}/`;
}

function sanitizeAttributes(rawAttributes) {
  const attributes = [];
  const attributePattern = /\s+([a-zA-Z][\w:-]*)=("[^"]*"|'[^']*')/g;

  for (const match of rawAttributes.matchAll(attributePattern)) {
    const name = match[1].toLowerCase();
    if (!SAFE_ATTRIBUTE_NAMES.has(name)) continue;

    const quote = match[2][0];
    let value = match[2].slice(1, -1);

    if (name === "href") {
      if (/^(?:javascript|data):/i.test(value)) continue;
      value = normalizeInternalHref(value);
    }

    attributes.push(`${name}=${quote}${value}${quote}`);
  }

  return attributes.length ? ` ${attributes.join(" ")}` : "";
}

export function sanitizePolicyHtml(mainHtml) {
  const mainMatch = mainHtml.match(/^\s*<main\b[^>]*>([\s\S]*)<\/main>\s*$/i);
  if (!mainMatch) throw new Error("Policy source must contain one main element");

  let html = mainMatch[1]
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, "")
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<([a-z][a-z0-9-]*)([^>]*)>/gi, (_, tagName, rawAttributes) => {
      return `<${tagName.toLowerCase()}${sanitizeAttributes(rawAttributes)}>`;
    });

  html = removeLegacyAuthorNames(html);

  for (const [pattern, replacement] of PRIVATE_TEXT_REPLACEMENTS) {
    html = html.replace(pattern, replacement);
  }

  return html
    .replace(/<div>\s*<\/div>/g, "")
    .replace(/<span>\s*<\/span>/g, "")
    .replace(/<li>\s*전화:\s*<\/li>/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function inferPolicyLocale(routePath) {
  const lastSegment = routePath.split("/").filter(Boolean).at(-1);

  if (lastSegment === "en") return "en";
  if (lastSegment === "jp") return "ja";
  if (lastSegment === "cn") return "zh-CN";
  return "ko";
}
