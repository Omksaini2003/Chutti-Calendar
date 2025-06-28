import { DateTime } from "luxon";

type HolidayDict = Record<string, string[]>;

export function getHolidayArray(year: number, customHolidays: HolidayDict): number[] {
    const daysInYear = DateTime.local(year).daysInYear;
    const holidays = new Array(daysInYear).fill(1);

    for (let i = 0; i < daysInYear; i++) {
        const currentDate = DateTime.local(year).plus({ days: i });
        const weekday = currentDate.weekday; // 1 = Monday, ..., 6 = Saturday, 7 = Sunday

        if (weekday === 6 || weekday === 7) {
            holidays[i] = 0; // weekend
        }


        // Mark custom holidays as 0
        const dateStr = currentDate.toISODate()!; // e.g., "2025-12-25"
        if (customHolidays[dateStr]) {
            holidays[i] = 0;
        }
    }



    return holidays;
}