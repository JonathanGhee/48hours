import React, {  useState } from 'react';
import Canvas from './components/Canvas'

const App =() => {
  const [coords, setCoords] = useState([])

  let positionTracker = (e) => {
    let obj = {
      x: e.clientX,
      y: e.clientY
    }
    let arr = coords
    arr.push(obj)
    setCoords(arr)
  }

  return (
    <div>
      <Canvas width='900' height='700' onClick={(e)=>{positionTracker(e)}} data={coords}>test</Canvas>

    </div>
  )
}

export default App;