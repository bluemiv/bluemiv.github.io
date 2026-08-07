const HEADING_TAG_PATTERN = /^h([2-4])$/;
const HEADING_NUMBER_PATTERN = /^\s*\d+(?:\.\d+)*\.?\s+/;

function stripNumberFromFirstTextNode(node) {
  if (node.type === "text") {
    node.value = node.value.replace(HEADING_NUMBER_PATTERN, "");
    return true;
  }

  if (!Array.isArray(node.children)) return false;

  for (const child of node.children) {
    if (stripNumberFromFirstTextNode(child)) return true;
  }

  return false;
}

function createHeadingNumber(depth, counters) {
  const counterIndex = depth - 2;
  counters[counterIndex] += 1;

  for (let index = counterIndex + 1; index < counters.length; index += 1) {
    counters[index] = 0;
  }

  return counters
    .slice(0, counterIndex + 1)
    .map((value) => String(value).padStart(2, "0"))
    .join(".");
}

export default function rehypeArticleHeadings() {
  return (tree) => {
    const counters = [0, 0, 0];

    function visit(node) {
      if (node.type === "element") {
        const match = node.tagName.match(HEADING_TAG_PATTERN);

        if (match) {
          const depth = Number(match[1]);
          const number = createHeadingNumber(depth, counters);
          stripNumberFromFirstTextNode(node);
          node.children.unshift({
            type: "element",
            tagName: "span",
            properties: {
              ariaHidden: "true",
              className: ["article-heading-number"],
            },
            children: [{ type: "text", value: number }],
          });
        }
      }

      if (Array.isArray(node.children)) node.children.forEach(visit);
    }

    visit(tree);
  };
}
