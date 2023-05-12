# Energy Period Selector Plus

![GitHub release (latest by date)](https://img.shields.io/github/v/release/flixlix/energy-period-selector-plus?style=flat-square)
![GitHub all releases](https://img.shields.io/github/downloads/flixlix/energy-period-selector-plus/total?style=flat-square)
[![ko-fi support](https://img.shields.io/badge/support-me-ff5e5b?style=flat-square&logo=ko-fi)](https://ko-fi.com/flixlix)
![commit_activity](https://img.shields.io/github/commit-activity/y/flixlix/energy-period-selector-plus?color=brightgreen&label=Commits&style=flat-square)

![Hero Image](https://github.com/flixlix/energy-period-selector-plus/assets/61006057/93068f68-b989-4ff1-95bf-52f6e394c85f)


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
| type                | `string`  | **required** | `custom:energy-period-selector-plus`. |
| card_background     | `boolean`  | false | If set to `true`, a card will be added to the background of the card. |
| today_button        | `boolean`  | true | If set to `true`, a button will be added to select today. |
| prev_next_buttons   | `boolean`  | true | If set to `true`, buttons will be added to control the previous and next period. |
| compare_button      | `string`  | undefined | If set, a button will be added to toggle the compare mode. Supported values are `icon` and `text`. |
| period_buttons | `array` | undefined | If set, only buttons inside this array will be displayed. Supported values are `day`, `week`, `month` and `year`. |


### Example Configurations

<img width="1322" alt="Basic Configuration" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/7834de56-6096-45d0-9373-781c6f56f77b">

```yaml
type: custom:energy-period-selector-plus
card_background: true
```
<hr/>
<img width="1322" alt="No previous or next controls" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/38238f3f-f0d7-46f6-a33b-984e16707210">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: No Previous or Next Controls
prev_next_buttons: false
```
<hr/>
<img width="1231" alt="No today button" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/1a26100d-5ccf-4713-9646-f52b392039cd">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: No Today Button
today_button: false
```
<hr/>
<img width="1219" alt="Text compare button" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/8dc6d530-9771-47c8-b291-fd41229e4916">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: Text Compare Button
compare_button: text
```
<hr/>
<img width="1301" alt="Icon compare button" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/780e7460-4380-4288-8376-033629725501">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: Icon Compare Button
compare_button: icon
```
<hr/>
<img width="1071" alt="No week button" src="https://github.com/flixlix/energy-period-selector-plus/assets/61006057/49cafcfa-daa0-4ae1-973a-71a88402bbd8">

```yaml
type: custom:energy-period-selector-plus
card_background: true
title: No Week Button
period_buttons:
  - day
  - month
  - year
```






