export const parseTags = (str: string): string[] =>
  Array.from(
    new Set(
      str
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    ),
  );
