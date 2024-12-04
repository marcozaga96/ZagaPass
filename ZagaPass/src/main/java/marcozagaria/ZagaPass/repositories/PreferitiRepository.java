package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.Preferiti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PreferitiRepository extends JpaRepository<Preferiti, Long> {
    List<Preferiti> findByUserId(UUID userId);
}
