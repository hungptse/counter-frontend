import { language } from '../../config.js';

import englishLang from '../../image/flag/eng.svg';
import vietnamLang from '../../image/flag/vn.svg';

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: 'english',
      locale: 'en',
      text: 'English',
      icon: englishLang,
    },
    {
      languageId: 'vietnam',
      locale: 'vn',
      text: 'Tiếng Việt',
      icon: vietnamLang,
    },
  ],
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
