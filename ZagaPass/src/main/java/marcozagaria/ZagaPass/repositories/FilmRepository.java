package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FilmRepository extends JpaRepository<Film, UUID> {
    Optional<Film> findByTitolo(String titolo);
}
