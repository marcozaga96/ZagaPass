package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.animepcckage.Anime;
import marcozagaria.ZagaPass.services.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping
    public List<Anime> getAnimes() {
        return animeService.getAnimes();
    }

    @GetMapping("/search")
    public List<Anime> searchAnime(@RequestParam String q) {
        return animeService.searchAnimeByName(q);
    }
}
