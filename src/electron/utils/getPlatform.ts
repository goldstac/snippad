export function getPlatform() {
  switch (process.platform) {
    case "darwin":
      return "mac";
    case "linux":
      return "linux";
    default:
      return "windows";
  }
}
