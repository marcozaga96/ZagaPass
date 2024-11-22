package marcozagaria.ZagaPass.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class TokenResponse {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private boolean successo;
    private String richiestaToken;

    public TokenResponse(boolean successo, String richiestaToken) {
        this.successo = successo;
        this.richiestaToken = richiestaToken;
    }
}
