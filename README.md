# Energy Period Selector Plus

![ko-fi support](https://img.shields.io/badge/support-me-ff5e5b?style=flat-square&logo=ko-fi)
![GitHub total downloads](https://img.shields.io/github/downloads/flixlix/energy-period-selector-plus/total?style=flat-square)

<img width="516" alt="Energy Period Selector Plus with the month selected, above Energy Flow Card Plus showing that month" src="https://raw.githubusercontent.com/flixlix/flixlix-cards/main/packages/flixlix-cards/energy-period-selector-plus/assets/demo.png">

Picks the period shown by Home Assistant's energy cards (and Energy Flow Card Plus /
Energy Breakdown Card with `energy_date_selection: true`) on the same dashboard. Like HA's
[energy date picker](https://www.home-assistant.io/dashboards/energy/#energy-date-picker),
with period buttons, an optional compare button and a card background so it matches the cards
around it.

## Features

- Day / week / month / year / custom period buttons, in the order you list them
- Previous, next and today buttons
- Compare with the previous period (icon or text button)
- Optional card background and title
- Visual editor

## Configuration

| Name                   | Type                      | Default                    | Description                                                                           |
| ---------------------- | ------------------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| `type`                 | string                    | —                          | `custom:energy-period-selector-plus`                                                  |
| `card_background`      | boolean                   | `false`                    | Show the selector on a card                                                           |
| `title`                | string                    | —                          | Card title, with `card_background: true`                                              |
| `prev_next_buttons`    | boolean                   | `true`                     | Show the previous and next buttons                                                    |
| `today_button_type`    | `text` / `icon` / `false` | `text`                     | Style of the today button, `false` hides it                                           |
| `compare_button_type`  | `text` / `icon`           | —                          | Show a button that compares with the previous period                                  |
| `compare_button_label` | string                    | HA's "Compare data"        | Label of the text compare button                                                      |
| `period_buttons`       | list                      | `[day, week, month, year]` | Period buttons and their order. Add `custom` for a start and end date                 |
| `custom_period_label`  | string                    | `Custom`                   | Label of the `custom` button                                                          |
| `collection_key`       | string                    | the dashboard's            | Like in HA's energy cards: drive another energy collection. Must start with `energy_` |

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

## How it works with Home Assistant

The selector only drives the energy collection that HA itself creates, so it keeps working when
HA changes its energy data (it no longer carries its own copy of HA's energy loader). On a
dashboard without any of HA's energy cards it adds a hidden HA energy date picker, so HA creates
the collection. The period you pick is remembered for the next visit, as with HA's own picker.
