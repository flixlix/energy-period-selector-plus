/* eslint-disable @typescript-eslint/no-explicit-any */
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
  format,
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
import type { DateRangePickerRanges } from './datetime';
import { localize } from './localize/localize';
import { stylesBase } from './style';

@customElement('energy-period-selector-base')
export class EnergyPeriodSelectorBase extends SubscribeMixin(LitElement) {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() public _config?: EnergyPeriodSelectorPlusConfig;
  @property() public collectionKey?: string;
  @property({ type: Boolean, reflect: true }) public narrow?;
  @state() _startDate?: Date;
  @state() _endDate?: Date;
  @property() public ranges?: DateRangePickerRanges;
  @state() private _period?: 'day' | 'week' | 'month' | 'year' | 'custom';
  @state() private _compare = false;

  public connectedCallback() {
    super.connectedCallback();
    if (this.narrow !== false) {
      toggleAttribute(this, 'narrow', this.offsetWidth < 600);
    }
  }

  async firstUpdated() {
    (await (window as any).loadCardHelpers()).importMoreInfoControl('input_datetime'); // This is needed to render the datepicker!!!
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

    const computeToggleButtonLabel = (period: string) => {
      if (period === 'custom') {
        return (
          this._config?.custom_period_label ||
          this.hass.localize('ui.panel.lovelace.components.energy_period_selector.custom') ||
          localize(`toggleButtons.${period}`)
        );
      }
      return this.hass.localize(`ui.panel.lovelace.components.energy_period_selector.${period}`) || localize(`toggleButtons.${period}`);
    };

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
            label: computeToggleButtonLabel(period),
            value: period,
          };
        });

    const dateRangePicker = html`
      <div class="date-range-container">
        <ha-date-input
          .locale=${this.hass.locale}
          .value=${this._startDate?.toISOString() || ''}
          .label=${this.hass.localize('ui.components.date-range-picker.start_date')}
          @value-changed=${this._startDateChanged}
          .required=${true}
          .min=${'2019-01-01'}
          .max=${this._endDate?.toISOString() || endOfToday().toISOString()}
        >
        </ha-date-input>
        <ha-date-input
          .locale=${this.hass.locale}
          .value=${this._endDate?.toISOString() || ''}
          .label=${this.hass.localize('ui.components.date-range-picker.end_date')}
          @value-changed=${this._endDateChanged}
          .required=${true}
          .min=${this._startDate.toISOString()}
          .max=${endOfToday().toISOString()}
        >
        </ha-date-input>
      </div>
    `;
    return html`
      <div class="row">
        ${this._period === 'custom'
          ? dateRangePicker
          : html`
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
            `}
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

  public _startDateChanged(ev: CustomEvent): void {
    this._setDate(new Date(ev.detail.value));
  }

  public _endDateChanged(ev: CustomEvent): void {
    if (this._startDate && new Date(ev.detail.value) > this._startDate) {
      this._setDate(this._startDate, new Date(ev.detail.value));
    }
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
        : this._period === 'year'
        ? startOfYear(start)
        : this._startDate || startOfToday(),
      this._period === 'custom' ? this._endDate : undefined,
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
        : this._period === 'year'
        ? addYears(this._startDate!, -1)
        : addDays(this._startDate!, -1);
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
        : this._period === 'year'
        ? addYears(this._startDate!, 1)
        : addDays(this._startDate!, 1);
    this._setDate(newStart);
  }

  private _setDate(startDate: Date, customEndDate?: Date) {
    const weekStartsOn = firstWeekdayIndex(this.hass.locale);

    const endDate: Date =
      this._period === 'day'
        ? endOfDay(startDate)
        : this._period === 'week'
        ? endOfWeek(startDate, { weekStartsOn })
        : this._period === 'month'
        ? endOfMonth(startDate)
        : this._period === 'year'
        ? endOfYear(startDate)
        : this._period === 'custom' && customEndDate
        ? endOfDay(customEndDate)
        : this._endDate || endOfToday();

    const energyCollection = getEnergyDataCollection(this.hass);
    energyCollection.setPeriod(startDate, endDate);
    energyCollection.refresh();
  }

  private _updateDates(energyData: EnergyData): void {
    this._compare = energyData.startCompare !== undefined;
    this._startDate = energyData.start;
    this._endDate = energyData.end || endOfToday();
    const dayDifference = differenceInDays(this._endDate, this._startDate || endOfToday());
    this._period =
      this._period !== 'custom'
        ? dayDifference < 1
          ? 'day'
          : dayDifference === 6
          ? 'week'
          : dayDifference > 26 && dayDifference < 31 // 28, 29, 30 or 31 days in a month
          ? 'month'
          : dayDifference === 364 || dayDifference === 365 // Leap year
          ? 'year'
          : 'custom'
        : 'custom';
  }

  private _toggleCompare() {
    this._compare = !this._compare;
    const energyCollection = getEnergyDataCollection(this.hass);
    energyCollection.setCompare(this._compare);
    energyCollection.refresh();
  }

  static styles = stylesBase;
}

declare global {
  interface HTMLElementTagNameMap {
    'energy-period-selector-base': EnergyPeriodSelectorBase;
  }
}
