import pkg from "@pkg" with { type: "json" };
import { gt, valid } from "semver";

async function syncVersion() {
  await window.store.set("version", pkg.version);
}

export async function isUpdated() {
  const pkgVersion = pkg.version;
  const storedVersion = await window.store.get("version");

  const updated = valid(storedVersion) ? gt(pkgVersion, storedVersion) : null;

  await syncVersion();

  return updated;
}
