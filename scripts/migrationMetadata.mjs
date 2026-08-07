function updateFrontmatter(sourceMdx, update) {
  const match = sourceMdx.match(/^---\n([\s\S]*?)\n---\n/);

  if (!match) throw new Error("Frontmatter must start on the first line");

  const nextFrontmatter = update(match[1]);
  return `---\n${nextFrontmatter}\n---\n${sourceMdx.slice(match[0].length)}`;
}

export function addMigrationMetadata(sourceMdx, metadataLines) {
  return updateFrontmatter(sourceMdx, (frontmatter) => {
    return `${metadataLines.join("\n")}\n${frontmatter}`;
  });
}

export function normalizeMetadataNames(sourceMdx) {
  return updateFrontmatter(sourceMdx, (frontmatter) => {
    return frontmatter
      .replace(/^createdAt:/m, "publishedAt:")
      .replace(/^updatedAt:/m, "modifiedAt:")
      .replace(/^release:/m, "isPublished:")
      .replace(/^thumbnail:/m, "coverImage:")
      .replace(/^author:.*\n?/m, "");
  });
}
