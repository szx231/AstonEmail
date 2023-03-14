export const timeAgo = (dateStr: string) => {
  const date = new Date(dateStr);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) {
    return `Дата в будущем: ${date.toLocaleString()}`;
  }

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = now.getMonth() - date.getMonth() + 12 * (now.getFullYear() - date.getFullYear());
  const diffYears = now.getFullYear() - date.getFullYear();

  if (diffYears >= 1) {
    return `${diffYears} г. назад`;
  }
  if (diffMonths >= 1) {
    return `${diffMonths} мес. назад`;
  }
  if (diffWeeks >= 1) {
    return `${diffWeeks} нед. назад`;
  }
  if (diffDays >= 1) {
    return `${diffDays} дн. назад`;
  }
  if (diffHours >= 1) {
    return `${diffHours} ч. назад`;
  }
  if (diffMinutes >= 1) {
    return `${diffMinutes} мин. назад`;
  }
  return `${diffSeconds} сек. назад`;
};
