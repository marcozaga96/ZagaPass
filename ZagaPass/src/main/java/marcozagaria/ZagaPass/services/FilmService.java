package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.Film;
import marcozagaria.ZagaPass.entities.MovieResponse;
import marcozagaria.ZagaPass.repositories.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class FilmService {
    private static final String API_URL = "https://api.themoviedb.org/3/discover/movie";
    private static final String SEARCH_API_URL = "https://api.themoviedb.org/3/search/movie";
    private static final String API_KEY = "2f3bd3e37f32b5ad4602ce2b7150af6e";
    private static final int MAX_PAGES = 500;
    @Autowired
    private FilmRepository filmRepository;
    @Autowired
    private RestTemplate restTemplate;

    public Page<Film> getFilm(String sortBy, String year, String genre, String query, Pageable pageable) {
        List<Film> allFilms = new ArrayList<>();
        int page = pageable.getPageNumber() + 1;
        int size = pageable.getPageSize();
        boolean morePages = true;
        while (morePages && page <= MAX_PAGES && allFilms.size() < size * pageable.getPageNumber() + size) {
            UriComponentsBuilder uriBuilder;
            if (query != null && !query.isEmpty()) {
                uriBuilder = UriComponentsBuilder.fromHttpUrl(SEARCH_API_URL).queryParam("api_key", API_KEY).
                        queryParam("language", "it-IT")
                        .queryParam("page", page)
                        .queryParam("query", query);
            } else {
                uriBuilder = UriComponentsBuilder.fromHttpUrl(API_URL).queryParam("api_key", API_KEY)
                        .queryParam("release_date_dates", false)
                        .queryParam("language", "it-IT")
                        .queryParam("page", page)
                        .queryParam("sort_by", sortBy);
                if (year != null && !year.isEmpty()) {
                    uriBuilder.queryParam("primary_release_year", year);
                }
                if (genre != null && !genre.isEmpty()) {
                    uriBuilder.queryParam("with_genres", genre);
                }
            }
            String url = uriBuilder.toUriString();
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
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allFilms.size());
        List<Film> moviesPage = allFilms.subList(start, end);
        return new PageImpl<>(moviesPage, pageable, allFilms.size());
    }

    public Optional<Film> findById(long id) {
        return filmRepository.findById(id);
    }
}
