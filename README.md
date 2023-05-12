# Energy Period Selector Plus

![GitHub release (latest by date)](https://img.shields.io/github/v/release/flixlix/energy-period-selector-plus?style=flat-square)
![GitHub all releases](https://img.shields.io/github/downloads/flixlix/energy-period-selector-plus/total?style=flat-square)
[![ko-fi support](https://img.shields.io/badge/support-me-ff5e5b?style=flat-square&logo=ko-fi)](https://ko-fi.com/flixlix)
![commit_activity](https://img.shields.io/github/commit-activity/y/flixlix/energy-period-selector-plus?color=brightgreen&label=Commits&style=flat-square)


## Goal

The main goal of this card is to expand the functionality and customizability of the official [Energy Date Picker Card](https://www.home-assistant.io/dashboards/energy/#energy-date-picker) from Home Assistant.

The goal is to deliver a card that fits in the overall design of the Energy Dashboard, while providing more features, such as hiding or changing the style of the compare button.


## Install

### HACS (recommended)

This card is not direclty available in [HACS](https://hacs.xyz/) (Home Assistant Community Store), but can be added using "Custom Repositories".
_HACS is a third party community store and is not included in Home Assistant out of the box._
To install this:

- Go to HACS
- Click on `Frontend`
- Click on the overflow Menu (three vertical dots)
- Click on `Custom Repositories`
- Type this URL [https://github.com/flixlix/energy-period-selector-plus](https://github.com/flixlix/energy-period-selector-plus)
- In "Category", select `lovelace`
- Install via UI

<details>  <summary>Manual Install</summary>

1. Download and copy `energy-period-selector-plus.js` from the [latest release](https://github.com/flixlix/energy-period-selector-plus/releases/latest) into your `config/www` directory.

2. Add the resource reference as decribed below.

### Add resource reference

If you configure Dashboards via YAML, add a reference to `energy-period-selector-plus.js` inside your `configuration.yaml`:

```yaml
resources:
  - url: /local/energy-period-selector-plus.js
    type: module
```

Else, if you prefer the graphical editor, use the menu to add the resource:

1. Make sure, advanced mode is enabled in your user profile (click on your user name to get there)
2. Navigate to Settings -> Dashboards
3. Click three dot icon
4. Select Resources
5. Hit (+ ADD RESOURCE) icon
6. Enter URL `/local/energy-period-selector-plus.js` and select type "JavaScript Module".
   (Use `/hacsfiles/energy-period-selector-plus/energy-period-selector-plus.js` and select "JavaScript Module" for HACS install if HACS didn't do it already)
 
</details>
   
## Using the card

To configure this card, only the type is required, making it very easy to get started.


### Options

#### Card options

| Name                | Type      |   Default    | Description                                                                                                                                                                  |
|---------------------| --------- |:------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

  today_button?: boolean;
  prev_next_buttons?: boolean;
  compare_button?: string;
  period_buttons?: string[];

| type                | `string`  | **required** | `custom:energy-period-selector-plus`. |
| card_background     | `boolean`  | false | If set to `true`, a card will be added to the background of the card. |
| today_button        | `boolean`  | true | If set to `true`, a button will be added to select today. |
| prev_next_buttons   | `boolean`  | true | If set to `true`, buttons will be added to control the previous and next period. |
| compare_button      | `string`  | undefined | If set, a button will be added to toggle the compare mode. Supported values are `icon` and `text`. |
| period_buttons | `array` | undefined | If set, only buttons inside this array will be displayed. Supported values are `day`, `week`, `month` and `year`. |


### Example Configurations

<img width="1322" alt="Basic Configuration" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/ea19df86-fb17-45e6-b97c-06d154e7d021">

```yaml
type: custom:energy-period-selector-plus
card_background: true
```
<hr/>
<img width="1322" alt="No previous or next controls" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/d5c24319-d380-48bd-9e3d-3c2ad7e2aeda">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: No Previous or Next Controls
prev_next_buttons: false
```
<hr/>
<img width="1231" alt="No today button" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/b8b58550-8577-4cec-bb0a-0886076f1607">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: No Today Button
today_button: false
```
<hr/>
<img width="1219" alt="Text compare button" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/d5d798be-6cfc-44ad-b7b0-18c9b0c2e5e8">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: Text Compare Button
compare_button: text
```
<hr/>
<img width="1301" alt="Icon compare button" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/f0c130db-bbf8-4a94-af23-60a76c6e091a">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: Icon Compare Button
compare_button: icon
```
<hr/>
<img width="1071" alt="No week button" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/05ea17d2-c8e5-49e2-9e13-316b1ad05796">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: No Week Button
period_buttons:
  - day
  - month
  - year
```






