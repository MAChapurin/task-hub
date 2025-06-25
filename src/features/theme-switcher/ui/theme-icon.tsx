import {
  Sun,
  Moon,
  Leaf,
  Waves,
  Snowflake,
  Zap,
  ShieldAlert,
  MonitorPause,
  SquareTerminal,
  Biohazard,
  IceCreamBowl,
  Venus,
} from 'lucide-react';
import { RedIcon } from './red-icon';
import { FC, SVGProps } from 'react';

const config = {
  light: Sun,
  dark: Moon,
  green: Leaf,
  red: RedIcon,
  blue: Waves,
  winter: Snowflake,
  neon: Zap,
  cyberpunk: ShieldAlert,
  matrix: MonitorPause,
  terminal: SquareTerminal,
  umbrella: Biohazard,
  purple: IceCreamBowl,
  pink: Venus,
};

export type ThemeNameType = keyof typeof config;

interface IconProps extends SVGProps<SVGSVGElement> {
  name?: ThemeNameType;
}

export const ThemeIcon: FC<IconProps> = ({ name = 'light', ...props }) => {
  const SVGIcon = config[name];
  return <SVGIcon {...props} />;
};
