package com.khpi.paint.domain;

public class DrawObject {
    private String id;
    private Figure figure;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Figure getFigure() {
        return figure;
    }

    public void setFigure(Figure figure) {
        this.figure = figure;
    }
}
