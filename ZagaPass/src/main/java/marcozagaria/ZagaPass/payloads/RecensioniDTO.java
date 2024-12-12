package marcozagaria.ZagaPass.payloads;

import java.time.LocalDate;

public record RecensioniDTO(Long mediaId, String mediaType, String commento, int voto, String autore, LocalDate data) {
}
