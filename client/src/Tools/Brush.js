import ToolState from "../store/ToolState"
import Tool from "./Tool"

export default class Brush extends Tool {
    constructor(canvas, stomp, id) {
        super(canvas, stomp, id)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
    //     this.stomp.send("/app/draw", {}, JSON.stringify({
    //         id: this.id,
    //         figure: {
    //            type: "finish"
    //         }
    //    }))
    }

    mouseDownHandler(e) {
        this.ctx.lineWidth = ToolState.getLineWidth();
        this.ctx.strokeColor = ToolState.getStrokeColor();

        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.stomp.send("/app/draw", {}, JSON.stringify({
                 id: this.id,
                 figure: {
                    type: "brush",
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    strokeColor: this.ctx.strokeColor,
                    lineWidth: this.ctx.lineWidth
                 }
            }))
        }
    }

    static draw(ctx, x, y, strokeColor, lineWidth) {
        console.log(ToolState)
        console.log(strokeColor)
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}