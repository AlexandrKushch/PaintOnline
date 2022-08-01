package com.khpi.paint.domain;

public class Figure {
    private String type;
    private Long x;
    private Long y;
    private Long width;
    private Long height;
    private Long radius;
    private Long startX;
    private Long startY;
    private String color;
    private String strokeColor;
    private Long lineWidth;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getX() {
        return x;
    }

    public void setX(Long x) {
        this.x = x;
    }

    public Long getY() {
        return y;
    }

    public void setY(Long y) {
        this.y = y;
    }

    public Long getWidth() {
        return width;
    }

    public void setWidth(Long width) {
        this.width = width;
    }

    public Long getHeight() {
        return height;
    }

    public void setHeight(Long height) {
        this.height = height;
    }

    public Long getRadius() {
        return radius;
    }

    public void setRadius(Long radius) {
        this.radius = radius;
    }

    public Long getStartX() {
        return startX;
    }

    public void setStartX(Long startX) {
        this.startX = startX;
    }

    public Long getStartY() {
        return startY;
    }

    public void setStartY(Long startY) {
        this.startY = startY;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getStrokeColor() {
        return strokeColor;
    }

    public void setStrokeColor(String strokeColor) {
        this.strokeColor = strokeColor;
    }

    public Long getLineWidth() {
        return lineWidth;
    }

    public void setLineWidth(Long lineWidth) {
        this.lineWidth = lineWidth;
    }
}
