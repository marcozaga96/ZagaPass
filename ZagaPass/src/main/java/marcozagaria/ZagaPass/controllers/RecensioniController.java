package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Film;
import marcozagaria.ZagaPass.entities.Recensioni;
import marcozagaria.ZagaPass.exceptions.NotFoundException;
import marcozagaria.ZagaPass.payloads.RecensioniDTO;
import marcozagaria.ZagaPass.services.FilmService;
import marcozagaria.ZagaPass.services.RecensioniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/recensioni")
public class RecensioniController {
    @Autowired
    RecensioniService recensioniService;
    @Autowired
    FilmService filmService;

    @PostMapping
    public ResponseEntity<Recensioni> addRecensione(@RequestBody RecensioniDTO recensioni) {
        return ResponseEntity.ok(recensioniService.saveRecensione(recensioni));
    }

    @GetMapping("/film/{filmId}")
    public List<Recensioni> getReviewsByFilm(@PathVariable UUID filmId) {
        Film film = filmService.findById(filmId).orElseThrow(() -> new NotFoundException("Film not found with id " + filmId));
        return recensioniService.findByFilm(film);
    }
}
