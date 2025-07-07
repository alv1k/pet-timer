import { useState } from 'react'
import './index.css'
import ThemeButton from './components/ThemeButton.jsx'
import { PatternFormat } from 'react-number-format';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-[100vh] flex flex-col relative">
      <div className="absolute top-0 right-0 p-12">
        <ThemeButton />
      </div>
      <div className="w-fit m-auto">
        <div className="flex flex-col gap-2">
          <h1>Set timer</h1>
          <PatternFormat value="000000" className="rounded-md bg-amber-300 text-amber-950 p-3 text-3xl" format="##:##:##" allowEmptyFormatting mask="_" />
        </div>
        <div className="mt-12">
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <button className="bg-green-600" onClick={() => setCount()}>Start!</button>
          <button className="bg-red-600" onClick={() => setCount()}>Stop!</button>
          <button className="bg-yellow-600" onClick={() => setCount()}>Pause!</button>
        </div>
      </div>
    </div>
  )
}

export default App
