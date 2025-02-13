package me.send.service;

import me.send.model.dto.FileDto;
import me.send.model.repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileService {

    // Dossier local où seront stockés les fichiers
    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    private final FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FileDto uploadFile(MultipartFile file, String senderEmail, String receiverEmail, String message, LocalDateTime expiresAt, Boolean isPrivate) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID() + "_" + originalFilename;

        Path filePath = Paths.get(uploadDir, uniqueFilename);
        Files.createDirectories(filePath.getParent());

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        FileDto fileDto = new FileDto();
        fileDto.setSenderEmail(senderEmail);
        fileDto.setReceiverEmail(receiverEmail);
        fileDto.setMessage(message);
        fileDto.setExpiresAt(expiresAt);
        fileDto.setFilePath(filePath.toString());
        fileDto.setIsPrivate(isPrivate);

        return fileRepository.save(fileDto);
    }

    public Optional<FileDto> getFileById(UUID fileId) {
        return fileRepository.findById(fileId);
    }

}
