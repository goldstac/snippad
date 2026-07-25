import fs from "fs";
import fsp from "fs/promises";

export async function readFile(relativePath: string) {
  const content = await fsp.readFile(relativePath, "utf-8");

  return content;
}

export async function writeFile(relativePath: string, content: string) {
  await fsp.writeFile(relativePath, content);
}

export async function readDir(relativePath: string) {
  const content = await fsp.readdir(relativePath);

  return content;
}

export async function mkdir(relativePath: string) {
  const content = await fsp.mkdir(relativePath);
  return content;
}

export function exists(relativePath: string) {
  const content = fs.existsSync(relativePath);

  return content;
}
