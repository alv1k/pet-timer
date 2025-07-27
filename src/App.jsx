import { useEffect, useState } from 'react'
import './index.css'
import ThemeButton from './components/ThemeButton.jsx'
import { PatternFormat } from 'react-number-format';

function App() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerStarted, setTimerStatus] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  
  const [isSettingTime, setIsSettingTime] = useState(false);
  const [customHours, setCustomHours] = useState('00');
  const [customMinutes, setCustomMinutes] = useState('00');
  const [customSeconds, setCustomSeconds] = useState('00');
  const [isRunning, setIsRunning] = useState(false);
  
  const startTimer = () => {    
    if (timerStarted) {
      clearInterval(timerId);
      setTimerStatus(false);
    } else {
      setTimerStatus(true);
      const id = setInterval(() => {
        setTimeLeft(prevTime => {          
          if (prevTime <= 1) {
            clearInterval(id);
            setTimerStatus(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setTimerId(id);
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  useEffect(() => {
    const h = Math.floor(timeLeft /3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    console.log(hours, minutes, seconds, 'hours minutes seconds');
  }, [timeLeft]);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');


  
  const handleSetCustomTime = () => {
    const totalSeconds = 
      parseInt(customHours || '0') * 3600 +
      parseInt(customMinutes || '0') * 60 +
      parseInt(customSeconds || '0');
    
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setIsSettingTime(false);
  };
  
  const handleInputChange = (e, setter) => {

    let value = e.target.value.replace(/\D/g, '').slice(0, 2);

    if (value === '') {
      value = '00';
    } else if (value.length === 1) {
      value = value.padStart(2, '0');
    }
    console.log(value, 'value000');
    setter(value);
  };

  return (
    <div className="h-[100vh] flex flex-col relative">
      <div className="absolute top-0 right-0 p-12">
        <ThemeButton />
      </div>
      
      <div className="w-1/7 m-auto">
        <div>
          <h1>settings</h1>
          <div className="border rounded justify-center flex flex-row gap-2 mb-4 py-2">
            <div>
              <label className="block text-sm">Hours</label>
              <input 
                type="text" 
                value={customHours}
                onChange={(e) => handleInputChange(e, setCustomHours)}
                className=" p-2 w-16"
                maxLength={2}
              />
            </div>
            <span className="self-end pb-2">:</span>
            
            <div>
              <label className="block text-sm">Minutes</label>
              <input 
                type="text" 
                value={customMinutes}
                onChange={(e) => handleInputChange(e, setCustomMinutes)}
                className=" p-2 w-16"
                maxLength={2}
              />
            </div>
            <span className="self-end pb-2">:</span>
            
            <div>
              <label className="block text-sm">Seconds</label>
              <input 
                type="text" 
                value={customSeconds}
                onChange={(e) => handleInputChange(e, setCustomSeconds)}
                className=" p-2 w-16"
                maxLength={2}
              />
            </div>

          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSetCustomTime}>
            Set time
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsSettingTime(false)}>
            Cancel
          </button>
          <button
            onClick={() => {
              setTimeLeft(0);
              setIsRunning(false);
              setCustomHours('00');
              setCustomMinutes('00');
              setCustomSeconds('00');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="w-1/7 m-auto">
        <div className="flex flex-col gap-2">
          <h1 className="cursor-default">Timer</h1>
          <PatternFormat 
            value={formattedHours + formattedMinutes + formattedSeconds}
            className="rounded-md bg-amber-300 text-amber-950 p-3 text-3xl hover:bg-amber-200 active:bg-amber-100 cursor-pointer" 
            format="##:##:##"
            allowEmptyFormatting
            mask="_"
            displayType="text"
          />

        </div>
        <button 
          onClick={startTimer} 
          className="mt-5 w-1/2  p-3 bg-green-700 rounded-xl hover:bg-green-600 active:bg-green-500 cursor-pointer"
        >
          {timerStarted ? 'Stop' : 'Start'}
        </button>
        
        {timeLeft > 0 && (
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="ms-5 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isRunning ? 'Pause' : 'Resume'}
          </button>
        )}
      </div>

      
    </div>
  )
}

export default App
