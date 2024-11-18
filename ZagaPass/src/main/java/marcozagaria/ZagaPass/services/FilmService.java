package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.Film;
import marcozagaria.ZagaPass.payloads.FilmDTO;
import marcozagaria.ZagaPass.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class FilmService {
    @Autowired
    private FilmRepository filmRepository;

    public Film saveFilm(@RequestBody FilmDTO body) {
        Film newFilm = new Film(body.titolo(),
                body.genere(),
                body.trama());
        Film savedFilm = this.filmRepository.save(newFilm);
        return filmRepository.save(savedFilm);
    }

    public List<Film> findAll() {
        return filmRepository.findAll();
    }

    public Optional<Film> findById(UUID id) {
        return filmRepository.findById(id);
    }
}
