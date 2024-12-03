package marcozagaria.ZagaPass.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "recensioni")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Recensioni {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    private String commento;
    private int voto;
    private LocalDate data;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    private Long filmId;

    private Long serieTVId;

    private Long animeMalId;

    public Recensioni(String commento, int voto, User user) {
        this.commento = commento;
        this.voto = voto;
        this.user = user;
        this.data = LocalDate.now();
    }
}
