import { LovelaceCardConfig } from 'custom-card-helpers';
import { EnergyCardBaseConfig } from './type/energy-card-base-config';

export interface EnergyPeriodSelectorPlusConfig extends LovelaceCardConfig, EnergyCardBaseConfig {
  card_background?: boolean;
  today_button?: boolean;
  prev_next_buttons?: boolean;
  compare_button?: string;
  period_buttons?: string[];
  default_period?: 'day' | 'week' | 'month' | 'year' | 'custom';
}
