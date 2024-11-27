package marcozagaria.ZagaPass.entities.filmpackage;

import marcozagaria.ZagaPass.controllers.FilmController;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


@Component
public class FilmModelAssembler extends RepresentationModelAssemblerSupport<Film, FilmModel> {
    public FilmModelAssembler() {
        super(FilmController.class, FilmModel.class);
    }

    @Override
    public FilmModel toModel(Film film) {
        FilmModel model = instantiateModel(film);
        model.add(linkTo(methodOn(FilmController.class).getFilmById(film.getId())).withSelfRel());
        model.setId(film.getId());
        model.setTitle(film.getTitle());
        model.setOverview(film.getOverview());
        model.setReleaseDate(film.getReleaseDate());
        model.setPopularity(film.getPopularity());
        model.setVoteAverage(film.getVoteAverage());
        model.setVoteCount(film.getVoteCount());
        model.setOriginalLanguage(film.getOriginalLanguage());
        model.setOriginalTitle(film.getOriginalTitle());
        model.setPosterPath(film.getPosterPath());
        model.setBackdropPath(film.getBackdropPath());
        model.setAdult(film.isAdult());
        model.setVideo(film.isVideo());
        model.setGenreIds(film.getGenreIds());
        return model;
    }
}
