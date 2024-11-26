package marcozagaria.ZagaPass.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import marcozagaria.ZagaPass.entities.animepcckage.Anime;
import marcozagaria.ZagaPass.entities.animepcckage.AnimeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class AnimeService {
    private static final String API_URL = "https://api.jikan.moe/v4/anime";
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    public List<Anime> getAnimes(Integer page, Integer size) {
        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("page", page != null ? page : 1)
                .queryParam("limit", size != null ? size : 20)
                .toUriString();
        AnimeResponse response = restTemplate.getForObject(url, AnimeResponse.class);
        return response != null ? response.getData() : null;
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
}
