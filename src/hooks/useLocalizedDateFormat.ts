// src/hooks/useLocalizedDateFormat.ts
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import type { Locale } from 'date-fns';
import { enUS, es } from 'date-fns/locale';

const localesMap: Record<string, Locale> = {
  en: enUS,
  es: es
};

const dateFormats: Record<string, string> = {
  en: 'MM/dd/yyyy',
  es: 'dd/MM/yyyy'
};

export function useLocalizedDateFormat() {
  const { i18n } = useTranslation();

  function formatDate(date: Date | string) {
    const locale = localesMap[i18n.language] || enUS;
    const formatStr = dateFormats[i18n.language] || 'dd/MM/yyyy';

    // Si es string, lo convertimos a Date
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return format(dateObj, formatStr, { locale });
  }

  return { formatDate };
}
