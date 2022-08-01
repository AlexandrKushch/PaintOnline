import { makeAutoObservable } from "mobx";

class ToolState {
    tool = null
    lineWidth = 1
    color = "#000000"
    strokeColor = "#000000"

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
    }

    setFillColor(color) {
        this.color = color
        this.tool.fillColor = color;
    }

    setStrokeColor(color) {
        this.strokeColor = color
        this.tool.strokeColor = color
    }

    setLineWidth(width) {
        this.lineWidth = width
        this.tool.lineWidth = width
    }

    getLineWidth() {
        return this.lineWidth;
    }

    getColor() {
        return this.color
    }

    getStrokeColor() {
        return this.strokeColor
    }
}

export default new ToolState()