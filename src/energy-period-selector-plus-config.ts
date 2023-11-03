import { LovelaceCardConfig } from 'custom-card-helpers';
import { EnergyCardBaseConfig } from './type/energy-card-base-config';

export type Period = 'day' | 'week' | 'month' | 'year' | 'custom';

export interface EnergyPeriodSelectorPlusConfig extends LovelaceCardConfig, EnergyCardBaseConfig {
  card_background?: boolean;
  prev_next_buttons?: boolean;
  compare_button_type?: string;
  compare_button_label?: string;
  today_button_type?: string | boolean;
  period_buttons?: string[];
  custom_period_label?: string;
  default_period?: Period;
}
