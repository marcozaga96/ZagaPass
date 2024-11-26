package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.animepcckage.Anime;
import marcozagaria.ZagaPass.services.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/anime")
public class AnimeController {
    @Autowired
    private AnimeService animeService;
    @Autowired
    private PagedResourcesAssembler<Anime> pagedResourcesAssembler;

    @GetMapping
    public PagedModel<Anime> getAnimes(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<Anime> animes = animeService.getAnimes(page + 1, size);
        Page<Anime> animePage = new PageImpl<>(animes, pageable, animes.size());
        return pagedResourcesAssembler.toModel(animePage, new RepresentationModelAssemblerSupport<Anime, Anime>(AnimeController.class, Anime.class) {
            @Override
            public Anime toModel(Anime entity) {
                return entity;
            }
        });
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
