package marcozagaria.ZagaPass.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

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
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    @JsonBackReference
//    private User user;
//    @ManyToOne
//    @JoinColumn(name = "film_id", nullable = true)
//    @JsonBackReference
//    private Film film;
//    @ManyToOne
//    @JoinColumn(name = "serieTV_id", nullable = true)
//    @JsonBackReference
//    private SerieTV serieTV;

//    public Recensioni(String commento, int voto, User user) {
//        this.commento = commento;
//        this.voto = voto;
//        this.user = user;
//        this.data = LocalDate.now();
//    }
}
