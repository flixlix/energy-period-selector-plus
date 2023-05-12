import { mdiCompare, mdiCompareRemove } from '@mdi/js';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInDays,
  endOfDay,
  endOfMonth,
  endOfToday,
  endOfWeek,
  endOfYear,
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYear,
} from 'date-fns/esm';
import { UnsubscribeFunc } from 'home-assistant-js-websocket';
import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { firstWeekdayIndex } from './datetime/first-weekday';
import { formatDate, formatDateMonthYear, formatDateShort, formatDateYear } from './datetime/format-date';
import { toggleAttribute, ToggleButton } from './types';
import { computeRTLDirection } from './utils/compute_rtl';
import { EnergyData, getEnergyDataCollection } from './energy';
import { SubscribeMixin } from './energy/subscribe-mixin';
import { HomeAssistant } from './type/home-assistant';
import { EnergyPeriodSelectorPlusConfig } from './energy-period-selector-plus-config';

@customElement('energy-period-selector-base')
export class EnergyPeriodSelectorBase extends SubscribeMixin(LitElement) {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() public _config?: EnergyPeriodSelectorPlusConfig;
  @property() public collectionKey?: string;
  @property({ type: Boolean, reflect: true }) public narrow?;
  @state() _startDate?: Date;
  @state() _endDate?: Date;
  @state() private _period?: 'day' | 'week' | 'month' | 'year';
  @state() private _compare = false;

  public connectedCallback() {
    super.connectedCallback();
    if (this.narrow !== false) {
      toggleAttribute(this, 'narrow', this.offsetWidth < 600);
    }
  }

  public hassSubscribe(): UnsubscribeFunc[] {
    if (!this.collectionKey || !this.hass) {
      return [];
    }

    return [getEnergyDataCollection(this.hass).subscribe(data => this._updateDates(data))];
  }

