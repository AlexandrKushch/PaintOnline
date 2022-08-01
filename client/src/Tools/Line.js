import ToolState from "../store/ToolState"
import Tool from "./Tool"

export default class Line extends Tool {
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

        this.stomp.send("/app/draw", {}, JSON.stringify({
            id: this.id,
            figure: {
               type: "line",
               startX: this.startX,
               startY: this.startY,
               x: this.x,
               y: this.y,
               strokeColor: this.ctx.strokeColor,
               lineWidth: this.ctx.lineWidth
            }
       }))
    }

    mouseDownHandler(e) {
        this.ctx.lineWidth = ToolState.getLineWidth();
        this.ctx.strokeColor = ToolState.getStrokeColor();

        this.mouseDown = true
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;

        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY);
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.x = e.pageX - e.target.offsetLeft
            this.y = e.pageY - e.target.offsetTop
            this.draw(this.x, this.y);
        }
    }

    draw(x, y) {
        const img = new Image();
        img.src = this.saved

        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.strokeStyle = this.ctx.strokeColor
            // this.ctx.lineWidth = this.ctx.lineWidth
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx, startX, startY, x, y, strokeColor, lineWidth) {
        ctx.beginPath()
        ctx.strokeStyle = strokeColor
        // ctx.lineWidth = lineWidth
        ctx.moveTo(startX, startY)
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}