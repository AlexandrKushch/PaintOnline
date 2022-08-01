package com.khpi.paint.controller;

import com.khpi.paint.domain.ClientMessage;
import com.khpi.paint.domain.DrawObject;
import com.khpi.paint.service.WsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin
public class MessageController {
    private final WsService service;

    @Autowired
    public MessageController(WsService service) {
        this.service = service;
    }

    @MessageMapping("/connection")
    public ClientMessage connection(@Payload ClientMessage message) {
        service.connectionHandler(message);
        return message;
    }

    @MessageMapping("/draw")
    public DrawObject draw(@Payload DrawObject drawObject) {
        service.drawHandler(drawObject);
        return drawObject;
    }

    @MessageMapping("/undoRedo")
    public String undoRedo(@Payload Map<String, String> idAndMethod) {
//        service.undoRedoHandler(idAndMethod.get("id"), idAndMethod.get("method"));
        service.undoRedoHandler(idAndMethod);
        return idAndMethod.get("method");
    }
}
