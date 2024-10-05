import { format } from 'date-fns';

export const formatDate = (date: Date) => format(date, 'dd MMM yyyy');
