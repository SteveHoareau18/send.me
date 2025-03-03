    package me.send.model.dto;

    import java.time.LocalDateTime;
    import java.util.UUID;

    import jakarta.persistence.FetchType;
    import jakarta.persistence.ManyToOne;
    import lombok.Getter;
    import lombok.Setter;
    import me.send.model.User;

    @Getter
    @Setter
    public class FileDto {
        private Boolean isPrivate;
        private String name;
    }
