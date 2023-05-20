import * as en from './languages/en.json';
import * as de from './languages/de.json';
import * as pt_PT from './languages/pt-PT.json';
import * as es from './languages/es.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages: any = {
  en: en,
  de: de,
  pt: pt_PT,
  es: es,
};

export function localize(string: string, search = '', replace = '') {
  const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');

  console.log(lang);

  let translated: string | undefined;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o && o[i], languages['en']);

  if (search !== '' && replace !== '') {
    translated = translated?.replace(search, replace);
  }
  return translated;
}
