/* eslint-disable @typescript-eslint/no-explicit-any */
import { mdiCompare, mdiCompareRemove, mdiCalendarTodayOutline } from '@mdi/js';
import {
  addDays,
  addMilliseconds,
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
import { html, LitElement, nothing } from 'lit';
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
  @state() _startDate?: Date;
  @state() _endDate?: Date;
  @state() private _period?: 'day' | 'week' | 'month' | 'year' | 'custom';
  @state() private _compare = false;

  public connectedCallback() {
    super.connectedCallback();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
  }

  async firstUpdated() {
    (await (window as any).loadCardHelpers()).importMoreInfoControl('input_datetime'); // This is needed to render the datepicker!!!
  }

  public hassSubscribe(): UnsubscribeFunc[] {
    this._period = this._config?.default_period || 'day';
    const startDate = this._beginningOfPeriod(new Date());
    const endDate = this._endOfPeriod(startDate);

    return [
      getEnergyDataCollection(this.hass, {
        key: this.collectionKey,
        start: startDate,
        end: endDate,
      }).subscribe(data => this._updateDates(data)),
    ];
  }

  protected render() {
    if (!this.hass || !this._startDate) {
      return nothing;
    }

    const computeToggleButtonLabel = (period: string) => {
      if (period === 'custom') {
        return this._config?.custom_period_label || localize(`toggleButtons.${period}`) || period;
      }
      return this.hass.localize(`ui.components.calendar.event.rrule.${period}`);
    };

    const periodButtons: ToggleButton[] = !this._config?.period_buttons
      ? [
          {
            label: this.hass.localize('ui.components.calendar.event.rrule.day'),
            value: 'day',
          },
          {
            label: this.hass.localize('ui.components.calendar.event.rrule.week'),
            value: 'week',
          },
          {
            label: this.hass.localize('ui.components.calendar.event.rrule.month'),
            value: 'month',
          },
          {
            label: this.hass.localize('ui.components.calendar.event.rrule.year'),
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

    const todayButtonText = html` <mwc-button dense outlined @click=${this._pickToday}>
      ${this.hass.localize('ui.panel.lovelace.components.energy_period_selector.today')}
    </mwc-button>`;

    const todayButtonIcon = html` <ha-icon-button
      @click=${this._pickToday}
      class="today-icon"
      .label=${this.hass.localize('ui.panel.lovelace.components.energy_period_selector.today')}
      .path=${mdiCalendarTodayOutline}
    >
    </ha-icon-button>`;

    const todayButton =
      this._config?.today_button_type === false ? nothing : this._config?.today_button_type === 'icon' ? todayButtonIcon : todayButtonText;

    return html`
      <div class="row">
        ${this._period === 'custom'
          ? dateRangePicker
          : html`
              <div class="label">
                ${this._period === 'day' && !this._config?.rolling_periods
                  ? formatDate(this._startDate, this.hass.locale)
                  : this._period === 'month' && !this._config?.rolling_periods
                  ? formatDateMonthYear(this._startDate, this.hass.locale)
                  : this._period === 'year' && !this._config?.rolling_periods
                  ? formatDateYear(this._startDate, this.hass.locale)
                  : this._period === 'year'
                  ? `${formatDateMonthYear(this._startDate, this.hass.locale)} – ${formatDateMonthYear(this._endDate || new Date(), this.hass.locale)}`
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
                ${todayButton}
              </div>
            `}
        <div class="period">
          <ha-button-toggle-group
            .buttons=${periodButtons}
            .active=${this._period}
            dense
            @value-changed=${this._handleView}
            .dir=${computeRTLDirection(this.hass)}
          ></ha-button-toggle-group>
          ${this._config?.compare_button_type === 'icon'
            ? html`<ha-icon-button
                class="compare ${this._compare ? 'active' : ''}"
                .path=${this._compare ? mdiCompareRemove : mdiCompare}
                @click=${this._toggleCompare}
                dense
                outlined
              >
                ${this._config.compare_button_label ?? this.hass.localize('ui.panel.lovelace.components.energy_period_selector.compare')}
              </ha-icon-button>`
            : this._config?.compare_button_type === 'text'
            ? html`<mwc-button class="compare ${this._compare ? 'active' : ''}" @click=${this._toggleCompare} dense outlined>
                ${this._config.compare_button_label ?? this.hass.localize('ui.panel.lovelace.components.energy_period_selector.compare')}
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
        ? this._config?.rolling_periods
        ? new Date()
        : today
        : this._startDate;

    const weekStartsOn = firstWeekdayIndex(this.hass.locale);

    this._setDate(
      this._beginningOfPeriod(start),
      this._period === 'custom' ? this._endDate : undefined,
    );
  }

  private _beginningOfPeriod(start: Date): Date {
    const weekStartsOn = firstWeekdayIndex(this.hass.locale);

    return this._config?.rolling_periods
    ? addMilliseconds(
      this._period === 'day'
      ? addDays(start, -1)
      : this._period === 'week'
      ? addWeeks(start, -1)
      : this._period === 'month'
      ? addMonths(start, -1)
      : this._period === 'year'
      ? addYears(start, -1)
      : start
    , 1) : (
      this._period === 'day'
      ? startOfToday()
      : this._period === 'week'
      ? startOfWeek(start, { weekStartsOn })
      : this._period === 'month'
      ? startOfMonth(start)
      : this._period === 'year'
      ? startOfYear(start)
      : start
    );
  }

  private _endOfPeriod(startDate: Date, customEndDate?: Date): Date {
    const weekStartsOn = firstWeekdayIndex(this.hass.locale);

    return this._config?.rolling_periods
    ? addMilliseconds(
      this._period === 'day'
      ? addDays(startDate!, 1)
      : this._period === 'week'
      ? addWeeks(startDate!, 1)
      : this._period === 'month'
      ? addMonths(startDate!, 1)
      : this._period === 'year'
      ? addYears(startDate!, 1)
      : this._period === 'custom' && customEndDate
      ? endOfDay(customEndDate)
      : this._endDate || endOfToday()
    , -1)
    : (
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
      : this._endDate || endOfToday()
    );
  }

  private _pickToday() {
    this._setDate(this._beginningOfPeriod(new Date()));
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
    const endDate: Date = this._endOfPeriod(startDate, customEndDate);

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
