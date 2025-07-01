export function formatDate(raw: string | null | undefined) {
  if (!raw) return "N/A";

  const date = new Date(raw);
  if (isNaN(date.getTime())) return "Invalid Date";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${month} ${day}, ${year}, ${hours}:${paddedMinutes} ${ampm}`;
}
