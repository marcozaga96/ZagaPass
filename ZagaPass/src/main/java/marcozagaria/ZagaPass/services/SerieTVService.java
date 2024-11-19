package marcozagaria.ZagaPass.services;

import marcozagaria.ZagaPass.entities.SerieTV;
import marcozagaria.ZagaPass.entities.SerieTVResponse;
import marcozagaria.ZagaPass.repositories.SerieTVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SerieTVService {
    private static final String API_URL = "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=it-IT&page=%d&sort_by=popularity.desc&api_key=2f3bd3e37f32b5ad4602ce2b7150af6e";
    private static final int MAX_PAGES = 500;

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private SerieTVRepository serieTVRepository;

    public List<SerieTV> getSerieTv() {
        List<SerieTV> allSerieTv = new ArrayList<>();
        int page = 1;
        boolean morePages = true;
        while (morePages && page <= MAX_PAGES) {
            String url = String.format(API_URL, page);
            SerieTVResponse serieTVResponse = restTemplate.getForObject(url, SerieTVResponse.class);
            if (serieTVResponse != null && serieTVResponse.getResults() != null) {
                allSerieTv.addAll(serieTVResponse.getResults());
                if (page >= serieTVResponse.getTotalPages() || page >= MAX_PAGES) {
                    morePages = false;
                } else {
                    page++;
                }
            } else {
                morePages = false;
            }
        }
        return allSerieTv;
    }

    public Optional<SerieTV> findById(long id) {
        return serieTVRepository.findById(id);
    }
}
