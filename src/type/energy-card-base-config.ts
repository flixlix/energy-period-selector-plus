import { LovelaceCardConfig } from './lovelace-card';
import { ActionConfig } from './action-config';

interface ButtonCardConfig extends LovelaceCardConfig {
  entity?: string;
  name?: string;
  show_name?: boolean;
  icon?: string;
  icon_height?: string;
  show_icon?: boolean;
  theme?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  state_color?: boolean;
  show_state?: boolean;
}

export interface EnergyCardBaseConfig extends LovelaceCardConfig {
  collection_key?: string;
}
