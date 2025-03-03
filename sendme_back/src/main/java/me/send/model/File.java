package me.send.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class File {
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne(targetEntity = User.class, optional = false, fetch = FetchType.EAGER)
    private User sender;

    private LocalDateTime uploadedAt;
    private LocalDateTime expiresAt;
    private String filePath;
    private Boolean isPrivate;

    private String name;

    public File() {
    }
}
