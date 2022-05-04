import React, { useState, useRef, useEffect } from 'react'


const Canvas = props => {
  const [gameConfig, setGameConfig] = useState([])
  const [playerCount,setPlayerCount] = useState([])
  const [currCount,setCurrCount] = useState(0)
  const [playing, setPlaying] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //if(props.data.length>0)setCtx(true)
    //Our first draw
    context.fillStyle = '#000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])

  let showPlayerDots = () => {
   // if(props.data.length<1) return
   if(playerCount.length<1)return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    for(let i in playerCount) {
      context.clearRect(playerCount[i].x, playerCount[i].y, 5, 5);
    }

  }
  let showGameDots = () => {
    // if(props.data.length<1) return
    if(gameConfig.length<1)return
     const canvas = canvasRef.current
     const context = canvas.getContext('2d')
     for(let i in gameConfig) {
      context.fillStyle = `rgb(${gameConfig[i].r}, ${gameConfig[i].g}, ${gameConfig[i].b})`

      context.fillRect(gameConfig[i].x, gameConfig[i].y, 5, 5);
     }
   }

  // let showLines = () => {
  //   if(props.data.length<1) return
  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d')
  //   context.beginPath();
  //   context.moveTo(props.data[0].x, props.data[0].y)
  //   for(let i in props.data) {
  //     context.lineTo(props.data[i].x, props.data[i].y);
  //   }
  //   context.strokeStyle ='#FFFFFF' //white
  //   context.stroke();
  // }
  let clear = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //setCtx(context)
    //Our first draw
    context.fillStyle = '#000000' //black
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    setPlaying(false)
    setCurrCount(0)
  }
  let generateDots = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let arr = []
    for(let i=0;i<2;i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;

      let r = Math.random()*255
      let g = Math.random()*255
      let b = Math.random()*255
      let obj = {
        x:x.toFixed(),
        y:y.toFixed(),
        r:r.toFixed(),
        g:g.toFixed(),
        b:b.toFixed()
      }
      arr.push(obj)
      context.fillStyle = `rgb(${r}, ${g}, ${b})`
      context.fillRect(x,y, 8, 8);
    }

    setGameConfig(arr)
    setPlaying(true)
    setPlayerCount([])
    setCurrCount(0)

  }
  let positionTracker = (e) => {
    if(playing && currCount< gameConfig.length) {
      let obj = {
        x: e.clientX,
        y: e.clientY
      }
      //console.log(obj)
      let arr = playerCount
      arr.push(obj)
      setPlayerCount(arr)
      setCurrCount(currCount+1)
    }
  }
  let calculate = (cpu,player) => {

    if(cpu.length<1 || player.length<1) return
    let result = []
    for(let i in cpu) {
      let arr = []
      for(let k in player) {
        let obj = {
          cpu:cpu[i],
          player:player[i],
          distance:Math.sqrt(  Math.abs(cpu[i].x - player[i].x)**2 + Math.abs(cpu[i].y - player[i].y)**2  ).toFixed()
        }
        arr.push(obj)
      }
        let minDistance = (arr) =>{
          let obj = arr[0]
          let min = obj.distance
          for(let i in arr) {
            if(arr[i].distance < min) {
              obj = arr[i]
              min = obj.distance
            }
          }
          return obj
        }
        
        result.push(minDistance(arr))
    }
    //console.log(result)
  }
 // console.log(gameConfig,playing,props.data,currCount,playerCount)
  return (
  <>
    <canvas ref={canvasRef} {...props} onClick={(e)=>{positionTracker(e)}}/>
    <button onClick={()=>{generateDots()}}>play</button>
    <button onClick={()=>{showPlayerDots()}}>show player dots</button>
    {/* <button onClick={()=>{showLines()}}>Lines</button> */}
    <button onClick={()=>{clear()}}>clear</button>
    <button onClick={()=>{showGameDots()}}>show game dots</button>
    <button onClick={()=>{calculate(gameConfig,playerCount)}}>calculate</button>
  </>
  )
}
export default Canvas