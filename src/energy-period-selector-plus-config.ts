import { LovelaceCardConfig } from 'custom-card-helpers';
import { EnergyCardBaseConfig } from './type/energy-card-base-config';

export interface EnergyPeriodSelectorPlusConfig extends LovelaceCardConfig, EnergyCardBaseConfig {
  card_background?: boolean;
  prev_next_buttons?: boolean;
  compare_button_type?: string;
  compare_button_label?: string;
  today_button_type?: string | boolean;
  period_buttons?: string[];
  rolling_periods?: boolean;
  custom_period_label?: string;
}
