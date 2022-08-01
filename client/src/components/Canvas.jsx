import { Button, Modal } from 'react-bootstrap';
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import CanvasState from '../store/CanvasState';
import ToolState from '../store/ToolState';

import '../styles/canvas.css'
import Brush from '../Tools/Brush';
import Eraser from '../Tools/Eraser'
import { useParams } from 'react-router-dom';
import Rect from '../Tools/Rect';
import Circle from '../Tools/Circle';
import Line from '../Tools/Line';
import axios from 'axios';

var stompClient = null

const Canvas = observer(() => {
  const canvasRef = useRef()
  const usernameRef = useRef()

  const params = useParams()

  const [modal, setModal] = useState(true)

  useEffect(() => {
    CanvasState.setCanvas(canvasRef.current)

    axios.get("http://localhost:8080/image/" + params.id)
      .then(response => {
        const img = new Image()
        img.src = response.data
        img.onload = () => {
          let ctx = canvasRef.current.getContext('2d')
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      })
  }, [])

  useEffect(() => {
    if (CanvasState.username) {
      var socket = new SockJS('http://localhost:8080/ws')
      stompClient = Stomp.over(socket)

      stompClient.connect({}, onConnected)

      CanvasState.setSessionId(params.id)
      CanvasState.setStomp(stompClient)

      console.log(CanvasState)

      ToolState.setTool(new Brush(canvasRef.current, stompClient, params.id))
    }
  }, [CanvasState.username])

  const mouseUpHandler = () => {
    axios.post("http://localhost:8080/image/" + params.id, { img: canvasRef.current.toDataURL() })
      .then(response => console.log(response.data))
  }

  const mouseDownHandler = () => {
    // CanvasState.pushToUndo(canvasRef.current.toDataURL());
    stompClient.send("/app/draw", {}, JSON.stringify({
      id: params.id,
      figure: {
        type: "finish"
      }
    }))
  }

  const connectionHandler = () => {
    CanvasState.setUsername(usernameRef.current.value)
    setModal(false)
  }

  const onConnected = () => {
    console.log("Connected")
    stompClient.subscribe("/user/" + params.id + "/room/messages", onClientMessagesRecieved)
    stompClient.subscribe("/user/" + params.id + "/room/draw", onDrawMessage)
    stompClient.subscribe("/user/" + params.id + "/room/undoRedo", onUndoRedo)

    stompClient.send("/app/connection", {}, JSON.stringify({
      id: params.id,
      username: CanvasState.username
    }))
  }

  const onClientMessagesRecieved = (payload) => {
    let message = JSON.parse(payload.body)
    console.log(message)
  }

  const onDrawMessage = (payload) => {
    let drawObject = JSON.parse(payload.body)
    drawHandler(drawObject)
  }

  const onUndoRedo = (payload) => {
    const method = JSON.parse(payload.body).method;
    console.log("onUndoRedo: " + method)

    switch (method) {
      case "undo":
        CanvasState.undo();
        break;
      case "redo":
        CanvasState.redo();
        break;
    }
  }

  const drawHandler = (drawObject) => {
    const figure = drawObject.figure
    const ctx = canvasRef.current.getContext('2d')

    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.strokeColor, figure.lineWidth)
        break
      case "rect":
        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color, figure.strokeColor, figure.lineWidth)
        ctx.beginPath()
        break
      case "circle":
        Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.color, figure.strokeColor, figure.lineWidth)
        ctx.beginPath()
        break
      case "eraser":
        Eraser.draw(ctx, figure.x, figure.y, "white", figure.lineWidth)
        break
      case "line":
        Line.staticDraw(ctx, figure.startX, figure.startY, figure.x, figure.y, figure.strokeColor, figure.lineWidth)
        ctx.beginPath()
        break
      case "finish":
        ctx.beginPath()
        CanvasState.pushToUndo(canvasRef.current.toDataURL());
        break
    }
  }

  return (
    <div className='canvas'>
      <Modal show={modal} onHide={() => { }}>
        <Modal.Header>
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text' ref={usernameRef}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>

      <canvas onMouseDown={() => mouseDownHandler()} onMouseUp={() => mouseUpHandler()} ref={canvasRef} width={1024} height={600}></canvas>
    </div>
  )
});

export default Canvas