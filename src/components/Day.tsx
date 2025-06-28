import { DateTime } from "luxon";

function Day({ date, empty, holidayArray = [] }: { date: DateTime, empty?: boolean, holidayArray?: Array<number> }) {

    const value = holidayArray[date.ordinal - 1];

    const maxValue = Math.max(...holidayArray); // normalize against max value
    const normalized = value / maxValue; // from 0 to 1
    const hue = normalized * 120; // 0 = red, 60 = yellow, 120 = green

    if (empty) {
        return <div className="day empty"></div>;
    }

    return <div className={`day `}  
    style={{backgroundColor: value != 1   ? `hsl(${hue}, 100%, 75%)`: ""}}>{date.day}</div>;
}
export default Day;


// ${value == -1 ? "weekend" : ""}
// ${value >= 0 ? `off ${}` : ""}