import { type Theme } from "@shared/types/theme";

export function applyTheme(themeObj: Theme | null): void {
  if (!themeObj) return;

  const root = document.documentElement;
  const theme = themeObj.theme.client;

  if (!theme) return;

  root.style.setProperty("--bg-primary", theme.backgroundPrimary);
  root.style.setProperty("--bg-secondary", theme.backgroundSecondary);
  root.style.setProperty("--bg-tertiary", theme.backgroundTertiary);
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
  root.style.setProperty("--input-background", theme.inputBackground);
  root.style.setProperty("--scrollbar-thumb", theme.scrollbarThumb);
  root.style.setProperty("--scrollbar-track", theme.scrollbarTrack);
  root.style.setProperty("--shadow", theme.shadow);
}
