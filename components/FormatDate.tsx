export function formatDate(date: Date | string | number, format: string): string {
  let dateObj: Date;

  // Convert input to a Date object
  if (date instanceof Date) {
    dateObj = date;
  } else {
    dateObj = new Date(date);
  }

  // Check for invalid dates
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date");
  }

  // Formatting options
  const options: { [key: string]: string | number } = {
    yyyy: dateObj.getFullYear(),
    yy: String(dateObj.getFullYear()).slice(-2),
    MMMM: dateObj.toLocaleString("default", { month: "long" }),
    MMM: dateObj.toLocaleString("default", { month: "short" }),
    MM: String(dateObj.getMonth() + 1).padStart(2, "0"),
    M: dateObj.getMonth() + 1,
    dd: String(dateObj.getDate()).padStart(2, "0"),
    d: dateObj.getDate(),
    HH: String(dateObj.getHours()).padStart(2, "0"),
    H: dateObj.getHours(),
    hh: String(dateObj.getHours() % 12 || 12).padStart(2, "0"),
    h: dateObj.getHours() % 12 || 12,
    mm: String(dateObj.getMinutes()).padStart(2, "0"),
    m: dateObj.getMinutes(),
    ss: String(dateObj.getSeconds()).padStart(2, "0"),
    s: dateObj.getSeconds(),
    a: dateObj.getHours() < 12 ? "AM" : "PM",
  };

  // Replace format tokens with actual values
  return format.replace(
    /yyyy|yy|MMMM|MMM|MM|M|dd|d|HH|H|hh|h|mm|m|ss|s|a/g,
    (match) => options[match].toString()
  );
}

export function formatTime(
  time: Date | string | number
): { hour: string; minute: string; meridian: "AM" | "PM" } {
  let dateObj: Date;

  // Convert input to a Date object
  if (time instanceof Date) {
    dateObj = time;
  } else {
    dateObj = new Date(time);
  }

  // Check for invalid dates
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid time");
  }

  // Extract hour, minute, and meridian
  const hours24 = dateObj.getHours(); // 24-hour format
  const hour = (hours24 % 12 || 12).toString().padStart(2, "0"); // Convert to 12-hour format and pad
  const minute = dateObj.getMinutes().toString().padStart(2, "0"); // Pad single digits with leading zero
  const meridian: "AM" | "PM" = hours24 < 12 ? "AM" : "PM";

  return { hour, minute, meridian };
}