  protected render() {
    if (!this.hass || !this._startDate) {
      return nothing;
    }

    const viewButtons: ToggleButton[] = !this._config?.period_buttons
      ? [
          {
            label: this.hass.localize('ui.panel.lovelace.components.energy_period_selector.day'),
            value: 'day',
          },
          {
            label: this.hass.localize('ui.panel.lovelace.components.energy_period_selector.week'),
            value: 'week',
          },
          {
            label: this.hass.localize('ui.panel.lovelace.components.energy_period_selector.month'),
            value: 'month',
          },
          {
            label: this.hass.localize('ui.panel.lovelace.components.energy_period_selector.year'),
            value: 'year',
          },
        ]
      : this._config.period_buttons.map(period => {
          return {
            label: this.hass.localize(`ui.panel.lovelace.components.energy_period_selector.${period}`),
            value: period,
          };
        });

    return html`
      <div class="row">
        <div class="label">
          ${this._period === 'day'
            ? formatDate(this._startDate, this.hass.locale)
            : this._period === 'month'
            ? formatDateMonthYear(this._startDate, this.hass.locale)
            : this._period === 'year'
            ? formatDateYear(this._startDate, this.hass.locale)
            : `${formatDateShort(this._startDate, this.hass.locale)} – ${formatDateShort(this._endDate || new Date(), this.hass.locale)}`}
          ${this._config?.prev_next_buttons !== false
            ? html`
                <ha-icon-button-prev
                  .label=${this.hass.localize('ui.panel.lovelace.components.energy_period_selector.previous')}
                  @click=${this._pickPrevious}
                ></ha-icon-button-prev>
                <ha-icon-button-next
                  .label=${this.hass.localize('ui.panel.lovelace.components.energy_period_selector.next')}
                  @click=${this._pickNext}
                ></ha-icon-button-next>
              `
            : nothing}
          ${this._config?.today_button !== false
            ? html`<mwc-button dense outlined @click=${this._pickToday}>
                ${this.hass.localize('ui.panel.lovelace.components.energy_period_selector.today')}
              </mwc-button>`
            : nothing}
        </div>
        <div class="period">
          <ha-button-toggle-group
            .buttons=${viewButtons}
            .active=${this._period}
            dense
            @value-changed=${this._handleView}
            .dir=${computeRTLDirection(this.hass)}
          ></ha-button-toggle-group>
          ${this.narrow && this._config?.compare_button === 'icon'
            ? html`<ha-icon-button
                class="compare ${this._compare ? 'active' : ''}"
                .path=${this._compare ? mdiCompareRemove : mdiCompare}
                @click=${this._toggleCompare}
                dense
                outlined
              >
                ${this.hass.localize('ui.panel.lovelace.components.energy_period_selector.compare')}
              </ha-icon-button>`
            : this._config?.compare_button === 'text'
            ? html`<mwc-button class="compare ${this._compare ? 'active' : ''}" @click=${this._toggleCompare} dense outlined>
                ${this.hass.localize('ui.panel.lovelace.components.energy_period_selector.compare')}
              </mwc-button>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _handleView(ev: CustomEvent): void {
    this._period = ev.detail.value;
    const today = startOfToday();
    const start =
      !this._startDate ||
      isWithinInterval(today, {
        start: this._startDate,
        end: this._endDate || endOfToday(),
      })
        ? today
        : this._startDate;

    const weekStartsOn = firstWeekdayIndex(this.hass.locale);

    this._setDate(
      this._period === 'day'
        ? startOfDay(start)
        : this._period === 'week'
        ? startOfWeek(start, { weekStartsOn })
        : this._period === 'month'
        ? startOfMonth(start)
        : startOfYear(start),
    );
  }

  private _pickToday() {
    const weekStartsOn = firstWeekdayIndex(this.hass.locale);

    this._setDate(
      this._period === 'day'
        ? startOfToday()
        : this._period === 'week'
        ? startOfWeek(new Date(), { weekStartsOn })
        : this._period === 'month'
        ? startOfMonth(new Date())
        : startOfYear(new Date()),
    );
  }

  private _pickPrevious() {
    const newStart =
      this._period === 'day'
        ? addDays(this._startDate!, -1)
        : this._period === 'week'
        ? addWeeks(this._startDate!, -1)
        : this._period === 'month'
        ? addMonths(this._startDate!, -1)
        : addYears(this._startDate!, -1);
    this._setDate(newStart);
  }

  private _pickNext() {
    const newStart =
      this._period === 'day'
        ? addDays(this._startDate!, 1)
        : this._period === 'week'
        ? addWeeks(this._startDate!, 1)
        : this._period === 'month'
        ? addMonths(this._startDate!, 1)
        : addYears(this._startDate!, 1);
    this._setDate(newStart);
  }

  private _setDate(startDate: Date) {
    const weekStartsOn = firstWeekdayIndex(this.hass.locale);

    const endDate =
      this._period === 'day'
        ? endOfDay(startDate)
        : this._period === 'week'
        ? endOfWeek(startDate, { weekStartsOn })
        : this._period === 'month'
        ? endOfMonth(startDate)
        : endOfYear(startDate);

    const energyCollection = getEnergyDataCollection(this.hass);
    energyCollection.setPeriod(startDate, endDate);
    energyCollection.refresh();
  }

  private _updateDates(energyData: EnergyData): void {
    this._compare = energyData.startCompare !== undefined;
    this._startDate = energyData.start;
    this._endDate = energyData.end || endOfToday();
    const dayDifference = differenceInDays(this._endDate, this._startDate);
    this._period =
      dayDifference < 1
        ? 'day'
        : dayDifference === 6
        ? 'week'
        : dayDifference > 26 && dayDifference < 31 // 28, 29, 30 or 31 days in a month
        ? 'month'
        : dayDifference === 364 || dayDifference === 365 // Leap year
        ? 'year'
        : undefined;
  }

  private _toggleCompare() {
    this._compare = !this._compare;
    const energyCollection = getEnergyDataCollection(this.hass);
    energyCollection.setCompare(this._compare);
    energyCollection.refresh();
  }

  static get styles(): CSSResultGroup {
    return css`
      .row {
        display: flex;
        justify-content: flex-end;
      }
      :host([narrow]) .row {
        flex-direction: column-reverse;
      }
      .label {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 20px;
      }
      .period {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
      }
      :host([narrow]) .period {
        margin-bottom: 8px;
      }
      mwc-button {
        margin-left: 8px;
      }
      ha-icon-button {
        margin-left: 4px;
        --mdc-icon-size: 20px;
      }
      ha-icon-button.active::before,
      mwc-button.active::before {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: currentColor;
        opacity: 0;
        pointer-events: none;
        content: '';
        transition: opacity 15ms linear, background-color 15ms linear;
        opacity: var(--mdc-icon-button-ripple-opacity, 0.12);
      }
      ha-icon-button.active::before {
        border-radius: 50%;
      }
      .compare {
        position: relative;
      }
      :host {
        --mdc-button-outline-color: currentColor;
        --primary-color: currentColor;
        --mdc-theme-primary: currentColor;
        --mdc-theme-on-primary: currentColor;
        --mdc-button-disabled-outline-color: var(--disabled-text-color);
        --mdc-button-disabled-ink-color: var(--disabled-text-color);
        --mdc-icon-button-ripple-opacity: 0.2;
      }
      ha-icon-button {
        --mdc-icon-button-size: 28px;
      }
      ha-button-toggle-group {
        padding-left: 8px;
        padding-inline-start: 8px;
        direction: var(--direction);
      }
      mwc-button {
        flex-shrink: 0;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'energy-period-selector-base': EnergyPeriodSelectorBase;
  }
}
