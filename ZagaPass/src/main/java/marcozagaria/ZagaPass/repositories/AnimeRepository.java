package marcozagaria.ZagaPass.repositories;

import marcozagaria.ZagaPass.entities.animepcckage.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnimeRepository extends JpaRepository<Anime, Long> {
    Optional<Anime> findByMalId(Long malId);
}
