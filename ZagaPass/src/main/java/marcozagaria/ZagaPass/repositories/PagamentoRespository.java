package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.Pagamento;
import marcozagaria.ZagaPass.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PagamentoRespository extends JpaRepository<Pagamento, UUID> {
    List<Pagamento> findByUser(User user);
}
