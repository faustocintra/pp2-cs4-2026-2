const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC",
});

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "N/A";

  const formattedDate = new Date(date);
  if (Number.isNaN(formattedDate.getTime())) return "N/A";

  return dateFormatter.format(formattedDate);
}