package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Valutazione;
import marcozagaria.ZagaPass.entities.Video;
import marcozagaria.ZagaPass.entities.filmpackage.Film;
import marcozagaria.ZagaPass.entities.filmpackage.FilmModel;
import marcozagaria.ZagaPass.entities.filmpackage.FilmModelAssembler;
import marcozagaria.ZagaPass.services.FilmService;
import marcozagaria.ZagaPass.services.ValutazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/films")
public class FilmController {
    @Autowired
    ValutazioneService valutazioneService;
    @Autowired
    private FilmService filmService;
    @Autowired
    private PagedResourcesAssembler<Film> pagedResourcesAssembler;

    @GetMapping
    public PagedModel<FilmModel> getFilm(@RequestParam(defaultValue = "popularity.desc") String sortBy,
                                         @RequestParam(required = false) String year,
                                         @RequestParam(required = false) String genre,
                                         @RequestParam(required = false) String query,
                                         @RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Film> filmPage = filmService.getFilm(sortBy, year, genre, query, pageable);
        return pagedResourcesAssembler.toModel(filmPage, new FilmModelAssembler());
    }

    @GetMapping("/playing-now")
    public PagedModel<FilmModel> getNowPlayingFilms(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Film> filmPage = filmService.getNowPlayingFilms(pageable);
        return pagedResourcesAssembler.toModel(filmPage, new FilmModelAssembler());
    }

    @GetMapping("/top")
    public PagedModel<FilmModel> getTopFilms(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Film> filmPage = filmService.getTopFilms(pageable);
        return pagedResourcesAssembler.toModel(filmPage, new FilmModelAssembler());
    }

    @GetMapping("/{movieId}/videos")
    public List<Video> getMovieTrailers(@PathVariable Long movieId) {
        return filmService.getMovieTrailers(movieId);
    }

    @PostMapping("/{movieId}/rate")
    public void rateMovie(@PathVariable Long movieId, @RequestParam Valutazione value) {
        valutazioneService.rateMovie(movieId, value.getValue());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FilmModel> getFilmById(@PathVariable Long id) {
        Optional<Film> film = filmService.findById(id);
        if (film.isPresent()) {
            FilmModelAssembler assembler = new FilmModelAssembler();
            FilmModel model = assembler.toModel(film.get());
            String trailerUrl = filmService.getTrailerUrl(id);
            model.setTrailerUrl(trailerUrl);
            return ResponseEntity.ok(model);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
