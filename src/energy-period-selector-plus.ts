/* eslint-disable @typescript-eslint/no-explicit-any */
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { HomeAssistant } from './type/home-assistant';
import { LovelaceCard } from './type/lovelace-card';
import { EnergyPeriodSelectorPlusConfig } from './energy-period-selector-plus-config';
import { registerCustomCard } from './utils/register-custom-card';
import './energy-period-selector-plus-base';
import { localize } from './localize/localize';
import { logError } from './logging';
import { styles } from './style';

registerCustomCard({
  type: 'energy-period-selector-plus',
  name: 'Energy Period Selector Plus',
  description: 'A custom card to change the Energy Period of your Energy Data.',
});
@customElement('energy-period-selector-plus')
export class EnergyPeriodSelectorPlus extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public locale!: HomeAssistant['locale'];
  @state() private _config?: EnergyPeriodSelectorPlusConfig;

  public getCardSize(): Promise<number> | number {
    return 1;
  }

  public setConfig(config: EnergyPeriodSelectorPlusConfig): void {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) {
      logError(localize('common.invalid_configuration'));
      return nothing;
    }
    const EnergyPeriodSelectorBase = html`
      <energy-period-selector-base .hass=${this.hass} ._config=${this._config} .collectionKey=${'_energy'}></energy-period-selector-base>
    `;
    return this._config?.card_background
      ? html` <ha-card .header=${this._config?.title}> ${EnergyPeriodSelectorBase}</ha-card> `
      : html` ${EnergyPeriodSelectorBase} `;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'energy-period-selector-plus': EnergyPeriodSelectorPlus;
  }
}
