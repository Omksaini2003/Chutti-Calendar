
import { DateTime } from 'luxon';
import './App.css'
// import HolidayList from './components/HolidayList'
import Year from './components/Year'
import { getHolidayArray } from './utils/holiday-array';
import strategy from './utils/strategy';
import { useState } from 'react';

function App() {


  const customHolidays: Record<string, string[]> = {
    "2026-01-01": ["New Year's Day"],
    "2026-01-14": ["Makar Sankranti"],
    "2026-01-26": ["Republic Day"],
    "2026-03-04": ["Holi"],
    "2026-03-19": ["Chandramana ugadi"],
    "2026-03-21": ["Eid al-Fitr"],
    "2026-04-03": ["Good Friday"],
    "2026-05-01": ["Labour Day"],
    "2026-05-28": ["Bakri Eid"],
    "2026-06-26": ["Muharram"],
    "2026-08-15": ["Independence Day"],
    "2026-08-28": ["Varamahalakshmi"],
    "2026-09-14": ["Ganesh Chaturthi"],
    "2026-10-02": ["Gandhi Jayanti"],
    "2026-10-20": ["Aayudh Puja"],
    "2026-10-21": ["Dusshera"],
    "2026-11-01": ["Kannada Rajyotsava"],
    "2026-11-10": ["Diwali"],
    "2026-12-25": ["Christmas Day"],

    // Add more custom holidays as needed
  };

  const year = DateTime.now().year
  const today = DateTime.now().ordinal


  const [maxDayOffs, setMaxDayOffs] = useState(2);
  const [startDate, setStartDate] = useState(today);


  const baseHolidayArray = getHolidayArray(year, customHolidays);

  const [[holidayArray, maxVacation], setArray] = useState(strategy({ holidayArray: baseHolidayArray, maxDayOffs: maxDayOffs, start: startDate }));



  const handleFormInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = parseInt((document.getElementById('maxDayOffs') as HTMLInputElement).value, 10);
    // const startDateString = (document.getElementById('startDate') as HTMLInputElement).value;
    if (value && value > 0) {
      setMaxDayOffs(value);
    }

    // let startDateValue = today; // Fallback to today if no date is provided
    // if (startDateString) {
    //   startDateValue = DateTime.fromISO(startDateString).ordinal;
    // }
    
    // setStartDate(startDateValue);

    // Use startDateValue here instead of startDate
    const [newHolidayArray, newMaxVacation] = strategy({
      holidayArray: baseHolidayArray,
      maxDayOffs: value,
      // start: startDateValue
      start: startDate
    });
    setArray([newHolidayArray, newMaxVacation]);
    // console.log("submitted", value, startDate, newHolidayArray, newMaxVacation);
  };


  return (
    <>
      <div id='root'>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

          <div style={{ flex: '5', overflowY: 'auto' }}>
            <Year year={2026} holidayArray={holidayArray} startDate={startDate} setStartDate={setStartDate} />
          </div>

          <div style={{ flex: '1', fontSize: '1.5rem', marginBottom: '1rem', border: '1px solid black' }}>

            <div>
              <form onSubmit={handleFormInput}>
                <label>
                  Max Day Offs <input id='maxDayOffs' type='number' defaultValue={maxDayOffs} />
                </label>
                {/* <label>
                  Onwards <input id='startDate' type='date' defaultValue={DateTime.fromObject({ year: year, ordinal: startDate }).toFormat("yyyy-MM-dd")} />
                </label> */}
                <button>Submit</button>
              </form>
            </div>
            <h2>If you take {maxDayOffs} days off from office optimally, you can get upto {maxVacation} days of vacation</h2>

            {/* <HolidayList customHolidays={customHolidays} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
