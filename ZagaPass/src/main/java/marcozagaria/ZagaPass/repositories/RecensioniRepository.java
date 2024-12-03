package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.Recensioni;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RecensioniRepository extends JpaRepository<Recensioni, UUID> {
    List<Recensioni> findByFilmId(Long filmId);

    List<Recensioni> findByAnimeMalId(Long animeMalId);

    List<Recensioni> findBySerieTVId(Long serieTVId);
}
