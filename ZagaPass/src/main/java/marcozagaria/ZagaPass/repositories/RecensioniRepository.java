package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.Recensioni;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RecensioniRepository extends JpaRepository<Recensioni, UUID> {
//    List<Recensioni> findByFilmId(Film filmId);
//
//    List<Recensioni> findBySerieTVId(SerieTV serieTVId);
}
