package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.services.FilmService;
import marcozagaria.ZagaPass.services.RecensioniService;
import marcozagaria.ZagaPass.services.SerieTVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recensioni")
public class RecensioniController {
    @Autowired
    RecensioniService recensioniService;
    @Autowired
    FilmService filmService;
    @Autowired
    SerieTVService serieTVService;

//    @PostMapping
//    public ResponseEntity<Recensioni> addRecensione(@RequestBody RecensioniDTO recensioni) {
//        return ResponseEntity.ok(recensioniService.saveRecensione(recensioni));
//    }

//    @GetMapping("/film/{filmId}")
//    public List<Recensioni> getRecensioniByFilm(@PathVariable long filmId) {
//        Film film = filmService.findById(filmId).orElseThrow(() -> new NotFoundException("Film con id " + filmId + " non trovato"));
//        return recensioniService.findByFilmId(film);
//    }
//
//    @GetMapping("/serietv/{serietvId}")
//    public List<Recensioni> getRecensioniBySerieTV(@PathVariable long serieTVId) {
//        SerieTV serieTV = serieTVService.findById(serieTVId).orElseThrow(() -> new NotFoundException("SerieTV con id " + serieTVId + " non trovato"));
//        return recensioniService.findBySerieTVId(serieTV);
//    }
}
