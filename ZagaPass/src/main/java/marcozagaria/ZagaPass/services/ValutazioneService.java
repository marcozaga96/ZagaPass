package marcozagaria.ZagaPass.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ValutazioneService {
    private static final String API_KEY = "2f3bd3e37f32b5ad4602ce2b7150af6e";
    private static final String RATE_MOVIE_URL = "https://api.themoviedb.org/3/movie/{movieId}/rating";
    private static final String RATE_TVSHOW_URL = "https://api.themoviedb.org/3/tv/{tvShowId}/rating";
    private static final String BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjNiZDNlMzdmMzJiNWFkNDYwMmNlMmI3MTUwYWY2ZSIsIm5iZiI6MTczMjE3OTczNC45OTAyNjk3LCJzdWIiOiI2NzNiNzBmNmM2NDEyYjM2Njk2NTQ5ZTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Pd2yxAItxm_zb6mNOEI0ZSUUdmjiwvc0Lu8WJVJ3UrQ";
    @Autowired
    private RestTemplate restTemplate;


    public void rateMovie(Long filmId, double rating) {
        String rateMovieUrl = UriComponentsBuilder.fromHttpUrl(RATE_MOVIE_URL)
                .queryParam("api_key", API_KEY)
                .buildAndExpand(filmId).toUriString();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + BEARER_TOKEN);
        headers.set("Content-Type", "application/json;charset=utf-8");
        headers.set("Accept", "application/json");
        RatingRequest ratingRequest = new RatingRequest(rating);
        HttpEntity<RatingRequest> entity = new HttpEntity<>(ratingRequest, headers);
        restTemplate.exchange(rateMovieUrl, HttpMethod.POST, entity, Void.class);
    }

    public void rateTVShow(Long tvShowId, double rating) {
        String rateTVShowUrl = UriComponentsBuilder.fromHttpUrl(RATE_TVSHOW_URL)
                .queryParam("api_key", API_KEY)
                .buildAndExpand(tvShowId).toUriString();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + BEARER_TOKEN);
        headers.set("Content-Type", "application/json;charset=utf-8");
        headers.set("Accept", "application/json");
        RatingRequest ratingRequest = new RatingRequest(rating);
        HttpEntity<RatingRequest> entity = new HttpEntity<>(ratingRequest, headers);
        restTemplate.exchange(rateTVShowUrl, HttpMethod.POST, entity, Void.class);
    }

    private static class RatingRequest {
        private double value;

        public RatingRequest(double value) {
            this.value = value;
        }

        public double getValue() {
            return value;
        }

        public void setValue(double value) {
            this.value = value;
        }
    }


}
