export const formatDateForDisplay = (dateString: string): string => {
  const now = new Date();
  const parsedDate = new Date(dateString);

  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  const elapsed = now.getTime() - parsedDate.getTime();

  if (elapsed < minute) {
    return 'Updated just now';
  } else if (elapsed < hour) {
    return `Updated ${Math.round(elapsed / minute)} minutes ago`;
  } else if (elapsed < day) {
    return `Updated ${Math.round(elapsed / hour)} hours ago`;
  } else if (elapsed < day * 2) {
    return 'Updated yesterday';
  } else if (elapsed < month) {
    return `Updated ${Math.round(elapsed / day)} days ago`;
  } else if (parsedDate.getFullYear() === now.getFullYear()) {
    return `Updated on ${parsedDate.toLocaleString('default', { month: 'short' })} ${parsedDate.getDate()}`;
  } else {
    return `Updated on ${parsedDate.toLocaleString('default', { month: 'short' })} ${parsedDate.getDate()}, ${parsedDate.getFullYear()}`;
  }
}
