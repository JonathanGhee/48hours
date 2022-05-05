import React, {  useState } from 'react';
import Canvas from './components/Canvas'
import styled from 'styled-components';

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
    <Container>

      <Canvas width='900' height='700' onClick={(e)=>{positionTracker(e)}} data={coords}/>
      <h1>Accuracy Calculator using Canvas Element</h1>
      <h3>Built with React</h3>

      <Paragraph>The canvas element, or the Canvas API in general, can be used for many reasons. I'm using it for a way to extract and visualize real data, but some other reasons are:
      </Paragraph>
      <Paragraph>
        <li>2D/3D graphics</li>
        <li>Photo manipulation</li>
        <li>real-time Video processing</li>
      </Paragraph>
      <Paragraph>Here's a <a href='https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API' target='_blank'>link</a> to Mozilla's documentation. It provides solid resources that can get you started into this field of Web development.

        The goal of this calculator is to help you learn about the foundational elements of 2D or 3D applications. I encourage you to break it! You will learn how things can('t) work with the Canvas API. All of the goodness is behind the curtains, so if you are interested in using this source code, you can find it in my <a href='https://github.com/JonathanGhee/Accuracy-Calculator' target='_blank'>repo</a> </Paragraph>
        <Paragraph>
        This is a project I created so that I could learn more about the nuances when
        developing inside the canvas. I hope it proves useful to you!
      </Paragraph>

    </Container>
  )
}

export default App;

const Container = styled.div`

`
const Paragraph = styled.p`
width: 55em;
font-family: cursive;
overflow-wrap: break-word;
`