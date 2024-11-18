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
    private User user;
    @ManyToOne
    private Film film;

    public Recensioni(String commento, int voto, User user, Film film) {
        this.commento = commento;
        this.voto = voto;
        this.user = user;
        this.film = film;
    }
}
