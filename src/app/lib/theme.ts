import { type Theme } from "../../shared/types/theme";

export function applyTheme(themeObj: Theme | null): void {
  if (!themeObj) return;

  const root = document.documentElement;
  const theme = themeObj.theme.client;

  if (!theme) return;

  root.style.setProperty("--background-primary", theme.backgroundPrimary);
  root.style.setProperty("--background-secondary", theme.backgroundSecondary);
  root.style.setProperty("--background-tertiary", theme.backgroundTertiary);
  root.style.setProperty("--background-elevated", theme.backgroundElevated);
  root.style.setProperty("--overlay-color", theme.overlayColor);
  root.style.setProperty("--border-color", theme.borderColor);
  root.style.setProperty("--border-color-subtle", theme.borderColorSubtle);
  root.style.setProperty("--text-primary", theme.textPrimary);
  root.style.setProperty("--text-secondary", theme.textSecondary);
  root.style.setProperty("--text-muted", theme.textMuted);
  root.style.setProperty("--accent-color", theme.accentColor);
  root.style.setProperty("--accent-color-hover", theme.accentColorHover);
  root.style.setProperty("--accent-color-muted", theme.accentColorMuted);
  root.style.setProperty("--danger", theme.danger);
  root.style.setProperty("--danger-hover", theme.dangerHover);
  root.style.setProperty("--success", theme.success);
  root.style.setProperty("--warning", theme.warning);
  root.style.setProperty("--tag-background", theme.tagBackground);
  root.style.setProperty("--tag-text", theme.tagText);
  root.style.setProperty("--scrollbar-thumb", theme.scrollbarThumb);
  root.style.setProperty("--scrollbar-track", theme.scrollbarTrack);
  root.style.setProperty("--editor-background", theme.editorBackground);
  root.style.setProperty("--shadow", theme.shadow);
}
