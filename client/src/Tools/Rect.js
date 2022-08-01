import ToolState from "../store/ToolState"
import Tool from "./Tool"

export default class Rect extends Tool {
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
               type: "rect",
               x: this.startX,
               y: this.startY,
               width: this.width,
               height: this.height,
               color: this.ctx.fillColor,
               strokeColor: this.ctx.strokeColor,
               lineWidth: this.ctx.lineWidth
            }
       }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true

        this.ctx.lineWidth = ToolState.getLineWidth();
        this.ctx.fillColor = ToolState.getColor();
        this.ctx.strokeColor = ToolState.getStrokeColor();

        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height);
        }
    }

    draw(x, y, w, h) {
        const img = new Image();
        img.src = this.saved

        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.fillStyle = this.ctx.fillColor
            this.ctx.strokeStyle = this.ctx.strokeColor
            // this.ctx.lineWidth = this.ctx.lineWidth
            this.ctx.rect(x, y, w, h)
            this.ctx.stroke()
            this.ctx.fill()
        }
    }

    static staticDraw(ctx, x, y, w, h, color, strokeColor, lineWidth) {
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.strokeStyle = strokeColor
        // ctx.lineWidth = lineWidth
        ctx.rect(x, y, w, h) 
        ctx.stroke()
        ctx.fill()
    }
}