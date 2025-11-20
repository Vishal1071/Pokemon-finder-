import { useState } from 'react'
import './Home.css'

function Home() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const incre =()=>{
    setCount(count + step);
  }
  const res =()=>{
    setCount(0);
  }
  const decre =()=>{
    setCount(count - step);
  }

  return (
    <div className="counter">
      <h1>useState challenge</h1>
      <p>Count:  {count}</p>

      <div className="counter-input">
        <span>Step:</span>
        <input type="number" value={step} onChange={(e)=>setStep(Number(e.target.value))} />
      </div>

      <div className="counter-btns">
        <button onClick={incre} disabled={count >=100}>Increment</button>
        <button onClick={res} >Reset</button>
        <button onClick={decre} disabled={count <= 0}>Decrement</button>
      </div>
    </div>

  )
}

export default Home
