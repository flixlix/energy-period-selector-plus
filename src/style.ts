import { css } from 'lit';

export const styles = css`
  ha-card {
    padding: 1rem;
  }
  h1 {
    padding: 0;
    padding-bottom: 1rem;
  }
`;

export const stylesBase = css`
  .date-range-container {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 342px;
    gap: 1rem;
  }
  .mdc-text-field__icon .mdc-text-field__icon--trailing {
    padding-left: 0;
  }
  .row {
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    column-gap: 1rem;
    min-width: 342px;
  }
  .label {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 20px;
    /* margin-bottom: 8px; */
  }
  .period {
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    margin-left: 12px;
  }
  mwc-button {
    margin-left: 8px;
  }
  ha-icon-button:not(.today-icon) {
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
  ha-icon-button:not(.today-icon) {
    --mdc-icon-button-size: 28px;
  }
  ha-button-toggle-group {
    direction: var(--direction);
  }
  mwc-button {
    flex-shrink: 0;
  }
`;
