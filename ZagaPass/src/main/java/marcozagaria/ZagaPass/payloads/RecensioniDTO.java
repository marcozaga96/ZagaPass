package marcozagaria.ZagaPass.payloads;

import java.util.UUID;

public record RecensioniDTO(String commento, int voto, UUID userId, Long filmID) {
}
