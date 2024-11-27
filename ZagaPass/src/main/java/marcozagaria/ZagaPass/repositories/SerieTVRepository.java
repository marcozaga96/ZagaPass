package marcozagaria.ZagaPass.repositories;


import marcozagaria.ZagaPass.entities.serietvpackage.SerieTV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SerieTVRepository extends JpaRepository<SerieTV, Long> {
    Optional<SerieTV> findById(Long id);
}
