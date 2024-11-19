package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FilmRepository extends JpaRepository<Film, Long> {
    Optional<Film> findById(Long id);


}
