    package me.send.controller;

    import me.send.model.File;
    import me.send.model.User;
    import me.send.service.FileService;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.core.Authentication;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.multipart.MultipartFile;

    import java.io.IOException;
    import java.net.MalformedURLException;
    import java.nio.file.Files;
    import java.nio.file.Path;
    import java.nio.file.Paths;

    @RestController
    @RequestMapping("/files")
    public class FileController {

        private final FileService fileService;

        public FileController(FileService fileService) {
            this.fileService = fileService;
        }

        @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<File> uploadFile(
                @RequestPart("file") MultipartFile file,
                @RequestParam("isPrivate") Boolean isPrivate,
                @RequestParam("name") String name
        ) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();

            File savedFile = fileService.uploadFile(file, isPrivate, name, currentUser);
            return ResponseEntity.ok(savedFile);
        }
        @GetMapping("/{id}")
        public ResponseEntity<File> getFile(@PathVariable("id") Integer fileId) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();

            File file = fileService.getFileById(fileId);

            return ResponseEntity.ok(file);
        }
        @GetMapping("/{id}/download")
        public ResponseEntity<org.springframework.core.io.Resource> downloadFile(@PathVariable("id") Integer fileId) throws IOException, IOException {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();

            File fileEntity = fileService.getFileById(fileId);
            Path path = Paths.get(fileEntity.getFilePath());


            if (!Files.exists(path)) {
                throw new RuntimeException("Fichier introuvable sur le disque : " + fileEntity.getFilePath());
            }

            org.springframework.core.io.Resource resource = new org.springframework.core.io.UrlResource(path.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new RuntimeException("Impossible de lire le fichier : " + fileEntity.getFilePath());
            }

            String contentType = Files.probeContentType(path);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                    .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + fileEntity.getName() + "\"")
                    .body(resource);
        }
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteFile(@PathVariable("id") Integer fileId) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();

            fileService.deleteFile(fileId, currentUser);
            return ResponseEntity.noContent().build();
        }
        @PatchMapping("/{id}")
        public ResponseEntity<File> updateFile(
                @PathVariable("id") Integer fileId,
                @RequestParam("isPrivate") Boolean isPrivate,
                @RequestParam("name") String newName
        ) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();

            File updatedFile = fileService.updateFile(fileId, isPrivate, newName, currentUser);
            return ResponseEntity.ok(updatedFile);
        }

    }
