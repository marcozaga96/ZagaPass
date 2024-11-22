package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.SerieTV;
import marcozagaria.ZagaPass.entities.Video;
import marcozagaria.ZagaPass.services.SerieTVService;
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
@RequestMapping("api/serietv")
public class SerieTVController {
    @Autowired
    private SerieTVService serieTVService;
    @Autowired
    private PagedResourcesAssembler<SerieTV> pagedResourcesAssembler;

    @GetMapping
    public PagedModel<SerieTV> getSerieTv(
            @RequestParam(defaultValue = "popularity.desc") String sortBy,
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SerieTV> serieTVPage = serieTVService.getSerieTv(sortBy, year, genre, query, pageable);
        return pagedResourcesAssembler.toModel(serieTVPage,
                new RepresentationModelAssemblerSupport<SerieTV, SerieTV>(SerieTVController.class, SerieTV.class) {
                    @Override
                    public SerieTV toModel(SerieTV entity) {
                        return entity;
                    }
                });
    }

    @GetMapping("/{tvShowId}/videos")
    public List<Video> getSerieTVVideos(@PathVariable Long tvShowId) {
        return serieTVService.getSerieTVVideos(tvShowId);
    }
}
