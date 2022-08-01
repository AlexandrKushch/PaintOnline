import React from 'react'
import CanvasState from '../store/CanvasState'
import ToolState from '../store/ToolState'
import '../styles/toolbar.css'
import Brush from '../Tools/Brush'
import Circle from '../Tools/Circle'
import Rect from '../Tools/Rect'
import Eraser from '../Tools/Eraser'
import Line from '../Tools/Line'

const Toolbar = () => {

  const changeColor = e => {
    ToolState.setStrokeColor(e.target.value)
    ToolState.setFillColor(e.target.value)
  }

  const download = () => {
    const dataUrl = CanvasState.canvas.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = CanvasState.sessionId + ".jpg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className='toolbar'>
        <button className='toolbar__btn brush' onClick={() => {ToolState.setTool(new Brush(CanvasState.canvas, CanvasState.stomp, CanvasState.sessionId)); console.log(CanvasState)}}></button>
        <button className='toolbar__btn rect' onClick={() => ToolState.setTool(new Rect(CanvasState.canvas, CanvasState.stomp, CanvasState.sessionId))}></button>
        <button className='toolbar__btn circle' onClick={() => ToolState.setTool(new Circle(CanvasState.canvas, CanvasState.stomp, CanvasState.sessionId))}></button>
        <button className='toolbar__btn eraser'  onClick={() => ToolState.setTool(new Eraser(CanvasState.canvas, CanvasState.stomp, CanvasState.sessionId))}></button>
        <button className='toolbar__btn line' onClick={() => ToolState.setTool(new Line(CanvasState.canvas, CanvasState.stomp, CanvasState.sessionId))}></button>
        <input defaultValue={"#000000"} onChange={e => changeColor(e)} style={{marginLeft: 10}} type='color'></input>
        <button className='toolbar__btn undo' onClick={() => CanvasState.sendUndo()}></button>
        <button className='toolbar__btn redo' onClick={() => CanvasState.sendRedo()}></button>
        <button className='toolbar__btn save' onClick={() => download()}></button>
    </div>
  )
}

export default Toolbar