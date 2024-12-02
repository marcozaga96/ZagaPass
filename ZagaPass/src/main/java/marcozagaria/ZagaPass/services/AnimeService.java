package marcozagaria.ZagaPass.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import marcozagaria.ZagaPass.entities.animepcckage.Anime;
import marcozagaria.ZagaPass.entities.animepcckage.AnimeResponse;
import marcozagaria.ZagaPass.repositories.AnimeRepository;
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
public class AnimeService {
    private static final String API_URL = "https://api.jikan.moe/v4/anime";
    private static final String TOP_URL = "https://api.jikan.moe/v4/top/anime";
    private static final String SEASON_NOW_URL = "https://api.jikan.moe/v4/seasons/now";
    private static final int MAX_PAGES = 500;
    @Autowired
    AnimeRepository animeRepository;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    public Page<Anime> getAnimes(Pageable pageable) {
        List<Anime> allAnimes = new ArrayList<>();
        int page = pageable.getPageNumber() + 1;
        int size = pageable.getPageSize();
        boolean morePages = true;
        while (morePages && page <= MAX_PAGES && allAnimes.size() < size * pageable.getPageNumber() + size) {
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(API_URL)
                    .queryParam("page", page)
                    .queryParam("limit", size);
//            if (query != null && !query.isEmpty()) {
//                uriBuilder.queryParam("query", query);
//            }
//            if (year != null && !year.isEmpty()) {
//                uriBuilder.queryParam("year", year);
//            }
//            if (genre != null && !genre.isEmpty()) {
//                uriBuilder.queryParam("genre", genre);
//            }
            String url = uriBuilder.toUriString();
            System.out.println("Fetching page " + page + " with URL: " + url);
            AnimeResponse response = restTemplate.getForObject(url, AnimeResponse.class);
            if (response != null && response.getData() != null) {
                System.out.println("Fetched " + response.getData().size() + " animes");
                allAnimes.addAll(response.getData());
                if (page >= response.getTotalPages() || page >= MAX_PAGES) {
                    morePages = false;
                } else {
                    page++;
                }
            } else {
                System.out.println("No results or error fetching data for page " + page);
                morePages = false;
            }
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allAnimes.size());
        System.out.println("Creating sublist from " + start + " to " + end);
        if (start >= allAnimes.size()) {
            start = allAnimes.size() - pageable.getPageSize();
            if (start < 0) {
                start = 0;
            }
            end = allAnimes.size();
        }
        List<Anime> animesPage = allAnimes.subList(start, end);
        return new PageImpl<>(animesPage, pageable, allAnimes.size());
    }

    public Page<Anime> getCurrentSeasonAnimes(Pageable pageable) {
        List<Anime> currentSeasonAnimes = new ArrayList<>();
        int page = pageable.getPageNumber() + 1;
        int size = pageable.getPageSize();
        boolean morePages = true;
        while (morePages && page <= MAX_PAGES && currentSeasonAnimes.size() < size * pageable.getPageNumber() + size) {
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(SEASON_NOW_URL)
                    .queryParam("page", page)
                    .queryParam("limit", size);
            String url = uriBuilder.toUriString();
            System.out.println("Fetching page " + page + " with URL: " + url);
            AnimeResponse response = restTemplate.getForObject(url, AnimeResponse.class);
            if (response != null && response.getData() != null) {
                System.out.println("Fetched " + response.getData().size() + " current season animes");
                currentSeasonAnimes.addAll(response.getData());
                if (page >= response.getTotalPages() || page >= MAX_PAGES) {
                    morePages = false;
                } else {
                    page++;
                }
            } else {
                System.out.println("No results or error fetching data for page " + page);
                morePages = false;
            }
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), currentSeasonAnimes.size());
        System.out.println("Creating sublist from " + start + " to " + end);
        if (start >= currentSeasonAnimes.size()) {
            start = currentSeasonAnimes.size() - pageable.getPageSize();
            if (start < 0) {
                start = 0;
            }
            end = currentSeasonAnimes.size();
        }
        List<Anime> currentSeasonAnimesPage = currentSeasonAnimes.subList(start, end);
        return new PageImpl<>(currentSeasonAnimesPage, pageable, currentSeasonAnimes.size());
    }

    public Page<Anime> getTopAnimes(Pageable pageable) {
        List<Anime> currentSeasonAnimes = new ArrayList<>();
        int page = pageable.getPageNumber() + 1;
        int size = pageable.getPageSize();
        boolean morePages = true;
        while (morePages && page <= MAX_PAGES && currentSeasonAnimes.size() < size * pageable.getPageNumber() + size) {
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(TOP_URL)
                    .queryParam("page", page)
                    .queryParam("limit", size);
            String url = uriBuilder.toUriString();
            System.out.println("Fetching page " + page + " with URL: " + url);
            AnimeResponse response = restTemplate.getForObject(url, AnimeResponse.class);
            if (response != null && response.getData() != null) {
                System.out.println("Fetched " + response.getData().size() + " current season animes");
                currentSeasonAnimes.addAll(response.getData());
                if (page >= response.getTotalPages() || page >= MAX_PAGES) {
                    morePages = false;
                } else {
                    page++;
                }
            } else {
                System.out.println("No results or error fetching data for page " + page);
                morePages = false;
            }
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), currentSeasonAnimes.size());
        System.out.println("Creating sublist from " + start + " to " + end);
        if (start >= currentSeasonAnimes.size()) {
            start = currentSeasonAnimes.size() - pageable.getPageSize();
            if (start < 0) {
                start = 0;
            }
            end = currentSeasonAnimes.size();
        }
        List<Anime> currentSeasonAnimesPage = currentSeasonAnimes.subList(start, end);
        return new PageImpl<>(currentSeasonAnimesPage, pageable, currentSeasonAnimes.size());
    }

    public List<Anime> searchAnimeByName(String query, Integer page, Integer size) {
        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("q", query)
                .queryParam("page", page != null ? page : 1)
                .queryParam("limit", size != null ? size : 20)
                .toUriString();
        AnimeResponse response = restTemplate.getForObject(url, AnimeResponse.class);
        return response != null ? response.getData() : null;
    }

    public Optional<Anime> findByMalId(long malId) {
        return animeRepository.findByMalId(malId);
    }
}
