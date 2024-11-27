package marcozagaria.ZagaPass.entities.animepcckage;

import marcozagaria.ZagaPass.controllers.AnimeController;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class AnimeModelAssembler extends RepresentationModelAssemblerSupport<Anime, AnimeModel> {
    public AnimeModelAssembler() {
        super(AnimeController.class, AnimeModel.class);
    }

    @Override
    public AnimeModel toModel(Anime anime) {
        AnimeModel model = instantiateModel(anime);
        model.add(linkTo(methodOn(AnimeController.class).getAnimeById(anime.getMalId())).withSelfRel());
        model.setMalId(anime.getMalId());
        model.setUrl(anime.getUrl());
        model.setTitle(anime.getTitle());
        model.setTitleEnglish(anime.getTitleEnglish());
        model.setTitleJapanese(anime.getTitleJapanese());
        model.setSynopsis(anime.getSynopsis());
        model.setBackground(anime.getBackground());
        model.setAiring(anime.isAiring());
        model.setStatus(anime.getStatus());
        model.setDuration(anime.getDuration());
        model.setRating(anime.getRating());
        model.setScore(anime.getScore());
        model.setScoredBy(anime.getScoredBy());
        model.setRank(anime.getRank());
        model.setPopularity(anime.getPopularity());
        model.setMembers(anime.getMembers());
        model.setFavorites(anime.getFavorites());
        model.setImageData(anime.getImageData());
        model.setTrailer(anime.getTrailer());
        return model;
    }
}
