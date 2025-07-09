import { useEffect, useState } from 'react'
import './index.css'
import ThemeButton from './components/ThemeButton.jsx'
import { PatternFormat } from 'react-number-format';

function App() {
  const [timeLeft, setTimeLeft] = useState(19800);
  const [timerStarted, setTimerStatus] = useState(false);
  const [timerId, setTimerId] = useState(null);
  let hours = null;
  let minutes = null;
  let seconds = null;

  const defaultLength = 6;

  // let formatted = new Date(timeLeft  * 1000).toISOString().substring(11, 8);
  let formatted = 0;
  if (defaultLength - timeLeft.toString().length == 0) {
    formatted = timeLeft
  } else {
    let num = defaultLength - timeLeft.toString().length;
    formatted = '0'.repeat(num)+ timeLeft.toString();
    
  }
  
  
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
    hours = parseInt(timeLeft / 60);
    minutes = parseInt(timeLeft / 60) > 59 ? parseInt(timeLeft / 60) : parseInt(timeLeft / 60);
    seconds = (timeLeft % 60);
    console.log(hours, minutes, seconds, 'hours minutes seconds');    
  }, [timeLeft]);

  return (
    <div className="h-[100vh] flex flex-col relative">
      <div className="absolute top-0 right-0 p-12">
        <ThemeButton />
      </div>
      <div className="w-fit m-auto">
        <div className="flex flex-col gap-2">
          <h1 className="cursor-default">Set timer</h1>
          <PatternFormat 
            value={formatted}
            className="rounded-md bg-amber-300 text-amber-950 p-3 text-3xl hover:bg-amber-200 active:bg-amber-100 cursor-pointer" 
            format="##:##:##"
            allowEmptyFormatting
            mask="_"
          />
        </div>
        <button 
          onClick={startTimer} 
          className="mt-5 w-1/2  p-3 bg-green-700 rounded-xl hover:bg-green-600 active:bg-green-500 cursor-pointer"
        >
          {timerStarted ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  )
}

export default App
