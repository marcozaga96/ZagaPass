package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.animepcckage.Anime;
import marcozagaria.ZagaPass.entities.animepcckage.AnimeFullResponse;
import marcozagaria.ZagaPass.entities.animepcckage.AnimeModel;
import marcozagaria.ZagaPass.entities.animepcckage.AnimeModelAssembler;
import marcozagaria.ZagaPass.services.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/anime")
public class AnimeController {
    @Autowired
    private AnimeService animeService;
    @Autowired
    private PagedResourcesAssembler<Anime> pagedResourcesAssembler;

    @GetMapping
    public PagedModel<AnimeModel> getAnimes(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Anime> animePage = animeService.getAnimes(query, pageable);
        return pagedResourcesAssembler.toModel(animePage, new AnimeModelAssembler());
    }

    @GetMapping("/season-now")
    public PagedModel<AnimeModel> getCurrentSeasonAnimes(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Anime> animePage = animeService.getCurrentSeasonAnimes(pageable);
        return pagedResourcesAssembler.toModel(animePage, new AnimeModelAssembler());
    }

    @GetMapping("/top")
    public PagedModel<AnimeModel> getTopAnimes(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Anime> animePage = animeService.getTopAnimes(pageable);
        return pagedResourcesAssembler.toModel(animePage, new AnimeModelAssembler());
    }


    @GetMapping("/{mal_id}")
    public ResponseEntity<AnimeModel> getAnimeById(@PathVariable("mal_id") long malId) {
        Optional<Anime> anime = animeService.findByMalId(malId);
        if (anime.isPresent()) {
            AnimeModelAssembler assembler = new AnimeModelAssembler();
            AnimeModel model = assembler.toModel(anime.get());
            return ResponseEntity.ok(model);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{mal_id}/full")
    public ResponseEntity<AnimeFullResponse.AnimeData> getAnimeDetails(@PathVariable Long mal_id) {
        Optional<AnimeFullResponse.AnimeData> animeDetails = animeService.getAnimeDetails(mal_id);
        return animeDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @GetMapping("/search")
    public PagedModel<Anime> searchAnime(@RequestParam String q, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Anime> animes = animeService.searchAnimeByName(q, page + 1, size);
        Page<Anime> animePage = new PageImpl<>(animes, pageable, animes.size());
        return pagedResourcesAssembler.toModel(animePage, new RepresentationModelAssemblerSupport<Anime, Anime>(AnimeController.class, Anime.class) {
            @Override
            public Anime toModel(Anime entity) {
                return entity;
            }
        });
    }
}
