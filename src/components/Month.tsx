import Day from "./Day";
import { DateTime } from "luxon";

export default function Month({ monthNumber = 0, year = 2025, holidayArray = [] , startDate, setStartDate}: { monthNumber?: number, year?: number , holidayArray?: Array<number>, startDate:number, setStartDate: React.Dispatch<React.SetStateAction<number>>}) {

    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    const firstDay = DateTime.local(year, monthNumber + 1, 1); // Luxon months are 1-based
    const daysInMonth = firstDay.daysInMonth;

    // Weekday offset: Luxon weekday (1 = Monday, 7 = Sunday)
    const startOffset = firstDay.weekday % 7; // adjust for Sunday = 0

    const days: DateTime[] = Array.from({ length: daysInMonth! }, (_, i) =>
        firstDay.plus({ days: i })
    );


    return (
        <>
            <h2>{monthName[monthNumber]}</h2>
            <div className="month">
                {/* Empty cells for offset */}
                {Array.from({ length: startOffset }, (_, i) => (
                    <div key={`empty-${i}`} className="empty-day" />
                ))}

                {/* Actual days */}
                {days.map((date) => (
                    <Day key={date.toISODate()} date={date} holidayArray = {holidayArray} startDate={startDate} setStartDate = {setStartDate} />
                ))}
            </div>
        </>
    );
}



