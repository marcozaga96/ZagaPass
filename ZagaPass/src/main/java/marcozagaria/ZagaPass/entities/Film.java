package marcozagaria.ZagaPass.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "film")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Film {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    private String titolo;
    private String genere;
    private String trama;

    public Film(String titolo, String genere, String trama) {
        this.titolo = titolo;
        this.genere = genere;
        this.trama = trama;
    }
}
