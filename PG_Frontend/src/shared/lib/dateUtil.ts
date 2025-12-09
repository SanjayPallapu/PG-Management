import { format, parseISO, isValid } from 'date-fns';

export const dateUtil = {
  format: (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      return isValid(dateObj) ? format(dateObj, formatStr) : 'Invalid Date';
    } catch {
      return 'Invalid Date';
    }
  },

  formatDateTime: (date: string | Date): string => {
    return dateUtil.format(date, 'MMM dd, yyyy hh:mm a');
  },

  formatMonthYear: (date: string | Date): string => {
    return dateUtil.format(date, 'MMMM yyyy');
  },

  isOverdue: (dueDate: string): boolean => {
    return new Date(dueDate) < new Date();
  },

  getDaysUntil: (date: string): number => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },
};
