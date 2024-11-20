package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.Film;
import marcozagaria.ZagaPass.entities.Recensioni;
import marcozagaria.ZagaPass.entities.SerieTV;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RecensioniRepository extends JpaRepository<Recensioni, UUID> {
    List<Recensioni> findByFilmId(Film filmId);

    List<Recensioni> findBySerieTVId(SerieTV serieTVId);
}
