import { DateTime } from "luxon";

export default function HolidayList({
    customHolidays,
}: {
    customHolidays: Record<string, string[]>;
}) {
    const sortedDates = Object.keys(customHolidays).sort();

    return (
        <div>
            <ol>
                {sortedDates.map((dateStr) => {
                    const formattedDate = DateTime.fromISO(dateStr).toFormat("DDD"); // e.g., Jan 26, 2025
                    const holidays = customHolidays[dateStr];

                    return (
                        <li key={dateStr}>
                            <p>
                                <strong>{formattedDate}</strong>

                                {holidays.map((holiday, index) => (
                                    <p key={index}>{holiday}</p>
                                ))}

                            </p>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
