/* eslint-disable import/no-duplicates */
import { format, getTime, formatDistanceToNow, setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
/* eslint-disable import/no-duplicates */

setDefaultOptions({
  locale: ptBR,
});
// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';
  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function compareDates(inputDate: Date | string | null): number {
  // Convert inputDate to Date object if it's not

  if (inputDate === null) return 4;
  if (!(inputDate instanceof Date)) {
    inputDate = new Date(inputDate);
  }

  const diff: number = inputDate.getTime() - Date.now();

  // Convert milliseconds to days
  const diffDays: number = diff / (1000 * 60 * 60 * 24);

  if (diffDays <= 1) {
    return 1;
  }
  if (diffDays > 1 && diffDays <= 3) {
    return 2;
  }
  if (diffDays > 3 && diffDays <= 7) {
    return 3;
  }

  return 4;
}
