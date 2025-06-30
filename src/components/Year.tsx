// import type { DateTime } from "luxon";
import Month from "./Month";

export default function Year({ year , holidayArray, startDate, setStartDate}: { year: number , holidayArray?: Array<number>, startDate: number, setStartDate: React.Dispatch<React.SetStateAction<number>>}) {

    // input => start (def = now), maxoffs, edit baseholidayarray 

    return (
        <div>
            <div>
                <h1>
                    {year}
                </h1>
            </div>
            <div>
                {Array.from({ length: (12) }, (_, index) => (
                    <Month key={index} monthNumber={index} year={year} holidayArray={holidayArray} startDate={startDate} setStartDate={setStartDate}/>
                ))}
            </div>
        </div>
    )
}