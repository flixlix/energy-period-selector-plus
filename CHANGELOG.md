# energy-period-selector-plus

## 0.3.0

### Minor Changes

- [#378](https://github.com/flixlix/flixlix-cards/pull/378) [`e1c6196`](https://github.com/flixlix/flixlix-cards/commit/e1c6196748db42a21ba91d86c66286370fdc1c17) Thanks [@flixlix](https://github.com/flixlix)! - Energy Period Selector Plus now lives in flixlix-cards and works with current Home Assistant versions:

  - Picking a period no longer stops the date selection or breaks the energy cards on HA 2026.3 and later. The selector drives the energy data HA loads itself and no longer creates its own.
  - The period, today and compare buttons no longer disappear after reloading the page.
  - The compare button turns comparison on and off again.
  - The card fits on phones and tablets without overflowing.
  - The picked period is remembered for your next visit, as with HA's own date picker.
  - New `collection_key` option to drive another energy dashboard, as in HA's energy cards.

- [#429](https://github.com/flixlix/flixlix-cards/pull/429) [`9fee657`](https://github.com/flixlix/flixlix-cards/commit/9fee6576a932061925d0af8c190e4beb0eea4d07) Thanks [@flixlix](https://github.com/flixlix)! - New `date_picker` option: click the date to pick any range in Home Assistant's calendar, also while day, week, month or year is selected. Picking a whole week, month or year selects that button. The card also keeps the same height when switching to the custom period.

### Patch Changes

- [#432](https://github.com/flixlix/flixlix-cards/pull/432) [`9ac9962`](https://github.com/flixlix/flixlix-cards/commit/9ac9962716bfe6e7f32d2a7ad94c01d5a95789cf) Thanks [@flixlix](https://github.com/flixlix)! - The version line each card writes to the browser console has a new look.

- [#422](https://github.com/flixlix/flixlix-cards/pull/422) [`cb5e1b5`](https://github.com/flixlix/flixlix-cards/commit/cb5e1b5f65e589362d129d7f070c3b620ac828c7) Thanks [@flixlix](https://github.com/flixlix)! - Custom ranges are now picked in Home Assistant's own calendar, the same one as in HA's energy date picker, instead of the browser's date fields. Click the range or the calendar icon to open it.

- [#426](https://github.com/flixlix/flixlix-cards/pull/426) [`7dba4d6`](https://github.com/flixlix/flixlix-cards/commit/7dba4d63a8cd32d75ddd2e126749c43a4f819639) Thanks [@flixlix](https://github.com/flixlix)! - Cards load again on Google Cast displays (Chromecast, Nest Hub) and other older browsers and wall-panel webviews that Home Assistant itself still supports (Chromium 67 and newer). Before, the cards shipped optional chaining (`?.`) and nullish coalescing (`??`), which those browsers cannot read, so the card stayed empty or showed "Configuration Error". The cards are about 5% larger as a result.

## 0.3.0-beta.1

### Minor Changes

- [#429](https://github.com/flixlix/flixlix-cards/pull/429) [`9fee657`](https://github.com/flixlix/flixlix-cards/commit/9fee6576a932061925d0af8c190e4beb0eea4d07) Thanks [@flixlix](https://github.com/flixlix)! - New `date_picker` option: click the date to pick any range in Home Assistant's calendar, also while day, week, month or year is selected. Picking a whole week, month or year selects that button. The card also keeps the same height when switching to the custom period.

### Patch Changes

- [#432](https://github.com/flixlix/flixlix-cards/pull/432) [`9ac9962`](https://github.com/flixlix/flixlix-cards/commit/9ac9962716bfe6e7f32d2a7ad94c01d5a95789cf) Thanks [@flixlix](https://github.com/flixlix)! - The version line each card writes to the browser console has a new look.

- [#422](https://github.com/flixlix/flixlix-cards/pull/422) [`cb5e1b5`](https://github.com/flixlix/flixlix-cards/commit/cb5e1b5f65e589362d129d7f070c3b620ac828c7) Thanks [@flixlix](https://github.com/flixlix)! - Custom ranges are now picked in Home Assistant's own calendar, the same one as in HA's energy date picker, instead of the browser's date fields. Click the range or the calendar icon to open it.

- [#426](https://github.com/flixlix/flixlix-cards/pull/426) [`7dba4d6`](https://github.com/flixlix/flixlix-cards/commit/7dba4d63a8cd32d75ddd2e126749c43a4f819639) Thanks [@flixlix](https://github.com/flixlix)! - Cards load again on Google Cast displays (Chromecast, Nest Hub) and other older browsers and wall-panel webviews that Home Assistant itself still supports (Chromium 67 and newer). Before, the cards shipped optional chaining (`?.`) and nullish coalescing (`??`), which those browsers cannot read, so the card stayed empty or showed "Configuration Error". The cards are about 5% larger as a result.

## 0.3.0-beta.0

### Minor Changes

- [#378](https://github.com/flixlix/flixlix-cards/pull/378) [`e1c6196`](https://github.com/flixlix/flixlix-cards/commit/e1c6196748db42a21ba91d86c66286370fdc1c17) Thanks [@flixlix](https://github.com/flixlix)! - Energy Period Selector Plus now lives in flixlix-cards and works with current Home Assistant versions:

  - Picking a period no longer stops the date selection or breaks the energy cards on HA 2026.3 and later. The selector drives the energy data HA loads itself and no longer creates its own.
  - The period, today and compare buttons no longer disappear after reloading the page.
  - The compare button turns comparison on and off again.
  - The card fits on phones and tablets without overflowing.
  - The picked period is remembered for your next visit, as with HA's own date picker.
  - New `collection_key` option to drive another energy dashboard, as in HA's energy cards.
