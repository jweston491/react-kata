export const formatDateTime = (dateString: string): string => {
const date = new Date(dateString);

// Round up to the nearest minute
if (date.getSeconds() >= 30) {
    date.setMinutes(date.getMinutes() + 1);
}
date.setSeconds(0);
date.setMilliseconds(0);

// Get day of the week
const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);

// Get month
const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);

// Get day with ordinal suffix (st, nd, rd, th)
const day = date.getDate();
const ordinalSuffix = (n: number) => {
    if (n >= 11 && n <= 13) return "th";
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
const formattedDay = `${day}${ordinalSuffix(day)}`;

// Get formatted time (rounded up)
const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
}).format(date);

// Final formatted string
return `${dayOfWeek}, ${month} ${formattedDay}, ${formattedTime}`;
};