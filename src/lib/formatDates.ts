export function formatDates(isoDate: string) {
  const date = new Date(isoDate);
  const now = new Date();

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();

  if (isSameDay(date, now)) {
    return `Today, ${time}`;
  }

  if (isSameDay(date, yesterday)) {
    return `Yesterday, ${time}`;
  }

  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  const dayOfMonth = date.getDate();

  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}, ${dayOfMonth}${getOrdinal(dayOfMonth)} ${month}, ${year}`;
}
