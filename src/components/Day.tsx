import { DateTime } from "luxon";
import { useState } from "react";

function Day({ date, empty, holidayArray = [], startDate, setStartDate }: { date: DateTime, empty?: boolean, holidayArray?: Array<number>, startDate: number, setStartDate: React.Dispatch<React.SetStateAction<number>> }) {
    
    const value = holidayArray[date.ordinal - 1];
    
    const maxValue = Math.max(...holidayArray); // normalize against max value
    const normalized = value / maxValue; // from 0 to 1
    const hue = normalized * 120; // 0 = red, 60 = yellow, 120 = green
    
    const [isSelected, setIsSelected] = useState(date.ordinal==startDate);

    let dayStyle = {
        backgroundColor: value != 1   ? `hsl(${hue}, 100%, 75%)`: "",
        border: isSelected ? "3px solid #000" : "1px solid #ccc", // Thicker border when selected

    };
    const handleOnClickDay = () => {
        setIsSelected(!isSelected);

        if (!isSelected) {
            setStartDate( date.ordinal );
        }
        else{
            setStartDate(DateTime.now().ordinal); // Reset to today if deselected
        }
        // console.log(`Clicked on ${date.toISODate()}`);
    };

    if (empty) {
        return <div className="day empty"></div>;
    }

    return <div className={`day `}  
    // style={{}}
    onClick={handleOnClickDay}
    style= {dayStyle}>{date.day}</div>;
}


export default Day;


// ${value == -1 ? "weekend" : ""}
// ${value >= 0 ? `off ${}` : ""}