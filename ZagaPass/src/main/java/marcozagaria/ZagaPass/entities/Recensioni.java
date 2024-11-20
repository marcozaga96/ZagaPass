package marcozagaria.ZagaPass.entities;

import jakarta.persistence.*;
import lombok.*;

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
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "film_id", nullable = true)
    private Film film;
    @ManyToOne
    @JoinColumn(name = "serieTV_id", nullable = true)
    private SerieTV serieTV;

    public Recensioni(String commento, int voto, User user) {
        this.commento = commento;
        this.voto = voto;
        this.user = user;
    }
}
