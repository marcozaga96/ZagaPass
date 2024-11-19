package marcozagaria.ZagaPass.repositories;


import marcozagaria.ZagaPass.entities.SerieTV;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SerieTVRepository extends JpaRepository<SerieTV, Long> {
    Optional<SerieTV> findById(Long id);
}
