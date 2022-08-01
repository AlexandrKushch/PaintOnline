import axios from "axios";
import {
    makeAutoObservable
} from "mobx";

class CanvasState {
    canvas = null

    undoList = []
    redoList = []
    username = ""

    stomp = null
    sessionId = null

    constructor() {
        makeAutoObservable(this)
    }

    setUsername(username) {
        this.username = username
    }

    setSessionId(id) {
        this.sessionId = id
    }

    setStomp(stomp) {
        this.stomp = stomp
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    pushToUndo(data) {
        this.undoList.push(data)
    }

    pushToRedo(data) {
        this.redoList.push(data)
    }

    sendUndo() {
        this.stomp.send("/app/undoRedo", {}, JSON.stringify({
            id: this.sessionId,
            method: "undo"
        }))
    }

    sendRedo(){
        this.stomp.send("/app/undoRedo", {}, JSON.stringify({
            id: this.sessionId,
            method: "redo"
        }))
    }

    undo() {
        let ctx = this.canvas.getContext('2d')
        
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }

            axios.post("http://localhost:8080/image/" + this.sessionId, {
                img: dataUrl
            })
            .then(response => console.log(response.data))
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        let ctx = this.canvas.getContext('2d')
        
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }

            axios.post("http://localhost:8080/image/" + this.sessionId, {
                img: dataUrl
            })
            .then(response => console.log(response.data))
        }
    }
}

export default new CanvasState()