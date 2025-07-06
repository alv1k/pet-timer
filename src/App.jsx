import { useState } from 'react'
import './index.css'
import ThemeButton from './components/ThemeButton.jsx'
import { PatternFormat } from 'react-number-format';

function App() {
  const [count, setCount] = useState(0);
  const value = '000500';
  const [timerStarted, setTimerStatus] = useState(false);
  let amount = 300;
  const startTimer = () => {
    console.log('startTimer');
    if(!timerStarted) {
      setTimerStatus(true);
      let timer = setInterval(amount--, 1000)
    } else {
      setTimerStatus(false)
      
    }
    console.log(amount);

  }

  return (
    <div className="h-[100vh] flex flex-col relative">
      <div className="absolute top-0 right-0 p-12">
        <ThemeButton />
      </div>
      <div className="w-fit m-auto">
        <div className="flex flex-col gap-2">
          <h1 className="cursor-default">Set timer</h1>
          <PatternFormat 
            value={value}
            className="rounded-md bg-amber-300 text-amber-950 p-3 text-3xl hover:bg-amber-200 active:bg-amber-100 cursor-pointer" 
            format="##:##:##"
            allowEmptyFormatting
            mask="_"
          />
        </div>
        <button 
          onClick={() => startTimer(value)} 
          className="mt-5 w-1/2  p-3 bg-green-700 rounded-xl hover:bg-green-600 active:bg-green-500 cursor-pointer"
        >
          {timerStarted ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  )
}

export default App
