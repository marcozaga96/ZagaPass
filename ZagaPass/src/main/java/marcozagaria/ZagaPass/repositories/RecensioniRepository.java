package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.Recensioni;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RecensioniRepository extends JpaRepository<Recensioni, UUID> {
//    List<Recensioni> findByFilmId(Film filmId);
//
//    List<Recensioni> findBySerieTVId(SerieTV serieTVId);
}
