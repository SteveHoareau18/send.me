package me.send.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class File {
    private Integer id;
    @ManyToOne(targetEntity = User.class, optional = false, fetch = FetchType.EAGER)
    private User sender;
    private LocalDateTime uploadedAt;
    private LocalDateTime expiresAt;
    private String filePath; 
    private Boolean isPrivate;

    public File() {
    }
}
