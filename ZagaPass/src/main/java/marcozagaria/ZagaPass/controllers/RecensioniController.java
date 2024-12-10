package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Recensioni;
import marcozagaria.ZagaPass.payloads.RecensioniDTO;
import marcozagaria.ZagaPass.services.AnimeService;
import marcozagaria.ZagaPass.services.FilmService;
import marcozagaria.ZagaPass.services.RecensioniService;
import marcozagaria.ZagaPass.services.SerieTVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recensioni")
public class RecensioniController {
    @Autowired
    RecensioniService recensioniService;
    @Autowired
    FilmService filmService;
    @Autowired
    SerieTVService serieTVService;
    @Autowired
    AnimeService animeService;

    @PostMapping
    public ResponseEntity<Recensioni> addRecensione(@RequestBody RecensioniDTO recensioni) {
        return ResponseEntity.ok(recensioniService.saveRecensione(recensioni));
    }

    @GetMapping("/{mediaType}/{mediaId}")
    public ResponseEntity<List<RecensioniDTO>> getRecensioniPerMedia(@PathVariable Long mediaId, @PathVariable String mediaType) {
        List<RecensioniDTO> recensioni = recensioniService.findByMediaIdAndType(mediaId, mediaType);
        return ResponseEntity.ok(recensioni);
    }

//    @GetMapping("/film/{filmId}")
//    public List<Recensioni> getRecensioniByFilm(@PathVariable Long filmId) {
//        Film film = filmService.findById(filmId).orElseThrow(() -> new NotFoundException("Film con id " + filmId + " non trovato"));
//        return recensioniService.findByFilmId(film);
//    }
//
//    @GetMapping("/serietv/{serietvId}")
//    public List<Recensioni> getRecensioniBySerieTV(@PathVariable Long serieTVId) {
//        SerieTV serieTV = serieTVService.findById(serieTVId).orElseThrow(() -> new NotFoundException("SerieTV con id " + serieTVId + " non trovato"));
//        return recensioniService.findBySerieTVId(serieTV);
//    }
//
//    @GetMapping("/anime/{animeMalId}")
//    public List<Recensioni> getRecensioniByAnimeMalId(@PathVariable Long animeMalId) {
//        Anime anime = animeService.findByMalId(animeMalId).orElseThrow(() -> new NotFoundException("SerieTV con id " + animeMalId + " non trovato"));
//        return recensioniService.findByAnimeMalId(anime);
//    }
}
