import { css } from 'lit';

export const styles = css`
  ha-card {
    padding: 1rem;
  }
`;

export const stylesBase = css`
  .date-range-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
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

  ha-date-range-picker {
    margin-right: 16px;
    margin-inline-end: 16px;
    margin-inline-start: initial;
    max-width: 100%;
    direction: var(--direction);
  }

  @media all and (max-width: 1025px) {
    ha-date-range-picker {
      margin-right: 0;
      margin-inline-end: 0;
      width: 100%;
    }
  }
`;
