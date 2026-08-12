import { config } from "@electron/constants/config";
import { createSnippetsDir } from "@electron/utils/configDir";
import { readFile, writeFile } from "@electron/utils/fs";
import { generateID } from "@electron/utils/generateID";
import type {
  CreateSnipInput,
  Metadata,
  Snip,
  SnippetFile,
  UpdateSnipInput,
} from "@shared/types/snippets";
import { mkdir, readdir, rm } from "fs/promises";
import path from "path";

export async function getSnips(): Promise<string[]> {
  try {
    createSnippetsDir();

    const entries = await readdir(config.snips.base, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (err) {
    console.error("Failed to load snips:", err);
    return [];
  }
}

export async function getSnip(id: string): Promise<Snip | undefined> {
  try {
    const allSnips = await getSnips();

    if (!allSnips.includes(id)) return undefined;

    const snipDir = path.join(config.snips.base, id);
    const entries = await readdir(snipDir, { withFileTypes: true });

    const metadataPath = path.join(snipDir, config.snips.metadata);
    const metadataRaw = await readFile(metadataPath);
    const metadata: Metadata = JSON.parse(metadataRaw);

    const codeFileEntries = entries.filter(
      (e) => e.name !== config.snips.metadata && e.isFile(),
    );

    const files: SnippetFile[] = await Promise.all(
      codeFileEntries.map(async (e) => {
        const content = await readFile(path.join(snipDir, e.name));
        return {
          name: e.name,
          content,
        };
      }),
    );

    return { metadata, files };
  } catch (err) {
    console.error(`Failed to load snip [${id}]:`, err);
    return undefined;
  }
}

export async function createSnip(input: CreateSnipInput): Promise<Snip> {
  createSnippetsDir();

  const id = generateID();
  const snipDir = path.join(config.snips.base, id);

  await mkdir(snipDir, { recursive: true });

  const now = new Date().toISOString();
  const metadata: Metadata = {
    id,
    title: input.title,
    description: input.description,
    tags: input.tags ?? [],
    starred: input.starred ?? false,
    createdAt: now,
    updatedAt: now,
  };

  const metadataPath = path.join(snipDir, config.snips.metadata);

  await Promise.all([
    writeFile(metadataPath, JSON.stringify(metadata, null, 2)),
    ...input.files.map((file) =>
      writeFile(path.join(snipDir, file.name), file.content),
    ),
  ]);

  return { metadata, files: input.files };
}

export async function updateSnip(
  id: string,
  input: UpdateSnipInput,
): Promise<Snip | undefined> {
  const existingSnip = await getSnip(id);
  if (!existingSnip) {
    console.error(`Cannot update: Snippet [${id}] not found.`);
    return undefined;
  }

  const snipDir = path.join(config.snips.base, id);

  const updatedMetadata: Metadata = {
    ...existingSnip.metadata,
    ...(input.title !== undefined && { title: input.title }),
    ...(input.description !== undefined && { description: input.description }),
    ...(input.tags !== undefined && { tags: input.tags }),
    ...(input.starred !== undefined && { starred: input.starred }),
    ...(input.updatedAt === undefined
      ? { updatedAt: new Date().toISOString() }
      : { updatedAt: input.updatedAt }),
  };

  const metadataPath = path.join(snipDir, config.snips.metadata);
  await writeFile(metadataPath, JSON.stringify(updatedMetadata, null, 2));

  let updatedFiles = existingSnip.files;

  if (input.files) {
    updatedFiles = input.files;
    const existingEntries = await readdir(snipDir, { withFileTypes: true });

    const activeFileNames = new Set([
      config.snips.metadata,
      ...input.files.map((f) => f.name),
    ]);

    const deletePromises = existingEntries
      .filter((e) => e.isFile() && !activeFileNames.has(e.name))
      .map((e) => rm(path.join(snipDir, e.name)));

    const writePromises = input.files.map((file) =>
      writeFile(path.join(snipDir, file.name), file.content),
    );

    await Promise.all([...deletePromises, ...writePromises]);
  }

  return {
    metadata: updatedMetadata,
    files: updatedFiles,
  };
}

export async function deleteSnip(id: string): Promise<boolean> {
  try {
    const allSnips = await getSnips();

    if (!allSnips.includes(id)) {
      console.warn(`Cannot delete: Snippet [${id}] not found.`);
      return false;
    }

    const snipDir = path.join(config.snips.base, id);

    await rm(snipDir, { recursive: true, force: true });

    return true;
  } catch (err) {
    console.error(`Failed to delete snip [${id}]:`, err);
    return false;
  }
}

export async function getAllSnips(): Promise<Snip[]> {
  try {
    const snipIDs = await getSnips();

    const snips = await Promise.all(snipIDs.map((id) => getSnip(id)));

    return snips.filter((s): s is Snip => s !== undefined);
  } catch (err) {
    console.error("Failed to get all snips:", err);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const allSnips = await getAllSnips();

    const tagsSet = new Set<string>();

    for (const snip of allSnips) {
      if (snip.metadata.tags) {
        for (const tag of snip.metadata.tags) {
          tagsSet.add(tag);
        }
      }
    }

    return Array.from(tagsSet).sort();
  } catch (err) {
    console.error("Failed to get all tags:", err);
    return [];
  }
}

export async function getStarredSnips(): Promise<Snip[]> {
  try {
    const allSnips = await getAllSnips();
    return allSnips.filter((snip) => Boolean(snip.metadata.starred));
  } catch (err) {
    console.error("Failed to get starred snips:", err);
    return [];
  }
}

export async function starSnip(id: string): Promise<Snip | undefined> {
  try {
    const existingSnip = await getSnip(id);
    if (!existingSnip) {
      console.warn(`Cannot star/unstar: Snippet [${id}] not found.`);
      return undefined;
    }

    const currentStarred = Boolean(existingSnip.metadata.starred);
    const updatedAt = existingSnip.metadata.updatedAt;

    return await updateSnip(id, {
      starred: !currentStarred,
      updatedAt,
    });
  } catch (err) {
    console.error(`Failed to toggle star for snip [${id}]:`, err);
    return undefined;
  }
}
