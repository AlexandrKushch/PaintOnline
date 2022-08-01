package com.khpi.paint.controller;

import nonapi.io.github.classgraph.utils.FileUtils;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/image")
@CrossOrigin
public class ImageController {
    @PostMapping("/{id}")
    public String downloadCanvas(@PathVariable("id") String id, @RequestBody Map<String, String> dataUrl) {
        File imageFile = new File ( "files/"+ id + ".png");
        String url = dataUrl.get("img").replace("data:image/png;base64,", "");
        byte[] data = Base64.getDecoder().decode(url);
        ByteArrayInputStream bis = new ByteArrayInputStream(data);

        try {
            BufferedImage bImage2 = ImageIO.read(bis);
            ImageIO.write(bImage2, "PNG", imageFile);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return "200";
    }

    @GetMapping("/{id}")
    public String uploadCanvas(@PathVariable("id") String id) {
        String dataUrl = "";

        try {
            byte[] data = Files.readAllBytes(Paths.get("files/"+ id + ".png"));
            String url = Base64.getEncoder().encodeToString(data);
            dataUrl = "data:image/png;base64," + url;
        } catch (IOException e) {
//            throw new RuntimeException(e);
        }

        return dataUrl;
    }
}
