import Brush from "./Brush"

export default class Eraser extends Brush {
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.stomp.send("/app/draw", {}, JSON.stringify({
                 id: this.id,
                 figure: {
                    type: "eraser",
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    strokeColor: "white",
                    lineWidth: this.ctx.lineWidth
                 }
            }))
        }
    }

    static draw(ctx, x, y, strokeColor, lineWidth) {
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}