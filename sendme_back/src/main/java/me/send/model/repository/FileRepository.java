package me.send.model.repository;

import me.send.model.dto.FileDto;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.*;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.*;

@Repository
public class FileRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public FileRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<FileDto> FILE_ROW_MAPPER = new RowMapper<>() {
        @Override
        public FileDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            FileDto dto = new FileDto();
            dto.setFileId(UUID.fromString(rs.getString("file_id")));
            dto.setTransferId((UUID) rs.getObject("transfer_id"));
            dto.setSenderEmail(rs.getString("sender_email"));
            dto.setReceiverEmail(rs.getString("receiver_email"));
            dto.setMessage(rs.getString("message"));
            dto.setCreatedAt(rs.getObject("created_at", LocalDateTime.class));
            dto.setExpiresAt(rs.getObject("expires_at", LocalDateTime.class));
            dto.setFilePath(rs.getString("file_path"));
            dto.setIsPrivate(rs.getBoolean("private"));
            return dto;
        }
    };

    /**
     * Sauvegarde (INSERT) un enregistrement dans la table file.
     */
    public FileDto save(FileDto fileDto) {
        String sql = """
            INSERT INTO file
            (file_id, transfer_id, sender_email, receiver_email, message, created_at, expires_at, file_path, private)
            VALUES (:fileId, :transferId, :senderEmail, :receiverEmail, :message, :createdAt, :expiresAt, :filePath, :isPrivate)
        """;

        if (fileDto.getFileId() == null) {
            fileDto.setFileId(UUID.randomUUID());
        }
        if (fileDto.getCreatedAt() == null) {
            fileDto.setCreatedAt(LocalDateTime.now());
        }

        Map<String, Object> params = new HashMap<>();
        params.put("fileId", fileDto.getFileId().toString());
        params.put("transferId", fileDto.getTransferId() != null ? fileDto.getTransferId().toString() : null);
        params.put("senderEmail", fileDto.getSenderEmail());
        params.put("receiverEmail", fileDto.getReceiverEmail());
        params.put("message", fileDto.getMessage());
        params.put("createdAt", fileDto.getCreatedAt());
        params.put("expiresAt", fileDto.getExpiresAt());
        params.put("filePath", fileDto.getFilePath());
        params.put("isPrivate", fileDto.getIsPrivate());

        jdbcTemplate.update(sql, params);
        return fileDto;
    }

    /**
     * Récupère un FileDto par son file_id.
     */
    public Optional<FileDto> findById(UUID fileId) {
        String sql = "SELECT * FROM file WHERE file_id = :fileId";
        Map<String, Object> params = Collections.singletonMap("fileId", fileId.toString());

        List<FileDto> results = jdbcTemplate.query(sql, params, FILE_ROW_MAPPER);
        return results.stream().findFirst();
    }

}
