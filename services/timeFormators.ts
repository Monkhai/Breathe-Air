import { DateTime } from 'luxon';

export const formatDate = (timestamp: string) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const date = DateTime.fromSQL(timestamp, { zone: 'utc' }).setZone(userTimeZone);
  const today = DateTime.now().setZone(userTimeZone).startOf('day');
  const yesterday = today.minus({ days: 1 });

  const dateWithoutTime = date.startOf('day');
  const timeStr = date
    .toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: true }, { locale: 'en-US' })
    .toLowerCase();

  if (dateWithoutTime.equals(today)) {
    return `Today, ${timeStr}`;
  } else if (dateWithoutTime.equals(yesterday)) {
    return 'Yesterday';
  } else {
    return date.toLocaleString(DateTime.DATE_SHORT);
  }
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = remainingSeconds.toFixed(0).toString().padStart(2, '0');

  return `${minutesStr}:${secondsStr}`;
};
