package me.send.service;

import me.send.model.File;
import me.send.model.User;
import me.send.model.repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class FileService {

    private final FileRepository fileRepository;
    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public File uploadFile(MultipartFile multipartFile,
                           Boolean isPrivate,
                           String name,
                           User sender) {

        String randomFolderName = UUID.randomUUID().toString();

        Path folderPath = Paths.get(uploadDir, randomFolderName);
        try {
            Files.createDirectories(folderPath);
        } catch (IOException e) {
            throw new RuntimeException("Impossible de créer le dossier: " + folderPath, e);
        }

        String originalFilename = multipartFile.getOriginalFilename();
        if (originalFilename == null) {
            throw new RuntimeException("Le fichier ne possède pas de nom original (null).");
        }


        String extension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex != -1 && dotIndex < originalFilename.length() - 1) {
            extension = originalFilename.substring(dotIndex + 1);
        }

        String finalFileName = name;
        if (!extension.isEmpty()) {
            finalFileName += "." + extension;
        }

        Path filePath = folderPath.resolve(finalFileName);

        try {
            byte[] fileBytes = multipartFile.getBytes();
            try (FileOutputStream fos = new FileOutputStream(filePath.toFile())) {
                fos.write(fileBytes);
            }
        } catch (IOException e) {
            throw new RuntimeException("Échec de l'enregistrement du fichier: " + filePath, e);
        }

        File file = new File();
        file.setSender(sender);
        file.setName(name);
        file.setIsPrivate(isPrivate);
        file.setUploadedAt(LocalDateTime.now());
        file.setExpiresAt(LocalDateTime.now().plusDays(7));
        file.setFilePath(filePath.toString());

        return fileRepository.save(file);
    }

    public File getFileById(Integer fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File non trouvé avec l'id : " + fileId));
    }

    public File getFileByRepository(String uuid) {
        return fileRepository.findByFilePathLike(uuid);
    }

    public void deleteFile(Integer fileId, User currentUser) {
        File file = getFileById(fileId);

        fileRepository.delete(file);

        Path filePath = Paths.get(file.getFilePath());
        Path parentDir = filePath.getParent();

        try {
            Files.deleteIfExists(filePath);
            Files.deleteIfExists(parentDir);
        } catch (IOException e) {
            throw new RuntimeException("Échec de la suppression du fichier ou du dossier sur le disque", e);
        }
    }

    public File updateFile(Integer fileId, Boolean isPrivate, String newName, User currentUser) {
        File file = getFileById(fileId);

        Path oldPath = Paths.get(file.getFilePath());
        if (!Files.exists(oldPath)) {
            throw new RuntimeException("Le fichier physique n'existe pas : " + file.getFilePath());
        }

        String oldFilename = oldPath.getFileName().toString();
        String extension = "";
        int dotIndex = oldFilename.lastIndexOf('.');
        if (dotIndex != -1 && dotIndex < oldFilename.length() - 1) {
            extension = oldFilename.substring(dotIndex + 1);
        }

        String newFilename = newName;
        if (!extension.isEmpty()) {
            newFilename += "." + extension;
        }

        Path newPath = oldPath.getParent().resolve(newFilename);
        try {
            Files.move(oldPath, newPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Impossible de renommer le fichier sur le disque : " + e.getMessage(), e);
        }

        file.setName(newName);
        file.setIsPrivate(isPrivate);
        file.setFilePath(newPath.toString());

        return fileRepository.save(file);
    }
}

