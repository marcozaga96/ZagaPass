package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Film;
import marcozagaria.ZagaPass.payloads.FilmDTO;
import marcozagaria.ZagaPass.services.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/films")
public class FilmController {
    @Autowired
    private FilmService filmService;

    @GetMapping
    public List<Film> getAllFilms() {
        return filmService.findAll();
    }

    @PostMapping
    public ResponseEntity<Film> addFilm(@RequestBody FilmDTO film) {
        return ResponseEntity.ok(filmService.saveFilm(film));
    }
}
