package marcozagaria.ZagaPass.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Table(name = "preferiti")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Preferiti {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    private Long mediaId;
    private String mediaType;
    private LocalDate data;

    public Preferiti(User user, Long mediaId, String mediaType) {
        this.user = user;
        this.mediaId = mediaId;
        this.mediaType = mediaType;
        this.data = LocalDate.now();
    }
}
