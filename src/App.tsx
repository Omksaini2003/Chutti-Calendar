
import { DateTime } from 'luxon';
import './App.css'
// import HolidayList from './components/HolidayList'
import Year from './components/Year'
import { getHolidayArray } from './utils/holiday-array';
import strategy from './utils/strategy';
import { useState } from 'react';

function App() {


  const customHolidays: Record<string, string[]> = {
    "2025-01-26": ["Republic Day"],
    "2025-02-26": ["Maha Shivaratri"],
    "2025-03-14": ["Holi"],
    "2025-03-31": ["Eid al-Fitr"],
    "2025-04-10": ["Mahavir Jayanti"],
    "2025-04-18": ["Good Friday"],
    "2025-05-12": ["Buddha Purnima"],
    "2025-06-07": ["Bakri Eid"],
    "2025-07-06": ["Muharram"],
    "2025-08-15": ["Independence Day"],
    "2025-08-27": ["Ganesh Chaturthi"],
    "2025-09-05": ["Eid e Milad"],
    "2025-10-02": ["Gandhi Jayanti", "Dussehra"],
    "2025-10-20": ["Diwali"],
    "2025-11-05": ["Guru Nanak Jayanti"],
    "2025-12-25": ["Christmas Day"],

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
    const startDateString = (document.getElementById('startDate') as HTMLInputElement).value;
    if (value && value > 0) {
      setMaxDayOffs(value);
    }

    if (startDateString) {

      const startDateValue = DateTime.fromISO(startDateString).ordinal;
      setStartDate(startDateValue);

      // Use startDateValue here instead of startDate
      const [newHolidayArray, newMaxVacation] = strategy({
        holidayArray: baseHolidayArray,
        maxDayOffs: value,
        start: startDateValue
      });
      setArray([newHolidayArray, newMaxVacation]);
    }
  };


  return (
    <>
      <div id='root'>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>

          <div style={{ flex: '5', overflowY: 'auto' }}>
            <Year year={2025} holidayArray={holidayArray} />
          </div>

          <div style={{ flex: '1', fontSize: '1.5rem', marginBottom: '1rem', border: '1px solid black' }}>

            <div>
              <form onSubmit={handleFormInput}>
                <label>
                  Max Day Offs <input id='maxDayOffs' type='number' defaultValue={maxDayOffs} />
                </label>
                <label>
                  Onwards <input id='startDate' type='date' defaultValue={startDate} />
                </label>
                <button>Submit</button>
              </form>
            </div>
            <h2>If you take {maxDayOffs} from office optimally, you can take {maxVacation} days of vacation</h2>

            {/* <HolidayList customHolidays={customHolidays} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
