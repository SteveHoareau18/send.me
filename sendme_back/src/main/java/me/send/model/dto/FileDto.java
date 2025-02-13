package me.send.model.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;

public class FileDto {
    private Integer senderId;
    private Boolean isPrivate;
}