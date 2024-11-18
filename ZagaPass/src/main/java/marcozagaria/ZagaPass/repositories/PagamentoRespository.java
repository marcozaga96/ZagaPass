package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.Pagamento;
import marcozagaria.ZagaPass.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PagamentoRespository extends JpaRepository<Pagamento, UUID> {
    List<Pagamento> findByUser(User user);
}
