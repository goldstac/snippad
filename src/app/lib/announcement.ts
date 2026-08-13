// sha-256 hash
async function hashContent(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function checkAnnouncement(): Promise<string | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/snippad/snippad/contents/announcement.md",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "SnipPad-App",
        },
      },
    );

    if (!res.ok) return null;

    const data = await res.json();

    const base64Content = data.content.replace(/\n/g, "");

    const markdownContent = decodeURIComponent(
      escape(atob(base64Content)),
    ).trim();

    if (!markdownContent) return null;

    const newHash = await hashContent(markdownContent);
    const storedHash = await window.store.get("announcement");

    if (storedHash === newHash) {
      return null;
    }

    await window.store.set("announcement", newHash);
    return markdownContent;
  } catch (error) {
    console.error("Failed to fetch announcement:", error);
    return null;
  }
}
