package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Video;
import marcozagaria.ZagaPass.entities.serietvpackage.SerieTV;
import marcozagaria.ZagaPass.entities.serietvpackage.SerieTVDetailResponse;
import marcozagaria.ZagaPass.entities.serietvpackage.SerieTVModel;
import marcozagaria.ZagaPass.entities.serietvpackage.SerieTVModelAssembler;
import marcozagaria.ZagaPass.services.SerieTVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/serietv")
public class SerieTVController {
    @Autowired
    private SerieTVService serieTVService;
    @Autowired
    private PagedResourcesAssembler<SerieTV> pagedResourcesAssembler;

    @GetMapping
    public PagedModel<SerieTVModel> getSerieTV(@RequestParam(defaultValue = "vote_count.desc") String sortBy,
                                               @RequestParam(required = false) String year,
                                               @RequestParam(required = false) String genre,
                                               @RequestParam(required = false) String query,
                                               @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SerieTV> serieTVPage = serieTVService.getSerieTv(sortBy, year, genre, query, pageable);
        return pagedResourcesAssembler.toModel(serieTVPage, new SerieTVModelAssembler());
    }

    @GetMapping("/playing-now")
    public PagedModel<SerieTVModel> getNowPlayingSerieTV(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SerieTV> serieTVPage = serieTVService.getNowPlayingSerieTV(pageable);
        return pagedResourcesAssembler.toModel(serieTVPage, new SerieTVModelAssembler());
    }

    @GetMapping("/top")
    public PagedModel<SerieTVModel> getTopSerieTV(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<SerieTV> serieTVPage = serieTVService.getTopSerieTV(pageable);
        return pagedResourcesAssembler.toModel(serieTVPage, new SerieTVModelAssembler());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SerieTVModel> getSerieTVById(@PathVariable Long id) {
        Optional<SerieTV> serieTV = serieTVService.findById(id);
        if (serieTV.isPresent()) {
            SerieTVModelAssembler assembler = new SerieTVModelAssembler();
            SerieTVModel model = assembler.toModel(serieTV.get());
            String trailerUrl = serieTVService.getTrailerUrl(id);
            model.setTrailerUrl(trailerUrl);
            return ResponseEntity.ok(model);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/full")
    public ResponseEntity<SerieTVDetailResponse> getFilmDetails(@PathVariable Long id) {
        Optional<SerieTVDetailResponse> filmDetails = serieTVService.getSerieTVDetails(id);
        return filmDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{tvShowId}/videos")
    public List<Video> getSerieTVVideos(@PathVariable Long tvShowId) {
        return serieTVService.getSerieTVVideos(tvShowId);
    }
}
