# energy-period-selector-plus

## 0.3.0-beta.0

### Minor Changes

- [#378](https://github.com/flixlix/flixlix-cards/pull/378) [`e1c6196`](https://github.com/flixlix/flixlix-cards/commit/e1c6196748db42a21ba91d86c66286370fdc1c17) Thanks [@flixlix](https://github.com/flixlix)! - Energy Period Selector Plus now lives in flixlix-cards and works with current Home Assistant versions:

  - Picking a period no longer stops the date selection or breaks the energy cards on HA 2026.3 and later. The selector drives the energy data HA loads itself and no longer creates its own.
  - The period, today and compare buttons no longer disappear after reloading the page.
  - The compare button turns comparison on and off again.
  - The card fits on phones and tablets without overflowing.
  - The picked period is remembered for your next visit, as with HA's own date picker.
  - New `collection_key` option to drive another energy dashboard, as in HA's energy cards.
