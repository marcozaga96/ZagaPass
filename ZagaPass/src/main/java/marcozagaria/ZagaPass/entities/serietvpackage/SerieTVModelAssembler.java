package marcozagaria.ZagaPass.entities.serietvpackage;

import marcozagaria.ZagaPass.controllers.SerieTVController;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class SerieTVModelAssembler extends RepresentationModelAssemblerSupport<SerieTV, SerieTVModel> {
    public SerieTVModelAssembler() {
        super(SerieTVController.class, SerieTVModel.class);
    }

    @Override
    public SerieTVModel toModel(SerieTV serieTV) {
        SerieTVModel model = instantiateModel(serieTV);
        model.add(linkTo(methodOn(SerieTVController.class).getSerieTVById(serieTV.getId())).withSelfRel());
        model.setId(serieTV.getId());
        model.setName(serieTV.getName());
        model.setOverview(serieTV.getOverview());
        model.setFirstAirDate(serieTV.getFirstAirDate());
        model.setPopularity(serieTV.getPopularity());
        model.setVoteAverage(serieTV.getVoteAverage());
        model.setVoteCount(serieTV.getVoteCount());
        model.setOriginalLanguage(serieTV.getOriginalLanguage());
        model.setOriginalName(serieTV.getOriginalName());
        model.setPosterPath(serieTV.getPosterPath());
        model.setBackdropPath(serieTV.getBackdropPath());
        model.setGenreIds(serieTV.getGenreIds());
        return model;
    }
}
