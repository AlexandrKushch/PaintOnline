package com.khpi.paint.service;

import com.khpi.paint.domain.ClientMessage;
import com.khpi.paint.domain.DrawObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class WsService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WsService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void connectionHandler(@Payload ClientMessage message) {
        messagingTemplate.convertAndSendToUser(message.getId(), "/room/messages", message);
    }

    public void drawHandler(DrawObject drawObject) {
        messagingTemplate.convertAndSendToUser(drawObject.getId(), "/room/draw", drawObject);
    }

//    public void undoRedoHandler(String id, String method) {
    public void undoRedoHandler(Map<String, String> idAndMethod) {
        messagingTemplate.convertAndSendToUser(idAndMethod.get("id"), "/room/undoRedo", idAndMethod);
    }
}
