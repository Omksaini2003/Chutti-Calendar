import Month from "./Month";

export default function Year({ year , holidayArray}: { year: number , holidayArray?: Array<number>}) {

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
                    <Month monthNumber={index} year={year} holidayArray={holidayArray} />
                ))}
            </div>
        </div>
    )
}