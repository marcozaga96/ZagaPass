package marcozagaria.ZagaPass.controllers;

import marcozagaria.ZagaPass.entities.Film;
import marcozagaria.ZagaPass.services.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/films")
public class FilmController {
    @Autowired
    private FilmService filmService;

    @GetMapping
    public List<Film> getFilm() {
        return filmService.getFilm();
    }

}
