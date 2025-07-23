import { createEffect, createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import i18n from '../../i18n/i18n';

export const changeLanguage = createEvent<string>();

const changeLanguageFx = createEffect<string, void>({
  handler: (lang) => {
    i18n.changeLanguage(lang);
  }
});

const $language = createStore(i18n.language).on(
  changeLanguage,
  (_, lang) => lang
);

sample({
  source: $language,
  target: changeLanguageFx
});

persist({
  store: $language,
  key: 'language'
});

export const langStores = {
  $language
};

export const langEvents = {
  changeLanguage
};
