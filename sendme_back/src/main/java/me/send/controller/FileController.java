package me.send.controller;

import me.send.model.dto.FileDto;
import me.send.service.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    // === 1) Uploader un fichier ===
    @PostMapping("/upload")
    public ResponseEntity<FileDto> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("senderEmail") String senderEmail,
            @RequestParam("receiverEmail") String receiverEmail,
            @RequestParam(value = "message", required = false) String message,
            @RequestParam(value = "expiresAt", required = false) String expiresAt,
            @RequestParam(value = "isPrivate", defaultValue = "false") Boolean isPrivate
    ) throws Exception {
        // Convertir expiresAt si fourni (format ISO 8601 par ex.)
        LocalDateTime expiration = (expiresAt != null) ? LocalDateTime.parse(expiresAt) : null;

        FileDto fileDto = fileService.uploadFile(file, senderEmail, receiverEmail, message, expiration, isPrivate);
        return ResponseEntity.ok(fileDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FileDto> getFileById(@PathVariable("id") UUID fileId) {
        Optional<FileDto> fileOpt = fileService.getFileById(fileId);
        return fileOpt.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @GetMapping("/{id}/download")
    public ResponseEntity<?> downloadFile(@PathVariable("id") UUID fileId) {
        Optional<FileDto> fileOpt = fileService.getFileById(fileId);
        if (fileOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        FileDto fileDto = fileOpt.get();

        File file = new File(fileDto.getFilePath());
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("File path: " + fileDto.getFilePath());
    }
}
