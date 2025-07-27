import { useEffect, useState, useRef } from 'react'
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

  
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const audioRef = useRef(null); // реф на аудио
  
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
            if (audioRef.current) {
              audioRef.current.play();
            }
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
  };
  
  const handleInputChange = (e, setter, max) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 2);

    let num = parseInt(value || '0', 10);
    if (num > max) {
      num = max;
    }
    
    const formattedValue = num.toString().padStart(2, '0');
  
    setter(value);
  };

  return (
    <div className="h-[100vh] flex flex-col relative">
      <div className="absolute top-0 right-0 p-12">
        <ThemeButton />
      </div>
      
      <div className="2xl:w-1/7 xl:w-1/5 md:w-2/7 w-5/6 m-auto">
        <div className="text-center">
          <h1 className="pb-5">Set interval</h1>
          <div className="border rounded justify-center flex gap-2 mb-4 py-2">
            <div className="text-center">
              <label className="block text-sm">Hours</label>
              <input 
                type="text" 
                value={customHours}
                onChange={(e) => handleInputChange(e, setCustomHours, 23)}
                className="p-2 w-16 text-center rounded-md focus:outline-0 focus:shadow-md"
                maxLength={2}
                ref={hoursRef}
                onFocus={() => hoursRef.current.select()} 
              />
            </div>
            <span className="self-end pb-2">:</span>
            
            <div className="text-center">
              <label className="block text-sm">Minutes</label>
              <input 
                type="text" 
                value={customMinutes}
                onChange={(e) => handleInputChange(e, setCustomMinutes, 59)}
                className=" p-2 w-16 text-center rounded-md focus:outline-0 focus:shadow-md"
                maxLength={2}
                ref={minutesRef}
                onFocus={() => minutesRef.current.select()} 
              />
            </div>
            <span className="self-end pb-2">:</span>
            
            <div className="text-center">
              <label className="block text-sm">Seconds</label>
              <input 
                type="text" 
                value={customSeconds}
                onChange={(e) => handleInputChange(e, setCustomSeconds, 59)}
                className=" p-2 w-16 text-center rounded-md focus:outline-0 focus:shadow-md"
                maxLength={2}
                ref={secondsRef}
                onFocus={() => secondsRef.current.select()} 
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-2 w-full">
          <button className="w-full px-4 py-2 border border-green-500 text-green-500 rounded-xs" onClick={handleSetCustomTime}>
            Set time
          </button>
          <button
            onClick={() => {
              setCustomHours('00');
              setCustomMinutes('00');
              setCustomSeconds('00');
            }}
            className="w-full px-4 py-2 border border-red-500 text-red-500 rounded-sx"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="2xl:w-1/7 xl:w-1/5 md:w-2/7 w-5/6 m-auto mt-0">
        <div className="flex flex-col gap-2 text-center">
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
        <div className="flex gap-2 mt-5 h-14">
        {
          (hours || minutes || seconds) ?
            <button 
              onClick={startTimer} 
              className="w-full p-3 border border-green-700 text-green-700 rounded-xs hover:bg-green-600 active:bg-green-500 cursor-pointer"
            >
              {timerStarted ? 'Pause' : 'Start'}
            </button> 
            : ''
        }
        {
          timeLeft > 0 && (
            <button
              onClick={() => {
                setTimeLeft(0);
                setIsRunning(false);
              }}
              className="px-4 py-2  border border-blue-500 text-blue-500 rounded-xs"
            >
              Cancel
            </button>
          )
        }
        </div>
        <audio ref={audioRef} src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" preload="auto" />    
      </div>      
    </div>
  )
}

export default App
