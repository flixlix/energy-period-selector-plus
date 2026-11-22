# Energy Period Selector Plus

> [!TIP]
> **Canonical docs: [cards.flixlix.com/energy-period-selector-plus](https://cards.flixlix.com/energy-period-selector-plus).** This is the custom Home Assistant energy date picker. Installation, options, examples and a [playground](https://cards.flixlix.com/energy-period-selector-plus/playground) are on that page.

![ko-fi support](https://img.shields.io/badge/support-me-ff5e5b?style=flat-square&logo=ko-fi)
![GitHub total downloads](https://img.shields.io/github/downloads/flixlix/energy-period-selector-plus/total?style=flat-square)

<img width="512" alt="Energy Period Selector Plus with a billing period from November 8 to December 7 selected, above Energy Flow Card Plus showing that period" src="https://raw.githubusercontent.com/flixlix/flixlix-cards/main/packages/flixlix-cards/energy-period-selector-plus/assets/demo.png">

Picks the period shown by Home Assistant's energy cards (and Energy Flow Card Plus /
Energy Breakdown Card with `energy_date_selection: true`) on the same dashboard. Like HA's
[energy date picker](https://www.home-assistant.io/dashboards/energy/#energy-date-picker),
in one row: previous, the period and its dates, next. The period button opens a menu with
the periods, today and an optional compare checkbox, and a card background matches the cards
around it.

## Features

- Day / week / month / year / custom period buttons, in the order you list them
- Your own periods, like a billing cycle from the 8th to the 7th, a contract year or the last 30 days
- Custom ranges are picked in Home Assistant's own calendar, with its presets; with `date_picker`, its button shows in every period
- Previous and next buttons; today in the period menu
- Compare with the previous period (a checkbox in the period menu)
- Optional card background and title
- Visual editor

## Configuration

| Name                   | Type                      | Default                    | Description                                                                                                               |
| ---------------------- | ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `type`                 | string                    | —                          | `custom:energy-period-selector-plus`                                                                                      |
| `card_background`      | boolean                   | `false`                    | Show the selector on a card                                                                                               |
| `title`                | string                    | —                          | Card title, with `card_background: true`                                                                                  |
| `prev_next_buttons`    | boolean                   | `true`                     | Show the previous and next buttons                                                                                        |
| `date_picker`          | boolean                   | `false`                    | Show HA's calendar button next to the period in every period (always on for `custom`)                                     |
| `today_button_type`    | `text` / `icon` / `false` | `text`                     | Today in the period menu; `false` hides it. With `tabs`, a text or icon button                                            |
| `compare_button_type`  | `text` / `icon`           | —                          | Compare with the previous period: a checkbox in the menu, or a toggle button with `tabs`                                  |
| `compare_button_label` | string                    | HA's "Compare data"        | Label of the compare checkbox                                                                                             |
| `period_buttons`       | list                      | `[day, week, month, year]` | Period buttons and their order. Add `custom` to pick any range in HA's calendar, or [your own periods](#your-own-periods) |
| `period_style`         | `menu` / `tabs`           | `menu`                     | `menu`: the period in a pill that opens a menu. `tabs`: the periods side by side, today and compare as buttons            |
| `custom_period_label`  | string                    | `Custom`                   | Label of the `custom` button                                                                                              |
| `collection_key`       | string                    | the dashboard's            | Like in HA's energy cards: drive another energy collection. Must start with `energy_`                                     |

## Examples

```yaml
type: custom:energy-period-selector-plus
card_background: true
```

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: Energy period
today_button_type: icon
compare_button_type: icon
period_buttons: [month, year, custom]
```

## Your own periods

A `period_buttons` entry can be a period of your own, like a billing cycle:

<img width="512" alt="The period menu open, listing day, week, month, a Bill period, last 30 days, year and custom, then now and compare data" src="https://raw.githubusercontent.com/flixlix/flixlix-cards/main/packages/flixlix-cards/energy-period-selector-plus/assets/custom-periods.png">

| Name       | Type   | Description                                                                                         |
| ---------- | ------ | --------------------------------------------------------------------------------------------------- |
| `label`    | string | Button label                                                                                        |
| `duration` | object | One of `days`, `weeks`, `months`, `years` with a whole number, like HA's durations: `{ months: 1 }` |
| `starts`   | date   | A day one of the periods starts on, like `2026-01-08`. Leave it out for a period that ends today    |

The periods repeat from `starts` in both directions, so its year does not matter for monthly
cycles. Monthly periods starting on the 29th to 31st start on the last day of shorter months.
Previous and next step by one period, and today jumps to the period around today.

```yaml
type: custom:energy-period-selector-plus
period_buttons:
  - day
  - month
  - label: Bill
    duration: { months: 1 }
    starts: 2026-01-08 # every 8th to the 7th
  - label: Quarter
    duration: { months: 3 }
    starts: 2026-02-15
  - label: Contract year
    duration: { years: 1 }
    starts: 2025-04-01
  - label: Last 30 days
    duration: { days: 30 } # ends today
```

Home Assistant only remembers its own periods, so after a reload the dashboard opens on HA's last
preset, not on one of your periods.

## How it works with Home Assistant

The selector only drives the energy collection that HA itself creates, so it keeps working when
HA changes its energy data (it no longer carries its own copy of HA's energy loader). On a
dashboard without any of HA's energy cards it adds a hidden HA energy date picker, so HA creates
the collection. The period you pick is remembered for the next visit, as with HA's own picker.
