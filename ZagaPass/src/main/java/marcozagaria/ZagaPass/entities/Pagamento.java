package marcozagaria.ZagaPass.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "pagamenti")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Pagamento {
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    private LocalDate DataInizioAbbonamento;
    private LocalDate DataFineAbbonamento;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Enumerated(EnumType.STRING)
    private Abbonamento abbonamento;

    public Pagamento(LocalDate dataInizioAbbonamento, LocalDate dataFineAbbonamento, User user, Abbonamento abbonamento) {
        DataInizioAbbonamento = dataInizioAbbonamento;
        DataFineAbbonamento = dataFineAbbonamento;
        this.user = user;
        this.abbonamento = abbonamento;
    }
}
