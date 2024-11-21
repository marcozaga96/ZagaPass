package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.SessioneIdResponse;
import marcozagaria.ZagaPass.entities.TokenResponse;
import marcozagaria.ZagaPass.entities.Valutazione;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ValutazioneService {
    private static final String API_KEY = "2f3bd3e37f32b5ad4602ce2b7150af6e";
    private static final String REQUEST_TOKEN_URL = "https://api.themoviedb.org/3/authentication/token/new";
    private static final String SESSION_ID_URL = "https://api.themoviedb.org/3/authentication/session/new";
    private static final String RATE_MOVIE_URL = "https://api.themoviedb.org/3/movie/{movieId}/rating";
    @Autowired
    private RestTemplate restTemplate;

    public String getSessioneId() {
        String requestTokenUrl = UriComponentsBuilder.fromHttpUrl(REQUEST_TOKEN_URL)
                .queryParam("api_key", API_KEY)
                .toUriString();
        TokenResponse tokenResponse = restTemplate.getForObject(requestTokenUrl, TokenResponse.class);
        String requestToken = tokenResponse.getRichiestaToken();
        String sessioneIdUrl = UriComponentsBuilder.fromHttpUrl(SESSION_ID_URL)
                .queryParam("api_key", API_KEY)
                .queryParam("request_token", requestToken)
                .toUriString();
        SessioneIdResponse sessionIdResponse = restTemplate.postForObject(sessioneIdUrl, null, SessioneIdResponse.class);
        return sessionIdResponse.getSessioneId();
    }

    public void rateMovie(Long filmId, double rating) {
        String sessioneId = getSessioneId();
        String rateMovieUrl = UriComponentsBuilder.fromHttpUrl(RATE_MOVIE_URL).queryParam("api_key", API_KEY)
                .queryParam("sessione_id", sessioneId).buildAndExpand(filmId).toUriString();
        Valutazione valutazione = new Valutazione(rating);
        restTemplate.postForObject(rateMovieUrl, valutazione, Void.class);
    }
}
