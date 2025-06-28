
import { DateTime } from 'luxon';
import './App.css'
import HolidayList from './components/HolidayList'
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


  const [maxDayOffs, setMaxDayOffs] = useState(2);

  const today = DateTime.now().ordinal

  const baseHolidayArray = getHolidayArray(year, customHolidays);

  const [holidayArray, maxVacation] = strategy({ holidayArray: baseHolidayArray, maxDayOffs: maxDayOffs, start: today });


  const handleMaxOffInput = (e) => {
    e.preventDefault();
    const value = parseInt(e.target[0].value, 10);
    if (value && value > 0) {
      setMaxDayOffs(value);
    }
  };

  return (
    <>
      <div id='root'>
        <div style={{ display: 'flex' , height: '100vh'}}>

          <div style={{ flex: '5', overflowY: 'auto' }}>
            <Year year={2025} holidayArray={holidayArray} />
          </div>

          <div style={{ flex: '1'}}>
            
            <div>
              <form onSubmit={handleMaxOffInput}>
                Max Day Offs <input type='number' />
                <button>Submit</button>
              </form>
              <p>You can take {maxVacation} days of vacation</p>
            </div>


            {/* <HolidayList customHolidays={customHolidays} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
