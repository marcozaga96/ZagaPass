package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Film;
import marcozagaria.ZagaPass.entities.Valutazione;
import marcozagaria.ZagaPass.entities.Video;
import marcozagaria.ZagaPass.services.FilmService;
import marcozagaria.ZagaPass.services.ValutazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public PagedModel<Film> getFilm(
            @RequestParam(defaultValue = "popularity.desc") String sortBy,
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Film> filmPage = filmService.getFilm(sortBy, year, genre, query, pageable);
        return pagedResourcesAssembler.toModel(filmPage,
                new RepresentationModelAssemblerSupport<Film, Film>(FilmController.class, Film.class) {
                    @Override
                    public Film toModel(Film entity) {
                        return entity;
                    }
                });
    }

    @GetMapping("/{movieId}/videos")
    public List<Video> getMovieTrailers(@PathVariable Long movieId) {
        return filmService.getMovieTrailers(movieId);
    }

    @PostMapping("/{filmId}/rate")
    public void rateMovie(@PathVariable Long filmId, @RequestParam Valutazione valutazione) {
        valutazioneService.rateMovie(filmId, valutazione.getValutazione());
    }

}
