export const formatDateRange = (
  start: string | null,
  end: string | null
) => {
  if (!start || !end) return "--:--";

  const startDate = new Date(start);
  const endDate = new Date(end);

  const format = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return `${format(startDate)} - ${format(endDate)}`;
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-blue-100 text-blue-600";
    case "completed":
      return "bg-green-100 text-green-600";
    case "scheduled":
      return "bg-yellow-100 text-yellow-600";
    case "dropped":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};