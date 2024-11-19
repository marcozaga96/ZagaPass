package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.Film;
import marcozagaria.ZagaPass.entities.MovieResponse;
import marcozagaria.ZagaPass.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class FilmService {
    private static final String API_URL = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=it-IT&page=%d&sort_by=popularity.desc&api_key=2f3bd3e37f32b5ad4602ce2b7150af6e";
    private static final int MAX_PAGES = 500;
    @Autowired
    private FilmRepository filmRepository;
    @Autowired
    private RestTemplate restTemplate;

    public List<Film> getFilm() {
        List<Film> allFilms = new ArrayList<>();
        int page = 1;
        boolean morePages = true;
        while (morePages && page <= MAX_PAGES) {
            String url = String.format(API_URL, page);
            MovieResponse movieResponse = restTemplate.getForObject(url, MovieResponse.class);
            if (movieResponse != null && movieResponse.getResults() != null) {
                allFilms.addAll(movieResponse.getResults());
                if (page >= movieResponse.getTotalPages() || page >= MAX_PAGES) {
                    morePages = false;
                } else {
                    page++;
                }
            } else {
                morePages = false;
            }
        }
        return allFilms;
    }

    public List<Film> findAll() {
        return filmRepository.findAll();
    }

    public Optional<Film> findById(long id) {
        return filmRepository.findById(id);
    }
}
