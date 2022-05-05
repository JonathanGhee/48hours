import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components';

const Canvas = props => {
  const [gameMarks, setGameMarks] = useState([])        //Holds all the generated marks/points/coordinates
  const [playerMarks,setPlayerMarks] = useState([])     //Holds all the user marks/points/coordinates
  const [currCount,setCurrCount] = useState(0)          //number of marks the player has made within current game instance
  const [playing, setPlaying] = useState(false)         //Status if user is currently in a game

  const canvasRef = useRef(null)

  useEffect(() => {
    //setting canvas
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //setting black blackground and dimensions
    context.fillStyle = '#000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    //writing quick instructions.
    context.fillStyle = '#FFFFFF'
    context.font ='20px serif'
    context.fillText('Press play to start',0,20)
    context.fillText('Rules: Click on each dot, then hit Calculate',0,40)
  }, [])

  let showPlayerDots = () => {
   if(playerMarks.length < 1) return;

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    for(let i in playerMarks) {
      context.clearRect(playerMarks[i].x-5, playerMarks[i].y-5, 5, 5);
    }
  }
  //Will refactor so that I only need one showDots (TECHNICAL DEBT)
  let showGameDots = () => {
    if(gameMarks.length < 1) return;

     const canvas = canvasRef.current
     const context = canvas.getContext('2d')

     for(let i in gameMarks) {
      context.fillStyle = `rgb(${gameMarks[i].r}, ${gameMarks[i].g}, ${gameMarks[i].b})`
      context.fillRect(gameMarks[i].x, gameMarks[i].y, 5, 5);
     }
  }

  let clear = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.fillStyle = '#000000' //black
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    setPlaying(false)
    setCurrCount(0)
  }

  let generateDots = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.fillStyle = '#000000' //black
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    let arr = []
    for(let i=0;i < 10;i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let r = Math.random()*255
      let g = Math.random()*255
      let b = Math.random()*255

      let obj = {
        x:Number(x.toFixed()),
        y:Number(y.toFixed()),
        r:Number(r.toFixed()),
        g:Number(g.toFixed()),
        b:Number(b.toFixed())
      }
      arr.push(obj)
      context.fillStyle = `rgb(${r}, ${g}, ${b})`
      context.fillRect(x,y, 8, 8);
    }
    setGameMarks(arr)
    setPlaying(true)
    setPlayerMarks([])
    setCurrCount(0)
  }

  let trackPosition = (e) => {
    if(playing && currCount< gameMarks.length) {
      let obj = {
        x: e.clientX,
        y: e.clientY
      }

      let arr = playerMarks
      arr.push(obj)
      setPlayerMarks(arr)
      setCurrCount(currCount+1)
    }
  }
  /*
  This calculation is currently just the distance formula between two points.
  https://byjus.com/maths/distance-between-points/ can be a good resource if you want to know more about it.

  TLDR; calculates the distance between each cpu mark to every player mark, then stores the minimum distance.
  if that minimum distance meets threshold, its a hit.

  Currently, this isn't an optimal solution.
  1 ) No accountability for every mark
    One mark could theretically hit all 10

  2 ) Visually incorrect
    points being used are the top left corners of small rectangles. This doesn't align well with what we see.
    -notes- Other html elements that shift the canvas position RUIN it. I need to experiment more with this, and
    this is why the canvas is currently in the top left corner, rather than centered

    Possible Solution:
    Visualize points with drawn circles around the points, rather than squares,
     and scan around each mark(game and player) for color differences from the back ground color.
     I dont know how to read colors yet. I have a gut feeling the canvas element may have some property I can use.
  */

  let calculate = (cpu,player) => {
    if(!playing) return;
    if(cpu.length !== player.length) return
    let result = []
    for(let i in cpu) {
      let arr = []
      for(let k in player) {
        let obj = {
          cpu:cpu[i],
          player:player[i],
          distance:Number(Math.sqrt( Math.abs(cpu[i].x - player[i].x)**2 + Math.abs(cpu[i].y - player[i].y)**2 ).toFixed())
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
    setPlaying(false)
    axios.post('http://localhost:3000/',result) // keep the data for future use (using mongoDB bc MONGO B EZ)
    displayHitMiss(result)
  }

  //Will refactor so that I only need one generateDot. it was just simply faster to just make a new function. (TECHNICAL DEBT)
  let generateDot = (color, x, y ) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`
    context.fillRect(x,y, 7, 7);
  }

  let displayHitMiss = (arr) => {

    for(let i in arr) {
      let color = {
      }
      let {distance, cpu } = arr[i]
      if(distance <= 500) {
        //green
        console.log('a ',color)
        color.r = 0
        color.g = 255
        color.b = 0
        console.log(color, cpu)
        generateDot(color, cpu.x, cpu.y)
      } else {
        //draw red dot
        color.r = 255
        color.g = 0
        color.b = 0
        generateDot(color, cpu.x, cpu.y)
      }
    }
  }
  return (
  <>
    <canvas ref={canvasRef} {...props} onClick={(e)=>{trackPosition(e)}}/>
    <ButtonContainer>
      <Button onClick={()=>{generateDots()}}>play</Button>
      <Button onClick={()=>{showPlayerDots()}}>show player dots</Button>
      <Button onClick={()=>{clear()}}>clear</Button>
      <Button onClick={()=>{showGameDots()}}>show game dots</Button>
      <Button onClick={()=>{calculate(gameMarks,playerMarks)}}>calculate</Button>
    </ButtonContainer>
  </>
  )
}
export default Canvas


const ButtonContainer=styled.div`
text-align:center;
width:900px;
align-content: space-evenly;
`
const Button=styled.button`
padding: 15px;
background-color: rgb(150,175,175);
border-radius: 5%;
`

  // this was meant to draw a line graph. it connects the dots, which could be useful to you.
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
  // }{/* <button onClick={()=>{showLines()}}>Lines</button> */}