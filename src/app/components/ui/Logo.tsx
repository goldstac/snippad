import { useTheme } from "@/states/theme/theme";
import { ImgHTMLAttributes, useMemo } from "react";

type LogoProps = ImgHTMLAttributes<HTMLImageElement> & {
  size?: number;
};

const LOGO_BASE_HUE = getHue("#DB6610");

function getHue(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) return 0;

  let hue: number;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  hue *= 60;
  return hue < 0 ? hue + 360 : hue;
}

export default function Logo({ size = 24, className, ...props }: LogoProps) {
  const { theme } = useTheme();

  const rotation = useMemo(() => {
    if (!theme?.theme?.client) return 0;
    const targetHue = getHue(theme.theme.client.accentColor);
    return (targetHue - LOGO_BASE_HUE + 360) % 360;
  }, [theme]);

  return (
    <img
      src="./icon.png"
      width={size}
      height={size}
      className={className}
      style={{ filter: `hue-rotate(${rotation}deg)` }}
      alt="SnipPad Logo"
      {...props}
    />
  );
}
