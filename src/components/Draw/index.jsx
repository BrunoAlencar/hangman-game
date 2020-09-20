import { createRef, useState, useEffect } from 'react';

import { Square } from './styles';

const Draw = props => {
  const stickMan = createRef()
  const [context, setContext] = useState({})

    useEffect(() => {
      setContext(stickMan.current.getContext('2d'));
      startHangman();
      drawParts()
    }, [ props.life])

    useEffect(()=> {
      console.log(props.isResetedGame)
      if(props.isResetedGame) reset()
    }, [props.isResetedGame])

  const startHangman = () => {
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    draw(10, 150, 150, 150); // bottom line
    draw (10, 5, 10, 600); // vertical line ( bigger one )
    draw (10, 5, 60, 5); // top line
    draw (60, 5, 60, 15); // rope
  }

  const draw = ($pathFromx, $pathFromy, $pathTox, $pathToy) => {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

  const head = () => {
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
  }

  const drawParts = () => {
    if(props.life <= 5)  head();
    if(props.life <= 4)  draw (60, 36, 60, 70);
    if(props.life <= 3)  draw (60, 46, 100, 50);
    if(props.life <= 2)  draw (60, 46, 20, 50);
    if(props.life <= 1)  draw (60, 70, 100, 100);
    if(props.life == 0)  draw (60, 70, 20, 100);
  }
  const reset = () => {
    context.clearRect(0, 0, 400, 400)
    startHangman()
  }

  return (
    <>
      <Square ref={stickMan}></Square>
    </>
    )


}

export default Draw;
