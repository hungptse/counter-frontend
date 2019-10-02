import Enlang from './entries/en-US';
import Vnlang from './entries/vi-VN';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  en: Enlang,
  vn: Vnlang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.vn.data);

export default AppLocale;
